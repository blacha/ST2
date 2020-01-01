import { Building } from '../building/building';
import { BuildingType } from '../building/building.type';
import { Faction } from '../data/faction';
import { GameDataObject, GameDataObjectType } from '../data/game.data.object';
import { GameResource, GameResources } from '../game.resources';
import { DefUnitType } from '../unit/def.unit.type';
import { OffUnitType } from '../unit/off.unit.type';
import { Unit } from '../unit/unit';
import { BaseBuildings } from './base.buildings';
import { BaseStats } from './base.stats';
import { Buildable } from './buildable';
import { Tile } from './tile';
import { Id } from '../../id';
import { BaseX, BaseY, UnitLocationPacker } from '@cncta/clientlib';

export interface CncLocation {
    x: number;
    y: number;
}
export interface CncBaseObject extends CncLocation {
    building?: Buildable;
    tile?: Tile;
}

export class PoiData extends GameResources {
    air = 0;
    infantry = 0;
    vehicle = 0;
    defense = 0;
}

export class Base {
    buildings: BaseBuildings;

    id: string;
    name: string;
    faction: Faction;
    offFaction: Faction;
    base: Buildable[];

    owner?: { id: number; name: string };
    alliance?: { id: number; name: string };

    level = 0;
    levelOffense = 0;
    levelDefense = 0;

    poi: PoiData = new PoiData();

    x = -1;
    y = -1;
    worldId = -1;
    /** Time the base was last seen */
    updatedAt: number;

    tiles: Tile[];
    upgrades: number[];

    info: BaseStats;

    constructor(name = 'Base', faction: Faction = Faction.Gdi) {
        this.name = name;
        this.faction = faction;
        this.offFaction = faction;
        this.tiles = [];
        this.upgrades = [];
        this.base = [];

        this.id = Id.generate();
        this.info = new BaseStats(this);
        this.buildings = new BaseBuildings(this);
        this.updatedAt = 0;
    }

    setBaseLevels(base: number, off = 0, def = 0) {
        this.level = base;
        this.levelOffense = off;
        this.levelDefense = def;
    }

    /**
     * Build a object at a position
     * @param x x offset
     * @param y y offset
     * @param level Level of object
     * @param unitType Object to build
     */
    build(x: number, y: number, level: number, unitType: GameDataObject): void {
        if (unitType instanceof BuildingType) {
            this.setBase(x, y, new Building(unitType, level));
            if (unitType.tile !== Tile.Empty) {
                this.setTile(x, y, unitType.tile);
            }
        } else if (unitType instanceof OffUnitType) {
            this.setBase(x, y, new Unit(unitType, level));
        } else if (unitType instanceof DefUnitType) {
            this.setBase(x, y, new Unit(unitType, level));
        } else {
            console.error('Unknown unitType', unitType);
        }
    }

    getTile(x: number, y: number) {
        return this.tiles[UnitLocationPacker.pack(x, y)] || Tile.Empty;
    }

    getResource(x: number, y: number): GameResource | null {
        const tile = this.getTile(x, y);
        if (tile == Tile.Crystal) {
            return 'crystal';
        }
        if (tile == Tile.Tiberium) {
            return 'tiberium';
        }
        return null;
    }

    clear() {
        this.info.clear();
        this.base = [];
    }

    setTile(x: number, y: number, tile: Tile) {
        this.info.clear();
        this.tiles[UnitLocationPacker.pack(x, y)] = tile;
    }

    getBase(x: number, y: number): Buildable {
        return this.base[UnitLocationPacker.pack(x, y)];
    }

    setBase(x: number, y: number, buildable: Buildable) {
        this.base[UnitLocationPacker.pack(x, y)] = buildable;
    }

    hasUpgrade(unitId: number) {
        return this.upgrades.indexOf(unitId) !== -1;
    }

    findBuilding(buildingCodes: number[]): Building | null {
        for (const building of this.base) {
            if (building == null) {
                continue;
            }

            if (buildingCodes.includes(building.type.id)) {
                return building as Building;
            }
        }
        return null;
    }

    static buildingForEach(callback: (x: number, y: number) => boolean | void) {
        for (let y = 0; y < BaseY.MaxBuilding; y++) {
            for (let x = 0; x < BaseX.Max; x++) {
                const res = callback(x, y);
                if (res === false) {
                    return;
                }
            }
        }
    }

    /** Get the type of object based on how far down it is */
    static getObjectType(yOffset: number): GameDataObjectType {
        if (yOffset < BaseY.MaxBuilding) {
            return GameDataObjectType.Building;
        }
        if (yOffset < BaseY.MaxDef) {
            return GameDataObjectType.DefUnit;
        }
        return GameDataObjectType.OffUnit;
    }
}
