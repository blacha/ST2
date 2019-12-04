import { CityLayout } from '../../api/city.layout';
import { Faction } from '../../lib/data/faction';
import { ClientLibPatcher } from '../patch/patch';

function GameToJSON(offset: number, unit: ClientLibCityUnit) {
    return {
        x: unit.get_CoordX(),
        y: unit.get_CoordY() + offset,
        id: unit.get_MdbUnitId(),
        l: unit.get_CurrentLevel(),
    };
}

export class CityData {
    static BASE_OFFSET_Y = 0;
    static DEF_OFFSET_Y = 8;
    static OFF_OFFSET_Y = CityData.DEF_OFFSET_Y + 8;
    static MAX_BASE_X = 9;

    static $MM: number[];

    static $index(x: number, y: number) {
        return x + y * CityData.MAX_BASE_X;
    }

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
        const alliance = MainData.get_Alliance();
        return {
            cityId: city.get_Id(),
            level: city.get_LvlBase(),
            name: city.get_Name(),
            x: city.get_PosX(),
            y: city.get_PosY(),
            faction: city.get_CityFaction(),
            owner: city.get_OwnerName() || player.name,
            version: city.get_Version(),

            alliance: alliance.get_Id() || -1,
            player: player.name,
            world: server.get_WorldId(),

            tiles: CityData.getLayout(city),
            upgrades: CityData.getUpgrades(city),
        };
    }

    static getLayout(city: ClientLibCity) {
        const xYMap: any = [];

        function mapUnit(unit: any) {
            const index = CityData.$index(unit.x, unit.y);
            delete unit.x;
            delete unit.y;

            // Units can be inside other units
            if (xYMap[index]) {
                xYMap[index].u = unit;
                return;
            }
            xYMap[index] = unit;
        }

        CityData.getBuildings(city).forEach(mapUnit);

        const units = CityData.getUnits(city);
        units.d.forEach(mapUnit);
        units.o.forEach(mapUnit);

        for (let y = 0; y <= CityData.OFF_OFFSET_Y; y++) {
            for (let x = 0; x < 9; x++) {
                const type = city.GetResourceType(x, y);
                if (type == 0) {
                    continue;
                }
                const index = CityData.$index(x, y);

                const tileObj = xYMap[index];
                if (tileObj == null) {
                    xYMap[index] = type;
                    continue;
                }

                tileObj.t = type;
            }
        }

        return xYMap;
    }

    static getResources(city: ClientLibCity) {
        const data = [];

        for (let y = 0; y <= CityData.OFF_OFFSET_Y; y++) {
            for (let x = 0; x < 9; x++) {
                const type = city.GetResourceType(x, y);
                if (type == 0) {
                    continue;
                }
                data.push({ x, y, type });
            }
        }
        return data;
    }

    static getUpgrades(city: ClientLibCity): number[] {
        if (city.IsOwnBase()) {
            const player = ClientLib.Data.MainData.GetInstance().get_Player();
            const research = player.get_PlayerResearch();

            const output: number[] = [];
            [1, 2, 5].forEach(function(type) {
                const list = research.GetResearchItemListByType(type);
                for (const rt of list.l) {
                    if (rt.get_CurrentLevel() < 2) {
                        return;
                    }
                    const unit = rt.get_GameDataUnit_Obj();
                    if (unit == null) {
                        return;
                    }
                    const tech = rt.get_GameDataTech_Obj();

                    output.push(tech.c);
                }
            });

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
            throw new Error('City has not been missing: $get_DefenseUnits ');
        }
        const defUnits = units.$get_DefenseUnits();
        const offUnits = units.$get_OffenseUnits();

        const faction = Faction.fromID(city.get_CityFaction());
        if (faction === Faction.Nod || faction === Faction.Gdi) {
            return {
                d: Object.keys(defUnits.d).map(key => GameToJSON(CityData.DEF_OFFSET_Y, defUnits.d[key])),
                o: Object.keys(offUnits.d).map(key => GameToJSON(CityData.OFF_OFFSET_Y, offUnits.d[key])),
            };
        }

        return {
            d: Object.keys(defUnits.d).map(key => GameToJSON(CityData.DEF_OFFSET_Y, defUnits.d[key])),
            o: [],
        };
    }

    static getBuildings(city: ClientLibCity) {
        const buildings = city.get_Buildings();
        if (buildings.c == 0) {
            return [];
        }
        return Object.keys(buildings.d).map(key => GameToJSON(CityData.DEF_OFFSET_Y, buildings.d[key]));
    }

    static getModuleMap() {
        if (CityData.$MM != null) {
            return CityData.$MM;
        }
        const units = GAMEDATA.units;
        const MODULES: number[] = [];
        Object.keys(units).forEach(id => {
            const unit = units[id];
            const i = parseInt(id, 10);
            for (const module of unit.m) {
                if (module.t == 1) {
                    return;
                }
                MODULES[module.i] = i;
            }
        });
        CityData.$MM = MODULES;
        return MODULES;
    }
}
