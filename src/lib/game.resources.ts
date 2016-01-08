export interface Resources {
    power: number;
    tiberium: number;
    crystal: number;
    credits: number;
}

export class GameResources implements Resources {
    static POWER = 'power';
    static CRYSTAL = 'crystal';
    static TIBERIUM = 'tiberium';
    static CREDIT = 'credits';

    public power = 0;
    public tiberium = 0;
    public crystal = 0;
    public credits = 0;

    public total() {
        return this.power + this.tiberium + this.crystal + this.credits;
    }

    public addResource(key:string, amount:number) {
        this[key] += amount;
    }

    public add(obj) {
        this.power += obj.power || 0;
        this.tiberium += obj.tiberium || 0;
        this.crystal += obj.crystal || 0 ;
        this.credits += obj.credits || 0;
    }

    public clone() {
        var obj = new GameResources();
        obj.tiberium = this.tiberium;
        obj.power = this.power;
        obj.crystal = this.crystal;
        obj.credits = this.credits;
        return obj;
    }
}