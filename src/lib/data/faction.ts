export class Faction {
    static GDI:Faction = new Faction('G', 'GDI');
    static NOD:Faction = new Faction('N', 'NOD');
    static Forgotten:Faction = new Faction('F', 'Forgotten');

    constructor(public code:string, public name:string) {
    }

    getCode() {
        return this.code;
    }

    getName() {
        return this.name;
    }

    static make(char:string) {
        char = (char || '').toUpperCase();
        if (char == 'N') {
            return Faction.NOD;
        }

        if (char == 'G') {
            return Faction.GDI;
        }

        if (char == 'F') {
            return Faction.Forgotten
        }
        return null;
    }

    toString() {
        return '<Faction:' + this.getName() + '>';
    }
}