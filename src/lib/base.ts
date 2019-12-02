import { CityInfoData } from '../api/player.info';
import { TaBase, TaTile } from '../client.base';
import { Buildable } from './base/buildable';
import { Tile } from './base/tile';
import { Building } from './building/building';
import { BuildingType } from './building/building.type';
import { Constants } from './constants';
import { Faction } from './data/faction';
import { GameDataObject } from './data/game.data.object';
import { GameResource } from './game.resources';
import { JsonPlayerObject } from './objects/player';
import { DefUnitType } from './unit/def.unit.type';
import { OffUnitType } from './unit/off.unit.type';
import { Unit } from './unit/unit';
import { ID_MAP } from './util';

interface CNCLocation {
    x: number;
    y: number;
}
interface CNCBaseObject extends CNCLocation {
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

    constructor(name = 'Base', faction: Faction = Faction.GDI) {
        this.name = name;
        this.faction = faction;
        this.tiles = [];
        this.upgrades = [];
        this.base = [];
    }

    getSurroundings(x: number, y: number, buildings?: number[], tiles?: Tile[]): CNCBaseObject[] {
        const output: CNCBaseObject[] = [];
        for (let dx = -1; dx < 2; dx++) {
            for (let dy = -1; dy < 2; dy++) {
                const offX = x + dx;
                const offY = y + dy;
                if (offX < 0 || offX > Constants.MAX_BASE_X) {
                    continue;
                }
                if (offY < 0 || offY > Constants.MAX_BASE_Y) {
                    continue;
                }
                if (offY === y && offX === x) {
                    continue;
                }

                const building = this.getBase(offX, offY);
                const tile = this.getTile(offX, offY);
                if (building == null) {
                    if (tiles && tiles.indexOf(tile) > -1) {
                        output.push({ x: offX, y: offY, tile: tile });
                    }
                    continue;
                }

                if (buildings == null && tiles == null) {
                    output.push({
                        x: offX,
                        y: offY,
                        building: building,
                        tile: tile,
                    });
                    continue;
                }

                if (buildings != null) {
                    //console.log(building.getID(), building.getName(), buildings);
                    if (buildings.indexOf(building.type.id) > -1) {
                        output.push({
                            x: offX,
                            y: offY,
                            building: building,
                            tile: tile,
                        });
                        continue;
                    }
                }

                if (tiles != null) {
                    //console.log(tile.getCode(), tiles);
                    if (tiles.indexOf(tile) > -1) {
                        output.push({
                            x: offX,
                            y: offY,
                            building: building,
                            tile: tile,
                        });
                        continue;
                    }
                }
            }
        }
        return output;
    }

    static getSurroundingXy(x: number, y: number): CNCLocation[] {
        const output = [];
        for (let dx = -1; dx < 2; dx++) {
            for (let dy = -1; dy < 2; dy++) {
                const offX = x + dx;
                const offY = y + dy;
                if (offX < 0 || offX > Constants.MAX_BASE_X) {
                    continue;
                }
                if (offY < 0 || offY > Constants.MAX_BASE_Y) {
                    continue;
                }
                if (offY === y && offX === x) {
                    continue;
                }
                output.push({ x: offX, y: offY });
            }
        }

        return output;
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

    static buildingForEach(callback: (x: number, y: number) => void) {
        for (let x = 0; x < Constants.MAX_BASE_X; x++) {
            for (let y = 0; y < Constants.MAX_Y; y++) {
                callback(x, y);
            }
        }
    }

    static loadFromCity(player: JsonPlayerObject, city: CityInfoData): Base {
        const upgrades = Object.keys(player.research)
            .filter(key => player.research[key] > 1)
            .map(val => parseInt(val), 10);

        const cncBase: TaBase = {
            x: city.x,
            y: city.y,
            level: city.level,
            name: city.name,
            faction: player.faction,
            version: 0,
            world: player.world,
            owner: player.name,
            player: player.name,
            tiles: city.tiles,
            upgrades,
        };

        return Base.load(cncBase);
    }

    static load(cncBase: TaBase): Base {
        const output = new Base(cncBase.name, Faction.fromID(cncBase.faction));
        output.x = cncBase.x;
        output.y = cncBase.y;

        for (let y = 0; y < Constants.MAX_Y; y++) {
            for (let x = 0; x < Constants.MAX_BASE_X; x++) {
                const index = Base.$index(x, y);
                const unit = cncBase.tiles[index];
                let tile: Tile;

                if (unit == null) {
                    continue;
                }

                // Give just a number so just a tile
                if (typeof unit === 'number') {
                    tile = Tile.Id[unit];
                    if (tile == null) {
                        continue;
                    }
                    output.setTile(x, y, tile);
                    continue;
                }

                const actualUnit: TaTile = unit as TaTile;
                const unitType: GameDataObject = ID_MAP[actualUnit.id];
                if (unitType == null) {
                    console.error('Unknown unit', actualUnit.id, '@', x, y);
                    continue;
                }

                if (actualUnit.t) {
                    tile = Tile.Id[actualUnit.t];
                    output.setTile(x, y, tile);
                }

                if (unitType instanceof BuildingType) {
                    output.setBase(x, y, new Building(unitType, actualUnit.l));
                } else if (unitType instanceof OffUnitType) {
                    output.setBase(x, y, new Unit(unitType, actualUnit.l));
                } else if (unitType instanceof DefUnitType) {
                    output.setBase(x, y, new Unit(unitType, actualUnit.l));
                } else {
                    console.error('Unknown unitType', unitType);
                }
            }
        }

        output.setUpgrades(cncBase.upgrades);
        return output;
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
