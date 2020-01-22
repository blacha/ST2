import {
    BaseX,
    BaseY,
    ClientLibCity,
    ClientLibCityBuildable,
    ClientLibStatic,
    FactionType,
    GameDataResearchLevel,
    GameDataStatic,
    GameDataUnitId,
    ResourceType,
    CityId,
    WorldId,
    PlayerName,
    PlayerId,
    AllianceName,
    AllianceId,
} from '@cncta/clientlib';
import { PatchCityUnits } from '../patch/patch.data';
import { ClientLibResearchUtil } from './city.research';
import { UnitLocationPacker } from './pack';
import { LayoutPacker } from './pack/layout.packer';
import { UnitPacker } from './pack/unit.packer';
import { Base62 } from './base.62';
import { InvalidAllianceId, InvalidAllianceName } from '../id';

declare const GAMEDATA: GameDataStatic;

export interface CityArmy {
    def: string;
    off: string;
}

export interface IdName {
    id: number;
    name: string;
}

export interface StCity extends CityArmy {
    /** CNC city Id */
    cityId: CityId;
    /** Id of the world that the base is on */
    worldId: WorldId;

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
    faction: FactionType;

    /** Owners name & Id */
    ownerId: PlayerId;
    owner: PlayerName;

    /** Alliance name & Id*/
    alliance?: AllianceName | typeof InvalidAllianceName;
    allianceId?: AllianceId | typeof InvalidAllianceId;

    /** Base version  */
    version: number;

    /** Base data */
    tiles: string;
    base: string;

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
            ownerId: city.get_OwnerId(),
            owner: city.get_OwnerName() || player.name,
            version: city.get_Version(),
            worldId: server.get_WorldId(),
            alliance: city.get_OwnerAllianceName(),
            allianceId: city.get_OwnerAllianceId(),
            tiles: CityScannerUtil.getLayout(city),
            base: Base62.pack(Object.values(city.get_Buildings().d).map(unit => CityScannerUtil.packUnit(unit))),
            upgrades: ClientLibResearchUtil.getUpgrades(city),
            ...CityScannerUtil.getUnits(city),
            timestamp: Date.now(),
        };
        // If the base is owned by us it screws with the alliance info
        if (ownerId == player.id) {
            const alliance = MainData.get_Alliance();
            if (alliance == null) {
                return cityData;
            }
            cityData.alliance = alliance.get_Name();
            cityData.allianceId = alliance.get_Id();
        }
        return cityData;
    }

    /** Pack a city layout into a number */
    static getLayout(city: ClientLibCity): string {
        const output: number[] = [];
        for (let y = 0; y < BaseY.MaxDef; y++) {
            const row: ResourceType[] = [];
            for (let x = 0; x < BaseX.Max; x++) {
                const type = city.GetResourceType(x, y);
                row.push(type);
            }
            output.push(LayoutPacker.pack(row));
        }
        return Base62.pack(output);
    }

    static getUnits(city: ClientLibCity): CityArmy {
        const units = city.get_CityUnitsData();
        if (!PatchCityUnits.isPatched(units)) {
            throw new Error('City is not patched, missing: $DefenseUnits');
        }

        const defUnits = units.$DefenseUnits;
        const offUnits = units.$OffenseUnits;

        const faction = city.get_CityFaction();
        if (faction === FactionType.Nod || faction === FactionType.Gdi) {
            return {
                def: Base62.pack(Object.values(defUnits.d).map(unit => CityScannerUtil.packUnit(unit))),
                off: Base62.pack(Object.values(offUnits.d).map(unit => CityScannerUtil.packUnit(unit))),
            };
        }

        return {
            def: Base62.pack(Object.values(defUnits.d).map(unit => CityScannerUtil.packUnit(unit))),
            off: '',
        };
    }
}
