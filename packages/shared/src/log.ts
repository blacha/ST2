import { Log, LogMessage, LogLevel } from 'bblog';

export const StLog = Log.createLogger({ name: 'st', hostname: '' });

const IGNORE_KEYS: Record<string, boolean> = {
    msg: true,
    level: true,
    v: true,
    time: true,
    pid: true,
    hostname: true,
    name: true,
};

export const StLogStream = {
    level: Log.INFO,
    setLevel(level: LogLevel) {
        this.level = level;
    },
    write(msg: LogMessage) {
        // @ts-ignore
        if (typeof window == 'undefined') {
            console.log(JSON.stringify(msg));
        } else {
            const time = msg.time.toISOString();
            const level = msg.level;
            const text = msg.msg;
            const output = msg as Record<string, any>;
            for (const key of Object.keys(msg)) {
                if (IGNORE_KEYS[key]) {
                    delete output[key];
                }
                if (output[key] == undefined) {
                    delete output[key];
                }
            }

            console.log(time, level, text, output);
        }
    },
};

StLog.addStream(StLogStream);
