export class Tile {
    static Empty: Tile = new Tile('Empty', '.', 0);
    static Crystal: Tile = new Tile('Crystal', 'c', 1);
    static Tiberium: Tile = new Tile('Tiberium', 't', 2);
    static Unknown: Tile = new Tile('Unknown', '?', 3);
    static Woods: Tile = new Tile('Woods', 'j', 4);
    static Scrub: Tile = new Tile('Scrub', 'h', 5);
    static Oil: Tile = new Tile('Oil', 'l', 6);
    static Swamp: Tile = new Tile('Swamp', 'k', 7);

    static Map: Record<string, Tile> = {
        t: Tile.Tiberium,
        c: Tile.Crystal,
        '.': Tile.Empty,
        j: Tile.Woods,
        h: Tile.Scrub,
        l: Tile.Oil,
        k: Tile.Swamp,
    };

    static Id = [Tile.Empty, Tile.Crystal, Tile.Tiberium, Tile.Unknown, Tile.Woods, Tile.Scrub, Tile.Oil, Tile.Swamp];

    id: number;
    name: string;
    code: string;

    constructor(name: string, code: string, id: number) {
        this.id = id;
        this.name = name;
        this.code = code;
    }

    toString(): string {
        return '<Tile:' + this.name + '>';
    }

    get className(): string {
        return this.name.toLowerCase();
    }

    static make(char: string): Tile | null {
        char = char.charAt(0).toLocaleLowerCase();
        const tile = Tile.Map[char];
        if (tile != null) {
            return tile;
        }

        return null;
    }
}
