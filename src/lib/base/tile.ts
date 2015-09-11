export class Tile {
    static Empty:Tile = new Tile('Empty', '.', 0);
    static Crystal:Tile = new Tile('Crystal', 'c', 1);
    static Tiberium:Tile = new Tile('Tiberium', 't', 2);

    static Woods:Tile = new Tile('Woods', 'j', 4);
    static Scrub:Tile = new Tile('Scrub', 'h', 5);
    static Oil:Tile = new Tile('Oil', 'l', 6);
    static Swamp:Tile = new Tile('Swamp', 'k', 7);

    static MAP = {
        't': Tile.Tiberium,
        'c': Tile.Crystal,
        '.': Tile.Empty,
        'j': Tile.Woods,
        'h': Tile.Scrub,
        'l': Tile.Oil,
        'k': Tile.Swamp
    };

    static ID = [
        Tile.Empty,
        Tile.Crystal,
        Tile.Tiberium,
        null,
        Tile.Woods,
        Tile.Scrub,
        Tile.Oil,
        Tile.Swamp
    ];

    constructor(private name:string, private code:string, private id:number) {
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
