import { BaseIter } from './base.iter';
import { Buildable } from './base/buildable';
import { Tile } from './base/tile';
import { Building } from './building/building';
import { BuildingType } from './building/building.type';
import { Faction } from './data/faction';
import { GameDataObject, GameDataObjectType } from './data/game.data.object';
import { GameResource, GameResources } from './game.resources';
import { BaseProduction } from './production';
import { BaseOutput } from './production/calculator';
import { DefUnitType } from './unit/def.unit.type';
import { OffUnitType } from './unit/off.unit.type';
import { Unit } from './unit/unit';
import { color, ConsoleColor } from './util';
import { Id } from './uuid';

export interface CncLocation {
    x: number;
    y: number;
}
export interface CncBaseObject extends CncLocation {
    building?: Buildable;
    tile?: Tile;
}
export interface SiloCount {
    [siloCount: number]: number;
    '3': number;
    '4': number;
    '5': number;
    '6': number;
    /**
     * Silo count shifted by 10
     * @example
     * - Base with 2x4 & 1x5 = 120
     * - Base with 3x3 & 2x4 = 23
     */
    score: number;
}

export class PoiData extends GameResources {
    air = 0;
    infantry = 0;
    vehicle = 0;
    defense = 0;
}

export class Base {
    /** Width of bases. */
    static readonly MaxX = 9;
    /** Height of bases */
    static readonly MaxY = 20;

    /** Max Y for Base buildings  */
    static readonly MaxBaseY = 8;
    /** Max Y for D units */
    static readonly MaxDefY = 16;
    /** Max Y for O units */
    static readonly MaxOffY = 20;

    static index(x: number, y: number) {
        return x + y * Base.MaxX;
    }

    id: string;

    name: string;
    faction: Faction;
    offFaction: Faction;
    base: Buildable[];
    owner: string | null;
    private levels: {
        base: number;
        off: number;
        def: number;
    } = { base: 0, off: 0, def: 0 };

    poi: PoiData = new PoiData();

    x = -1;
    y = -1;

    tiles: Tile[];
    upgrades: number[];

    constructor(name = 'Base', faction: Faction = Faction.Gdi) {
        this.name = name;
        this.faction = faction;
        this.offFaction = faction;
        this.tiles = [];
        this.upgrades = [];
        this.base = [];

        this.id = Id.generate();
        this.owner = null;
    }

    setBaseLevels(base: number, off = 0, def = 0) {
        this.levels = { base, off, def };
    }

    get level() {
        if (this.levels.base) {
            return this.levels.base;
        }
        return 0;
    }

    get levelOffense() {
        if (this.levels.off) {
            return this.levels.off;
        }
        return 0;
    }
    get levelDefense() {
        if (this.levels.def) {
            return this.levels.def;
        }
        return 0;
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
        return this.tiles[Base.index(x, y)] || Tile.Empty;
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
        this.clearCache();
        this.base = [];
    }

    clearCache() {
        this.score = null;
        this._stats = null;
        this._production = null;
    }

    setTile(x: number, y: number, tile: Tile) {
        this.clearCache();
        this.tiles[Base.index(x, y)] = tile;
    }

    getBase(x: number, y: number): Buildable {
        return this.base[Base.index(x, y)];
    }

    setBase(x: number, y: number, buildable: Buildable) {
        this.base[Base.index(x, y)] = buildable;
    }

    setUpgrades(upgrades: number[]) {
        this.upgrades = upgrades;
    }

    hasUpgrade(unitId: number) {
        return this.upgrades.indexOf(unitId) !== -1;
    }

    get commandCenter(): Buildable | null {
        return this.base.filter(
            b => b.type.id == BuildingType.GDI.CommandCenter.id || b.type.id == BuildingType.NOD.CommandCenter.id,
        )[0];
    }

    private _production: BaseOutput | null = null;
    get production() {
        if (this._production == null) {
            this._production = BaseProduction.getOutput(this);
        }
        return this._production;
    }

