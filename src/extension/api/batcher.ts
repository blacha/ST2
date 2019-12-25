export interface BatchCache<T, R> {
    id: string;
    obj: T;
    def: Defered<R>;
    timestamp: number;
}

interface Defered<T> {
    promise: Promise<T>;
    resolve: (arg: T) => void;
    reject: (e: Error) => void;
}

function promise<T>(): Defered<T> {
    const output: Partial<Defered<T>> = {};
    const promise = new Promise<T>((resolve, reject) => {
        output.resolve = resolve;
        output.reject = reject;
    });
    output.promise = promise;
    return output as Defered<T>;
}
const CacheTime = 5 * 60 * 1000;

export abstract class Batcher<K extends keyof T, T, R> {
    idField: K;
    sendTimeout: any = null;

    toSend: Map<string, BatchCache<T, R>> = new Map();
    /** Cached objects afeter being sent */
    cache: Map<string, BatchCache<T, R>> = new Map();
    /** Max MS to wait between requests */
    delay: number;
    /** Max number of objects in one request */
    maxSize: number;

    constructor(idField: K, delay = 100, maxSize = 25) {
        this.idField = idField;
        this.delay = delay;
        this.maxSize = maxSize;
    }

    queue(obj: T): Promise<R> {
        const idVal = String(obj[this.idField]);
        let sending = this.toSend.get(idVal);
        if (sending) {
            return sending.def.promise;
        }

        const cached = this.cache.get(idVal);
        if (cached != null) {
            if (Date.now() - cached.timestamp > CacheTime) {
                this.cache.delete(idVal);
            } else {
                return cached.def.promise;
            }
        }

        sending = {
            id: idVal,
            obj,
            def: promise<R>(),
            timestamp: Date.now(),
        };

        this.toSend.set(idVal, sending);
        if (this.sendTimeout == null) {
            this.sendTimeout = setTimeout(() => this.flush(), this.delay);
        }

        if (this.toSend.size > this.maxSize) {
            if (this.sendTimeout) {
                clearTimeout(this.sendTimeout);
            }
            const toSend = this.toSend;
            this.toSend = new Map();
            this.exec(toSend);
        }

        return sending.def.promise;
    }

    flush() {
        if (this.sendTimeout == null) {
            return;
        }
        clearTimeout(this.sendTimeout);
        this.exec(this.toSend);
    }

    async exec(data: Map<string, BatchCache<T, R>>) {
        const toSend = Array.from(data.values());
        data.clear();

        const res = await this.run(toSend.map(c => c.obj));
        for (let i = 0; i < toSend.length; i++) {
            toSend[i].def.resolve(res[i]);
            this.cache.set(toSend[i].id, toSend[i]);
        }
    }

    abstract async run(data: T[]): Promise<R[]>;
}
