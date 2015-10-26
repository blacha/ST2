var INSTANCE:Log;

export class Log {
    static TRACE = 10;
    static DEBUG = 20;
    static INFO = 30;
    static WARN = 40;
    static ERROR = 50;
    static FATAL = 60;

    private keys;
    private parent: Log;
    public level: number;

    constructor(parent:Log, keys?) {
        this.keys = keys;
        this.parent = parent;
    }


    static child(keys) {
        if (INSTANCE == null) {
            INSTANCE = new Log(null, { name: 'ST' });
            INSTANCE.level = Log.DEBUG;
        }

        return INSTANCE.child(keys);
    }

    child(keys) {
       return new Log(this, keys);
    }

    protected addKeys(obj) {
        if (this.parent) {
            this.parent.addKeys(obj);
        }
        var keys = this.keys;
        Object.keys(keys).forEach(function(key) {
            obj[key] = keys[key];
        });
        return obj;
    }

    public debug(data:Object|string, msg?: string) {
        this.log(Log.DEBUG, data, msg);
    }
    public info(data:Object|string, msg?: string) {
        this.log(Log.INFO, data, msg);
    }

    private log(level:number, data:Object|string, msg?:string) {
        if (level < INSTANCE.level) {
            return;
        }

        var output = {level: level, msg: null};

        this.addKeys(output);
        if (typeof data === 'string') {
            output.msg = data;
        } else {
            Object.keys(data).forEach(function (key) {
                output[key] = data[key];
            });

            if (msg) {
                output.msg = msg;
            }
        }
        console.log(JSON.stringify(output));
    }
}