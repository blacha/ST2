export interface Resources {
    power: number;
    tiberium: number;
    crystal: number;
    credits: number;
}

export type GameResource = 'power' | 'crystal' | 'tiberium' | 'credits';

export class GameResources implements Resources {
    static POWER: GameResource = 'power';
    static CRYSTAL: GameResource = 'crystal';
    static TIBERIUM: GameResource = 'tiberium';
    static CREDIT: GameResource = 'credits';

    power = 0;
    tiberium = 0;
    crystal = 0;
    credits = 0;

    public total() {
        return this.power + this.tiberium + this.crystal + this.credits;
    }

    public addResource(key: GameResource, amount: number) {
        this[key] += amount;
    }

    public add(obj: GameResources) {
        this.power += obj.power || 0;
        this.tiberium += obj.tiberium || 0;
        this.crystal += obj.crystal || 0;
        this.credits += obj.credits || 0;
    }

    public clone() {
        const obj = new GameResources();
        obj.tiberium = this.tiberium;
        obj.power = this.power;
        obj.crystal = this.crystal;
        obj.credits = this.credits;
        return obj;
    }
}
