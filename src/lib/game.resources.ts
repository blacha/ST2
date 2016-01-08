export class GameResources {

    public power = 0;
    public tiberium = 0;
    public crystal = 0;
    public credits = 0;

    public total() {
        return this.power + this.tiberium + this.credits + this.credits;
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