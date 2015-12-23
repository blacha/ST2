import {LogStream, ConsoleLogStream} from './stream';
import {LogMessage} from './message';
var INSTANCE:Log;

export class Log {
    static TRACE = 10;
    static DEBUG = 20;
    static INFO = 30;
    static WARN = 40;
    static ERROR = 50;
    static FATAL = 60;

    static LEVELS = {
        trace: Log.TRACE,
        debug: Log.DEBUG,
        info: Log.INFO,
        warn: Log.WARN,
        error: Log.ERROR,
        fatal: Log.FATAL
    };

    private keys;
    private parent:Log;
    private streams:LogStream[];

    public hostname:string;

    constructor(parent:Log, keys?) {
        this.keys = keys;
        this.parent = parent;

    }

    static getInstance():Log {
        if (INSTANCE == null) {
            INSTANCE = new Log(null, {name: 'ST'});
            INSTANCE.hostname = typeof window === 'undefined' ? '?' : window.location.host;
            INSTANCE.addStream(new ConsoleLogStream(Log.TRACE));
        }
        return INSTANCE;
    }

    child(keys):Log {
        return new Log(this, keys);
    }

    static child(keys):Log {
        return Log.getInstance().child(keys);
    }

    addStream(stream:LogStream):Log {
        this.streams = this.streams || <LogStream[]> [];
        this.streams.push(stream);
        return this;
    }

    static addStream(stream:LogStream):Log {
        return Log.getInstance().addStream(stream);
    }

    protected addKeys(obj) {
        if (this.parent) {
            this.parent.addKeys(obj);
        }
        var keys = this.keys;
        Object.keys(keys).forEach(function (key) {
            obj[key] = keys[key];
        });
        return obj;
    }

    public trace(data:Object|string, msg?:string) {
        this.log(Log.TRACE, data, msg);
    }

    public debug(data:Object|string, msg?:string) {
        this.log(Log.DEBUG, data, msg);
    }

    public info(data:Object|string, msg?:string) {
        this.log(Log.INFO, data, msg);
    }

    public warn(data:Object|string, msg?:string) {
        this.log(Log.WARN, data, msg);
    }

    public error(data:Object|string, msg?:string) {
        this.log(Log.ERROR, data, msg);
    }

    public fatal(data:Object|string, msg?:string) {
        this.log(Log.FATAL, data, msg);
    }

    private log(level:number, data:Object|string, msg?:string) {
        var output:LogMessage = {
            pid: 0,
            time: new Date(),
            hostname: INSTANCE.hostname,
            level: level,
            msg: null,
            v: 0
        };

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

        this.write(output);
    }

    private write(message:LogMessage):boolean {
        if (this.streams && this.streams.length > 0) {
            for (var i = 0; i < this.streams.length; i++) {
                var obj = this.streams[i];
                obj.write(message);
            }
            return true;
        }

        if (this.parent) {
            return this.parent.write(message);
        }
    }
}

