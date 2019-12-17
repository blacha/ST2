import { CityLayout, CityLayoutTile } from '../../api/city.layout';
import { Base } from '../../lib/base';
import { Faction } from '../../lib/data/faction';
import { ClientLibCity, ClientLibCityBuildable, ClientLibStatic } from '../@types/client.lib';
import { ResearchType } from '../@types/client.lib.const';
import { GameDataStatic } from '../@types/game.data';
import { ClientLibPatcher } from '../patch/patch';

declare const ClientLib: ClientLibStatic;
declare const GAMEDATA: GameDataStatic;

function GameToJSON(offset: number, unit: ClientLibCityBuildable): CityLayoutTile & { x: number; y: number } {
    return {
        x: unit.get_CoordX(),
        y: unit.get_CoordY() + offset,
        id: unit.get_MdbUnitId(),
        l: unit.get_CurrentLevel(),
    };
}

export class CityData {
    static MaxFailCount = 10;
    static $MM: number[];
    static getCurrentCity(): CityLayout | null {
        const MainData = ClientLib.Data.MainData.GetInstance();
        const cities = MainData.get_Cities();

        const currentCity = cities.get_CurrentCity();
        if (currentCity == null) {
            return null;
        }
        return CityData.getCityData(currentCity);
    }

    static getCityData(city: ClientLibCity): CityLayout | null {
        if (city == null) {
            return null;
        }

        const MainData = ClientLib.Data.MainData.GetInstance();
        const player = MainData.get_Player();
        const server = MainData.get_Server();
        return {
            cityId: city.get_Id(),
            level: city.get_LvlBase(),
            name: city.get_Name(),
            x: city.get_PosX(),
            y: city.get_PosY(),
            faction: city.get_CityFaction(),
            ownerId: city.get_OwnerId(),
            owner: city.get_OwnerName() || player.name,
            version: city.get_Version(),
            world: server.get_WorldId(),
            alliance: city.get_OwnerAllianceName(),
            allianceId: city.get_OwnerAllianceId(),
            tiles: CityData.getLayout(city),
            upgrades: CityData.getUpgrades(city),
        };
    }

    static getLayout(city: ClientLibCity): CityLayoutTile[] {
        const xYMap: CityLayoutTile[] = [];

        function addUnit(unit: CityLayoutTile & { x: number; y: number }) {
            const index = Base.index(unit.x, unit.y);
            delete unit.x;
            delete unit.y;

            const existing = xYMap[index];

            // Units can be inside other units
            if (existing != null && typeof existing == 'object') {
                existing.u = unit;
                return;
            }
            xYMap[index] = unit;
        }

        const buildings = CityData.getBuildings(city);
        for (const building of buildings) {
            addUnit(building);
        }

        const units = CityData.getUnits(city);
        for (const unit of units.d) {
            addUnit(unit);
        }
        for (const unit of units.o) {
            addUnit(unit);
        }

        for (let y = 0; y <= Base.MaxDefY; y++) {
            for (let x = 0; x < 9; x++) {
                const type = city.GetResourceType(x, y);
                if (type == 0) {
                    continue;
                }
                const index = Base.index(x, y);

                const tileObj = xYMap[index];
                if (tileObj == null || typeof tileObj == 'number') {
                    xYMap[index] = type;
                    continue;
                }

                tileObj.t = type;
            }
        }

        return xYMap;
    }

    static async waitForCityReady(cityId: number): Promise<ClientLibCity | null> {
        for (let i = 0; i < CityData.MaxFailCount; i++) {
            await new Promise(resolve => setTimeout(resolve, 100 * i));

            const city = CityData.isReady(cityId);
            if (city != null) {
                return city;
            }
        }
        return null;
    }

    static isReady(cityId: number): ClientLibCity | null {
        const city = ClientLib.Data.MainData.GetInstance()
            .get_Cities()
            .GetCity(cityId);

        if (city == null) {
            return null;
        }

        // Dead ignore
        if (city.get_IsGhostMode()) {
            return null;
        }

        // Base has not loaded yet
        if (city.GetBuildingsConditionInPercent() === 0) {
            return null;
        }

        return city;
    }

    static getUpgrades(city: ClientLibCity): number[] {
        if (city.IsOwnBase()) {
            const player = ClientLib.Data.MainData.GetInstance().get_Player();
            const research = player.get_PlayerResearch();

            const output: number[] = [];
            for (const type of [ResearchType.OffUnits, ResearchType.DefUnits, ResearchType.Buildings]) {
                const list = research.GetResearchItemListByType(type);
                for (const rt of list.l) {
                    if (rt.get_CurrentLevel() < 2) {
                        continue;
                    }
                    const unit = rt.get_GameDataUnit_Obj();
                    if (unit == null) {
                        continue;
                    }
                    const tech = rt.get_GameDataTech_Obj();
                    output.push(tech.c);
                }
            }

            return output;
        }

        const activeModules = city.get_ActiveModules();
        if (activeModules == null) {
            return [];
        }
        const MODULES = CityData.getModuleMap();

        const upgradeMap: Record<string, boolean> = {};
        for (const id of activeModules) {
            const unitID = MODULES[id];
            if (unitID == null) {
                continue;
            }
            upgradeMap[unitID] = true;
        }

        return Object.keys(upgradeMap).map(i => parseInt(i, 10));
    }

    static getUnits(city: ClientLibCity) {
        const units = city.get_CityUnitsData();
        if (!ClientLibPatcher.hasPatchedCityUnits(units)) {
            throw new Error('City has not been missing: $get_DefenseUnits');
        }

        const defUnits = units.$get_DefenseUnits();
        const offUnits = units.$get_OffenseUnits();

        const faction = Faction.fromId(city.get_CityFaction());
        if (faction === Faction.Nod || faction === Faction.Gdi) {
            return {
                d: Object.keys(defUnits.d).map(key => GameToJSON(Base.MaxBaseY, defUnits.d[key])),
                o: Object.keys(offUnits.d).map(key => GameToJSON(Base.MaxDefY, offUnits.d[key])),
            };
        }

        return {
            d: Object.keys(defUnits.d).map(key => GameToJSON(Base.MaxBaseY, defUnits.d[key])),
            o: [],
        };
    }

    static getBuildings(city: ClientLibCity) {
        const buildings = city.get_Buildings();
        if (buildings.c == 0) {
            return [];
        }
        return Object.keys(buildings.d).map(key => GameToJSON(0, buildings.d[key]));
    }

    static getModuleMap(): number[] {
        if (CityData.$MM != null) {
            return CityData.$MM;
        }
        const units = GAMEDATA.units;
        const MODULES: number[] = [];
        for (const unit of Object.values(units)) {
            for (const module of unit.m) {
                if (module.t == 1) {
                    continue;
                }
                MODULES[module.i] = unit.i;
            }
        }
        CityData.$MM = MODULES;
        return MODULES;
    }
}
