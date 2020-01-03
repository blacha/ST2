import { ClientLibStatic } from '../types/clientlib';
import { ClientLibCity, ClientLibCityBuildable } from '../types/clientlib/main.data/cities';
import { FactionType } from '../types/game/faction';
import { ResourceType } from '../types/game/resource';
import { LayoutPacker } from './pack/layout.packer';
import { UnitPacker } from './pack/unit.packer';
import { BaseY, BaseX } from '../base.const';
import { UnitLocationPacker } from './pack';
import { GameDataStatic, GameDataResearchLevel, GameDataUnitId } from '../types';
import { Patches } from '../patch';

declare const GAMEDATA: GameDataStatic;

export interface CityArmy {
    def: number[];
    off: number[];
}

export interface IdName {
    id: number;
    name: string;
}

export interface StCity extends CityArmy {
    /** CNC city Id */
    cityId: number;
    /** Id of the world that the base is on */
    worldId: number;

    level: {
        /** Base level */
        base: number;
        /** Base Offense level */
        off: number;
        /** Base Defense level */
        def: number;
    };

    /** Name of base */
    name: string;

    x: number;
    y: number;

    /** Faction, GDI, NOD, Forgotten */
    faction: number;

    /** Owners name */
    owner: IdName;
    /** Alliance name & Id*/
    alliance: IdName;
    /** Base version  */
    version: number;
    /** Base data */
    tiles: number[];
    base: number[];

    /** Units that have upgrades */
    upgrades: Partial<Record<GameDataUnitId, GameDataResearchLevel>>;

    /** Time the base was last seen */
    timestamp: number;
}

declare const ClientLib: ClientLibStatic;

export class CityScannerUtil {
    private static packUnit(unit: ClientLibCityBuildable): number {
        const xy = UnitLocationPacker.pack(unit.get_CoordX(), unit.get_CoordY());
        return UnitPacker.pack({ xy, id: unit.get_MdbUnitId(), level: unit.get_CurrentLevel() });
    }

    static get(city?: ClientLibCity): StCity | null {
        if (city == null) {
            return null;
        }

        const MainData = ClientLib.Data.MainData.GetInstance();
        const player = MainData.get_Player();
        const server = MainData.get_Server();
        const ownerId = city.get_OwnerId();

        const cityData: StCity = {
            cityId: city.get_Id(),
            level: {
                base: city.get_LvlBase(),
                off: city.get_LvlOffense(),
                def: city.get_LvlDefense(),
            },
            name: city.get_Name(),
            x: city.get_PosX(),
            y: city.get_PosY(),
            faction: city.get_CityFaction(),
            owner: { id: city.get_OwnerId(), name: city.get_OwnerName() || player.name },
            version: city.get_Version(),
            worldId: server.get_WorldId(),
            alliance: { id: city.get_OwnerAllianceId() || 0, name: city.get_OwnerAllianceName() || '' },
            tiles: CityScannerUtil.getLayout(city),
            base: Object.values(city.get_Buildings().d).map(unit => CityScannerUtil.packUnit(unit)),
            upgrades: CityScannerUtil.getUpgrades(city),
            ...CityScannerUtil.getUnits(city),
            timestamp: Date.now(),
        };
        // If the base is owned by us it screws with the alliance info
        if (ownerId == player.id) {
            const alliance = MainData.get_Alliance();
            if (alliance == null) {
                return cityData;
            }
            cityData.alliance.name = alliance.get_Name();
            cityData.alliance.id = alliance.get_Id();
        }
        return cityData;
    }

    /** Pack a city layout into a number */
    static getLayout(city: ClientLibCity): number[] {
        const output: number[] = [];
        for (let y = 0; y < BaseY.MaxDef; y++) {
            const row: ResourceType[] = [];
            for (let x = 0; x < BaseX.Max; x++) {
                const type = city.GetResourceType(x, y);
                row.push(type);
            }
            output.push(LayoutPacker.pack(row));
        }
        return output;
    }

    static getUnits(city: ClientLibCity): CityArmy {
        const units = city.get_CityUnitsData();
        if (!Patches.CityUnits.isPatched(units)) {
            throw new Error('City is not patched, missing: $DefenseUnits');
        }

        const defUnits = units.$DefenseUnits;
        const offUnits = units.$OffenseUnits;

        const faction = city.get_CityFaction();
        if (faction === FactionType.Nod || faction === FactionType.Gdi) {
            return {
                def: Object.values(defUnits.d).map(unit => CityScannerUtil.packUnit(unit)),
                off: Object.values(offUnits.d).map(unit => CityScannerUtil.packUnit(unit)),
            };
        }

        return {
            def: Object.values(defUnits.d).map(unit => CityScannerUtil.packUnit(unit)),
            off: [],
        };
    }

    static _unitModules: Map<number, { id: number; level: number }> = new Map();
    static get unitModules() {
        if (this._unitModules.size > 0) {
            return this._unitModules;
        }
        for (const unit of Object.values(GAMEDATA.units)) {
            for (const mod of unit.m) {
                if (mod.r.length == 0) {
                    this._unitModules.set(mod.i, { id: unit.i, level: 1 });
                } else {
                    this._unitModules.set(mod.i, { id: unit.i, level: 2 });
                }
            }
        }
        return this._unitModules;
    }

    static getUpgrades(city: ClientLibCity): Record<number, number> {
        const modules = city.get_ActiveModules();
        if (modules == null) {
            return {};
        }
        const upgrades: Record<number, number> = {};
        for (const mod of modules) {
            const unitMod = this.unitModules.get(mod);
            if (unitMod == null) {
                continue;
            }
            const { id, level } = unitMod;

            if (upgrades[id] == null || upgrades[id] < level) {
                upgrades[id] = level;
            }
        }

        return upgrades;
    }
}