    private _stats: { tiberium: SiloCount; crystal: SiloCount; mixed: SiloCount } | null = null;
    private score: number | null = null;
    get stats() {
        if (this._stats != null) {
            return this._stats;
        }
        const tiberium: SiloCount = { 3: 0, 4: 0, 5: 0, 6: 0, score: 0 };
        const crystal: SiloCount = { 3: 0, 4: 0, 5: 0, 6: 0, score: 0 };
        const mixed: SiloCount = { 3: 0, 4: 0, 5: 0, 6: 0, score: 0 };

        const MIN_SILO = 3;
        // TODO this is not super efficient, could be improved but generally runs in <1ms
        Base.buildingForEach((x, y) => {
            const tib = BaseIter.getSurroundings(this, x, y, undefined, [Tile.Tiberium]).length;
            const cry = BaseIter.getSurroundings(this, x, y, undefined, [Tile.Crystal]).length;

            if (tib + cry > 3) {
                mixed[tib + cry] = (mixed[tib + cry] || 0) + 1;
            }

            // No one cares about one or two silos
            if (tib < MIN_SILO && cry < MIN_SILO) {
                return;
            }

            if (cry == 0) {
                tiberium[tib] = (tiberium[tib] || 0) + 1;
            }
            if (tib == 0) {
                crystal[cry] = (crystal[cry] || 0) + 1;
            }
        });

        for (let i = 0; i <= 6 - MIN_SILO; i++) {
            tiberium.score += tiberium[i + MIN_SILO] * 10 ** i;
            crystal.score += crystal[i + MIN_SILO] * 10 ** i;
            mixed.score += mixed[i + MIN_SILO] * 10 ** i;
        }

        this._stats = { tiberium, crystal, mixed };
        this.score = tiberium.score + crystal.score * 0.1 + mixed.score * 0.25;
        return this._stats;
    }

    static buildingForEach(callback: (x: number, y: number) => boolean | void) {
        for (let y = 0; y < Base.MaxBaseY; y++) {
            for (let x = 0; x < Base.MaxX; x++) {
                const res = callback(x, y);
                if (res === false) {
                    return;
                }
            }
        }
    }

    /** Get the type of object based on how far down it is */
    static getObjectType(yOffset: number): GameDataObjectType {
        if (yOffset < Base.MaxBaseY) {
            return GameDataObjectType.Building;
        }
        if (yOffset < Base.MaxDefY) {
            return GameDataObjectType.DefUnit;
        }
        return GameDataObjectType.OffUnit;
    }

    toCncOpt() {
        const tiles = [];
        for (let y = 0; y < Base.MaxY; y++) {
            for (let x = 0; x < Base.MaxX; x++) {
                const obj = this.getBase(x, y);
                if (obj != null) {
                    if (obj.level == 1) {
                        tiles.push(obj.type.code);
                    } else {
                        tiles.push(obj.level + obj.type.code);
                    }
                    continue;
                }
                const tile = this.getTile(x, y);
                if (tile != null) {
                    tiles.push(tile.code);
                    continue;
                }
                throw new Error('Everything should have a tile');
            }
        }
        return [
            3,
            this.faction.code,
            this.offFaction.code,
            this.name,
            tiles.join(''),
            this.poi.tiberium,
            this.poi.crystal,
            this.poi.power,
            this.poi.infantry,
            this.poi.vehicle,
            this.poi.air,
            this.poi.defense,
            'newEconomy',
        ].join('|');
    }

    toStringColor(): string {
        const output: string[] = [];
        for (let y = 0; y < Base.MaxBaseY; y++) {
            const row: string[] = [];
            for (let x = 0; x < Base.MaxX; x++) {
                const tile = this.getTile(x, y);

                if (tile.code === Tile.Tiberium.code) {
                    row.push(color(' # ', ConsoleColor.Green));
                } else if (tile.code === Tile.Crystal.code) {
                    row.push(color(' # ', ConsoleColor.Blue));
                } else {
                    row.push(' . ');
                }
            }
            output.push(row.join(''));
        }
        return output.join('\n');
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
