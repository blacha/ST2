/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Point } from '@cncta/clientlib';
import { BuildingType } from '../building/building.type';
import { GameResource, GameResources } from '../game.resources';
import { BaseProduction } from '../production';
import { BaseOutput } from '../production/calculator';
import { Base } from './base';
import { BaseIter } from './base.iter';
import { BaseOptimizer } from './base.optimizer';
import { Tile } from './tile';

export interface AccumulatorLocation extends Point {
    touch: number;
}
export interface SiloCount {
    [siloCount: number]: Point[];
    '3': Point[];
    '4': Point[];
    '5': Point[];
    '6': Point[];
    /**
     * Silo count shifted by 10
     * @example
     * - Base with 2x4 & 1x5 = 120
     * - Base with 3x3 & 2x4 = 23
     */
    score: number;
}
export type SiloCounts = Record<GameResource | 'mixed', SiloCount>;
export interface BaseCost {
    base: GameResources;
    def: GameResources;
    off: GameResources;
    total: GameResources;
}
export class BaseStats {
    private _computed: Partial<{
        production: BaseOutput;
        score: number;
        silos: SiloCounts;
        tiles: {
            tiberium: number;
            crystal: number;
        };
        cost: BaseCost;
        accumulators: AccumulatorLocation[];
        possibleAccumulators: AccumulatorLocation[];
    }> = {};

    base: Base;

    constructor(base: Base) {
        this.base = base;
    }

    clear() {
        this._computed = {};
    }

    get computed() {
        let existing = this._computed;
        if (existing.silos == null) {
            existing = this.compute();
            this._computed = existing;
        }
        return existing;
    }

    get accumulators() {
        if (this.computed.accumulators == null) {
            this.computePower();
        }
        return this.computed.accumulators!;
    }

    get tiles() {
        return this.computed.tiles!;
    }

    get production(): BaseOutput {
        if (this.computed.production == null) {
            this.computed.production = BaseProduction.getOutput(this.base);
        }
        return this.computed.production!;
    }

    get score(): number {
        return this.computed.score!;
    }

    get silos() {
        return this.computed.silos!;
    }

    /** Total cost to build this base */
    get cost() {
        return this.computed.cost!;
    }

    compute() {
        this.computeSilo();
        this.computeTiles();
        this.computeCost();

        return this._computed;
    }

    private computeCost() {
        // Gamedata hasn't loaded cannot compute the costs
        if (!BuildingType.GDI.CommandCenter.isGameDataLoaded) {
            return;
        }
        const costs = {
            base: new GameResources(),
            off: new GameResources(),
            def: new GameResources(),
            total: new GameResources(),
        };
        this._computed.cost = costs;
        for (const unit of this.base.base.values()) {
            if (unit == null) {
                continue;
            }
            const totalCost = unit.getTotalUpgradeCost();
            costs.total.add(totalCost);
            if (unit.type.isBuildingUnit()) {
                costs.base.add(totalCost);
            } else if (unit.type.isDefUnit()) {
                costs.def.add(totalCost);
            } else {
                costs.off.add(totalCost);
            }
        }
    }

    private computeTiles() {
        const tiles = { tiberium: 0, crystal: 0 };
        for (const tile of this.base.tiles.values()) {
            if (tile == Tile.Crystal) {
                tiles.crystal++;
            } else if (tile == Tile.Tiberium) {
                tiles.tiberium++;
            }
        }
        this._computed.tiles = tiles;
    }

    private computeSilo() {
        const tiberium: SiloCount = { 3: [], 4: [], 5: [], 6: [], score: 0 };
        const crystal: SiloCount = { 3: [], 4: [], 5: [], 6: [], score: 0 };
        const mixed: SiloCount = { 3: [], 4: [], 5: [], 6: [], score: 0 };

        const accumulators: AccumulatorLocation[] = [];
        const MIN_SILO = 3;
        // TODO this is not super efficient, could be improved but generally runs in <1ms
        Base.buildingForEach((x, y) => {
            const tile = this.base.getTile(x, y);
            if (tile != Tile.Empty) {
                return;
            }
            let cry = 0;
            let tib = 0;
            let empty = 0;
            for (const pt of BaseIter.BaseXyIter(x, y)) {
                const tile = this.base.getTile(pt.x, pt.y);
                if (tile == Tile.Empty) {
                    empty++;
                } else if (tile == Tile.Crystal) {
                    cry++;
                } else if (tile == Tile.Tiberium) {
                    tib++;
                }
            }

            if (empty > 6) {
                accumulators.push({ x, y, touch: empty });
            }

            if (tib + cry > 3 && tib > 0 && cry > 0) {
                mixed[tib + cry].push({ x, y });
                return;
            }
            // No one cares about one or two silos
            if (tib < MIN_SILO && cry < MIN_SILO) {
                return;
            }

            if (cry == 0) {
                tiberium[tib].push({ x, y });
            }
            if (tib == 0) {
                crystal[cry].push({ x, y });
            }
        });

        for (let i = 0; i <= 6 - MIN_SILO; i++) {
            tiberium.score += tiberium[i + MIN_SILO].length * 10 ** i;
            crystal.score += crystal[i + MIN_SILO].length * 10 ** i;
            mixed.score += mixed[i + MIN_SILO].length * 10 ** i;
        }

        this._computed.possibleAccumulators = accumulators;
        this._computed.silos = { tiberium, crystal, mixed } as SiloCounts;
        this._computed.score = tiberium.score + crystal.score * 0.1 + mixed.score * 0.25;
    }

    computePower() {
        const accumulators = this.computed.possibleAccumulators;
        if (accumulators == null || accumulators.length == 0 || this._computed.silos == null) {
            this._computed.accumulators = [];
            return;
        }

        let bestScore = 0;
        let bestAccumulators: AccumulatorLocation[] = [];
        const maxAccumulators = 5;
        const base = new Base();

        /**
         * 4 x 8 touch accumulators next to each other in a square
         * use 25 buildings, 4 accumulators 21 power plants
         **/

        const BestPowerLayoutCount = [0, 9, 15, 21, 25, 31, 35];

        for (const pt of accumulators) {
            let score = 0;
            const current: AccumulatorLocation[] = [];
            base.clear();
            BaseOptimizer.BuildAccumulator(base, pt.x, pt.y);
            current.push(pt);
            score += pt.touch == 8 ? 2 : 1.5;

            for (const other of accumulators) {
                const building = base.getBase(other.x, other.y);
                if (building != null) {
                    continue;
                }
                const buildCount = BaseOptimizer.BuildAccumulator(base, other.x, other.y, false);
                if (buildCount + base.base.size > 30) {
                    continue;
                }
                BaseOptimizer.BuildAccumulator(base, other.x, other.y);
                current.push(other);
                score += pt.touch == 8 ? 2 : 1.5;
                if (current.length >= maxAccumulators) {
                    break;
                }
            }

            const sizeRatio = base.base.size / BestPowerLayoutCount[current.length];
            const finalScore = Math.floor((score / sizeRatio) * 100);

            if (finalScore > bestScore) {
                bestScore = finalScore;
                bestAccumulators = current;
            }
        }
        const power = {} as SiloCount;
        for (const accumulator of bestAccumulators) {
            if (power != null) {
                power[accumulator.touch] = power[accumulator.touch] || [];
                power[accumulator.touch].push(accumulator);
            }
        }
        this._computed.silos.power = power;
        this._computed.accumulators = bestAccumulators;
    }
}
