import { Buildable } from './base/buildable';
import { Tile } from './base/tile';
import { Building } from './building/building';
import { BuildingType } from './building/building.type';
import { Constants } from './constants';
import { Faction } from './data/faction';
import { GameDataObjectType } from './data/game.data.object';
import { GameResource } from './game.resources';
import { BaseIter } from './base.iter';

export interface CncLocation {
    x: number;
    y: number;
}
export interface CncBaseObject extends CncLocation {
    building?: Buildable;
    tile?: Tile;
}

export class Base {
    name: string;
    faction: Faction;
    base: Buildable[];

    x = -1;
    y = -1;

    tiles: Tile[];
    upgrades: number[];

    constructor(name = 'Base', faction: Faction = Faction.Gdi) {
        this.name = name;
        this.faction = faction;
        this.tiles = [];
        this.upgrades = [];
        this.base = [];
    }

    static $index(x: number, y: number) {
        return x + y * Constants.MAX_BASE_X;
    }

    getSupport(): Building | null {
        const SUPPORTS = [
            BuildingType.NOD.EyeOfKane.id,
            BuildingType.NOD.FistOfKane.id,
            BuildingType.NOD.BladeOfKane.id,
            BuildingType.GDI.FalconSupport.id,
            BuildingType.GDI.IonCannonSupport.id,
            BuildingType.GDI.SkyStrikeSupport.id,
        ];

        for (const building of this.base) {
            if (building == null) {
                continue;
            }

            if (SUPPORTS.includes(building.type.id)) {
                return building as Building;
            }
        }
        return null;
    }

    getTile(x: number, y: number) {
        return this.tiles[Base.$index(x, y)] || Tile.Empty;
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

    setTile(x: number, y: number, tile: Tile) {
        this.tiles[Base.$index(x, y)] = tile;
    }

    getBase(x: number, y: number): Buildable {
        return this.base[Base.$index(x, y)];
    }

    setBase(x: number, y: number, buildable: Buildable) {
        this.base[Base.$index(x, y)] = buildable;
    }

    setUpgrades(upgrades: number[]) {
        this.upgrades = upgrades;
    }

    hasUpgrade(unitId: number) {
        return this.upgrades.indexOf(unitId) !== -1;
    }

    stats() {
        const tiberium: Record<string, number> = {};
        const crystal: Record<string, number> = {};
        // TODO this is not super efficient, could be improved but generally runs in <1ms
        Base.buildingForEach((x, y) => {
            const tib = BaseIter.getSurroundings(this, x, y, undefined, [Tile.Tiberium]).length
            const cry = BaseIter.getSurroundings(this, x, y, undefined, [Tile.Crystal]).length
            // No one cares about 1 or two silos
            if (tib < 3 && cry < 3) {
                return;
            }

            if (cry == 0) {
                tiberium[tib] = (tiberium[tib] || 0) + 1
            }
            if (tib == 0) {
                crystal[cry] = (crystal[cry] || 0) + 1
            }
        })
        return { tiberium, crystal }
    }

    static buildingForEach(callback: (x: number, y: number) => void) {
        for (let y = 0; y < Constants.MAX_BASE_Y; y++) {
            for (let x = 0; x < Constants.MAX_BASE_X; x++) {
                callback(x, y);
            }
        }
    }

    /** Get the type of object based on how far down it is */
    static getObjectType(yOffset: number): GameDataObjectType {
        if (yOffset < Constants.MAX_BASE_Y) {
            return GameDataObjectType.Building
        }
        if (yOffset < Constants.MAX_DEF_Y) {
            return GameDataObjectType.DefUnit;
        }
        return GameDataObjectType.OffUnit;
    }

    toString() {
        function toStr(u: any) {
            return u.toString();
        }

        function removeEmpty(o: any) {
            return o != null;
        }

        return `[Base ${this.name}:${this.faction}
    buildings: [${this.base
                .filter(removeEmpty)
                .map(toStr)
                .join('\n\t')})}]
        ]`;
    }
}
