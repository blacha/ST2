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
function getLogStatus(level: number): string {
    if (level <= 10) {
        return 'TRACE';
    }
    if (level <= 20) {
        return 'DEBUG';
    }
    if (level <= 30) {
        return 'INFO';
    }
    if (level <= 40) {
        return 'WARN';
    }
    if (level <= 50) {
        return 'ERROR';
    }
    return 'FATAL';
}

export const StLogStream = {
    level: Log.INFO,
    setLevel(level: LogLevel) {
        this.level = level;
    },
    formatObject(obj: Record<string, any>): string[] {
        const kvs = [];
        for (const key of Object.keys(obj)) {
            if (IGNORE_KEYS[key] === true) {
                continue;
            }

            const value = obj[key];
            if (value == null || value === '') {
                continue;
            }

            let output = '';
            const typeofValue = typeof value;
            if (typeofValue === 'number') {
                output = String(value);
            } else if (typeofValue === 'string') {
                output = value;
            } else if (typeofValue === 'object') {
                const subOutput = this.formatObject(value);
                if (subOutput.length > 0) {
                    output = `{ ${subOutput.join(', ')} }`;
                }
            } else {
                output = String(value);
            }

            if (output != '') {
                kvs.push(`${key}=${output}`);
            }
        }
        return kvs;
    },
    write(msg: LogMessage) {
        // @ts-ignore
        if (typeof window == 'undefined') {
            console.log(JSON.stringify(msg));
        } else {
            const kvString = this.formatObject(msg);
            console.log(`[${msg.time.toISOString()}] ${getLogStatus(msg.level)} ${msg.msg} ${kvString}`);
        }
    },
};

StLog.addStream(StLogStream);
