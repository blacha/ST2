import { PartialResourceMap } from '../extension/@types/client.lib.const';

export interface Resources {
    power: number;
    tiberium: number;
    crystal: number;
    credits: number;
}

export type GameResource = 'power' | 'crystal' | 'tiberium' | 'credits';

export class GameResources implements Resources {
    static TIBERIUM: GameResource = 'tiberium';
    static CRYSTAL: GameResource = 'crystal';
    static POWER: GameResource = 'power';
    static CREDIT: GameResource = 'credits';

    tiberium = 0;
    crystal = 0;
    power = 0;
    credits = 0;

    public get total(): number {
        return this.power + this.tiberium + this.crystal + this.credits;
    }

    public addResource(key: GameResource, amount: number) {
        this[key] += amount;
    }

    public addResources(obj: PartialResourceMap) {
        this.addResource('tiberium', obj['Tiberium'] || 0);
        this.addResource('crystal', obj['Crystal'] || 0);
        this.addResource('power', obj['Power'] || 0);
        this.addResource('credits', obj['Credits'] || 0);
    }
    public add(obj: GameResources) {
        this.power += obj.power || 0;
        this.tiberium += obj.tiberium || 0;
        this.crystal += obj.crystal || 0;
        this.credits += obj.credits || 0;
    }

    static fromResourceType(r: PartialResourceMap) {
        const res = new GameResources();
        res.addResources(r);
        return res;
    }

    public clone() {
        const obj = new GameResources();
        obj.tiberium = this.tiberium;
        obj.power = this.power;
        obj.crystal = this.crystal;
        obj.credits = this.credits;
        return obj;
    }

    toJson() {
        return {
            tiberium: this.tiberium,
            crystal: this.crystal,
            power: this.power,
            credits: this.credits,
        };
    }
}
