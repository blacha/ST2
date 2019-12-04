export class Faction {
    static Gdi: Faction = new Faction('G', 'GDI');
    static Nod: Faction = new Faction('N', 'NOD');
    static Forgotten: Faction = new Faction('F', 'Forgotten');
    code: string;
    name: string;

    constructor(code: string, name: string) {
        this.code = code;
        this.name = name;
    }

    static fromID(id: number) {
        if (id == 7 || id == 4 || id == 6) {
            return Faction.Forgotten;
        }

        if (id == 1) {
            return Faction.Gdi;
        }

        if (id == 2) {
            return Faction.Nod;
        }

        return Faction.Forgotten;
    }

    static make(char: string): Faction | null {
        const firstChar = char.charAt(0).toUpperCase();
        if (firstChar == 'N') {
            return Faction.Nod;
        }

        if (firstChar == 'G') {
            return Faction.Gdi;
        }

        if (firstChar == 'F') {
            return Faction.Forgotten;
        }

        return null;
    }

    toString() {
        return '<Faction:' + this.name + '>';
    }
}
