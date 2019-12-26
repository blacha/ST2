import { GameResources } from '../game.resources';
import { BaseProduction } from '../production';
import { BaseOutput } from '../production/calculator';
import { Base } from './base';
import { BaseIter } from './base.iter';
import { Tile } from './tile';
import { BuildingType } from '../building/building.type';

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
export interface BaseCost {
    base: GameResources;
    def: GameResources;
    off: GameResources;
    total: GameResources;
}
export class BaseStats {
    private computed: Partial<{
        production: BaseOutput;
        score: number;
        silos: { tiberium: SiloCount; crystal: SiloCount; mixed: SiloCount };
        tiles: {
            tiberium: number;
            crystal: number;
        };
        cost: BaseCost;
    }> = {};
    base: Base;

    constructor(base: Base) {
        this.base = base;
    }

    clear() {
        this.computed = {};
    }

    get tiles() {
        if (this.computed.tiles == null) {
            this.compute();
        }
        return this.computed.tiles!;
    }

    get production(): BaseOutput {
        if (this.computed.production == null) {
            this.computed.production = BaseProduction.getOutput(this.base);
        }
        return this.computed.production;
    }

    get score(): number {
        if (this.computed.score == null) {
            this.compute();
        }
        return this.computed.score!;
    }
    get stats() {
        if (this.computed.silos == null) {
            this.compute();
        }
        return this.computed.silos!;
    }

    /** Total cost to build this base */
    get cost() {
        if (this.computed.cost == null) {
            this.compute();
        }
        return this.computed.cost!;
    }

    private compute() {
        this.computeSilo();
        this.computeTiles();
        this.computeCost();
    }

    private computeCost() {
        // Gamedata hasn't loaded cannot compute the costs
        if (!BuildingType.GDI.CommandCenter.isGameDataLoaded) {
            return;
        }
        const costs = (this.computed.cost = {
            base: new GameResources(),
            off: new GameResources(),
            def: new GameResources(),
            total: new GameResources(),
        });
        for (const unit of this.base.base) {
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
        for (const tile of this.base.tiles) {
            if (tile == Tile.Crystal) {
                tiles.crystal++;
            } else if (tile == Tile.Tiberium) {
                tiles.tiberium++;
            }
        }
        this.computed.tiles = tiles;
    }

    private computeSilo() {
        const tiberium: SiloCount = { 3: 0, 4: 0, 5: 0, 6: 0, score: 0 };
        const crystal: SiloCount = { 3: 0, 4: 0, 5: 0, 6: 0, score: 0 };
        const mixed: SiloCount = { 3: 0, 4: 0, 5: 0, 6: 0, score: 0 };

        const MIN_SILO = 3;
        // TODO this is not super efficient, could be improved but generally runs in <1ms
        Base.buildingForEach((x, y) => {
            const tib = BaseIter.getSurroundings(this.base, x, y, undefined, [Tile.Tiberium]).length;
            const cry = BaseIter.getSurroundings(this.base, x, y, undefined, [Tile.Crystal]).length;

            if (tib + cry > 3 && tib > 0 && cry > 0) {
                mixed[tib + cry] = (mixed[tib + cry] || 0) + 1;
                return;
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

        this.computed.silos = { tiberium, crystal, mixed };
        this.computed.score = tiberium.score + crystal.score * 0.1 + mixed.score * 0.25;
    }
}
