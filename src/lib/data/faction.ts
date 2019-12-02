export class Faction {
    static GDI: Faction = new Faction('G', 'GDI');
    static NOD: Faction = new Faction('N', 'NOD');
    static Forgotten: Faction = new Faction('F', 'Forgotten');

    constructor(public code: string, public name: string) {}

    getCode() {
        return this.code;
    }

    getName() {
        return this.name;
    }

    getClassName() {
        return this.name.toLowerCase();
    }

    static fromID(id: number) {
        if (id == 7 || id == 4 || id == 6) {
            return Faction.Forgotten;
        }

        if (id == 1) {
            return Faction.GDI;
        }

        if (id == 2) {
            return Faction.NOD;
        }

        return Faction.Forgotten;
    }

    static make(char: string): Faction | null {
        const firstChar = char.charAt(0).toUpperCase();
        if (firstChar == 'N') {
            return Faction.NOD;
        }

        if (firstChar == 'G') {
            return Faction.GDI;
        }

        if (firstChar == 'F') {
            return Faction.Forgotten;
        }

        return null;
    }

    toString() {
        return '<Faction:' + this.getName() + '>';
    }
}
