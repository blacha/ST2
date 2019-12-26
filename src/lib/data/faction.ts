import { FactionType } from '../../extension/@types/client.lib.const';

export class Faction {
    static Gdi: Faction = new Faction(FactionType.Gdi, 'G', 'Gdi');
    static Nod: Faction = new Faction(FactionType.Nod, 'N', 'Nod');
    static Forgotten: Faction = new Faction(FactionType.Forgotten, 'F', 'Forgotten');
    id: FactionType;
    code: string;
    name: string;

    constructor(id: FactionType, code: string, name: string) {
        this.id = id;
        this.code = code;
        this.name = name;
    }

    static fromId(id: FactionType) {
        if (
            id == FactionType.NpcFortress ||
            id == FactionType.NpcBase ||
            id == FactionType.NpcOutpost ||
            id == FactionType.NpcCamp
        ) {
            return Faction.Forgotten;
        }

        if (id == FactionType.Gdi) {
            return Faction.Gdi;
        }

        if (id == FactionType.Nod) {
            return Faction.Nod;
        }

        return Faction.Forgotten;
    }

    static fromString(char: string): Faction {
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

        throw new Error(`Unknown faction: "${char}"`);
    }

    toString() {
        return '<Faction:' + this.name + '>';
    }
}
