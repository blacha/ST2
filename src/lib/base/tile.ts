export class Tile {
    static Tiberium:Tile = new Tile('Tiberium', 't');
    static Crystal:Tile = new Tile('Crystal', 'c');
    static Empty:Tile = new Tile('Empty', '.');

    static Woods:Tile = new Tile('Woods', 'j');
    static Scrub:Tile = new Tile('Scrub', 'h');
    static Oil:Tile = new Tile('Oil', 'l');
    static Swamp:Tile = new Tile('Swamp', 'k');

    static MAP = {
        't': Tile.Tiberium,
        'c': Tile.Crystal,
        '.': Tile.Empty,
        'j': Tile.Woods,
        'h': Tile.Scrub,
        'l': Tile.Oil,
        'k': Tile.Swamp
    };

    constructor(private name:string, private code:string) {
    }

    getCode():string {
        return this.code;
    }

    getName():string {
        return this.name;
    }

    toString():string {
        return '<Tile:' + this.name + '>';
    }

    getClassName():string {
        return this.name.toLowerCase();
    }

    static make(char:string):Tile {
        char = (char || '').toLocaleLowerCase();
        var t = Tile.MAP[char];
        if (t) {
            return t;
        }

        return null;
    }
}
