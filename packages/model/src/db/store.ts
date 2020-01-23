import * as FireStore from 'typesaurus/adaptor';
import { Model, ModelUtil } from './model';

export class Store<T extends Model<T>> {
    maker: new (obj?: Partial<T>) => T;
    table: string;
    constructor(table: string, maker: new () => T) {
        this.maker = maker;
        this.table = table;
    }

    private async query<K extends keyof T>(obj: Partial<Record<K, T[K] | T[K][]>>, limit: number): Promise<T[]> {
        let query = await FireStore.default()
            .collection(this.table)
            .limit(limit);
        for (const [key, value] of Object.entries(obj)) {
            if (Array.isArray(value)) {
                query = query.where(key, 'in', value);
            } else {
                query = query.where(key, '==', value);
            }
        }
        const res = await query.get();
        return res.docs.map(c => {
            const res = new this.maker(c.data() as T);
            res.id = c.id;
            return res;
        });
    }
    async getAllBy<K extends keyof T>(obj: Partial<Record<K, T[K] | T[K][]>>, limit = 100): Promise<T[]> {
        return this.query(obj, limit);
    }

    async getBy<K extends keyof T>(obj: Partial<Record<K, T[K] | T[K][]>>): Promise<T | undefined> {
        const doc = await this.query(obj, 1);
        if (doc.length == 1) {
            return doc[0];
        }
        return undefined;
    }

    create() {
        return new this.maker();
    }

    async get(id: T['id']): Promise<T | undefined> {
        const doc = FireStore.default()
            .collection(this.table)
            .doc(id);
        const docObj = await doc.get();
        if (docObj.exists) {
            return new this.maker(docObj.data() as T);
        }
        return undefined;
    }
    async getOrCreate(id: T['id']): Promise<T> {
        const obj = await this.get(id);
        if (obj == null) {
            return new this.maker({ id } as Partial<T>);
        }
        return obj;
    }

    async delete(id: T['id']): Promise<void> {
        const doc = FireStore.default()
            .collection(this.table)
            .doc(id);
        await doc.delete();
    }

    async set(id: T['id'], obj: T): Promise<void> {
        const doc = FireStore.default()
            .collection(this.table)
            .doc(id);

        obj.updatedAt = ModelUtil.TimeStamp();
        const updateObj = { ...obj };
        delete updateObj.id;
        await doc.set(updateObj, { merge: true });
    }
    async save(obj: T): Promise<void> {
        return this.set(obj.id, obj);
    }

    async transaction(id: T['id'], update: (obj: T) => any | Promise<any>): Promise<T> {
        const doc = FireStore.default()
            .collection(this.table)
            .doc(id);

        let currentObj: T | null = null;
        await FireStore.default().runTransaction(async transaction => {
            const docObj = await transaction.get(doc);
            const obj = new this.maker(docObj.data() as T);
            await update(obj);

            obj.updatedAt = ModelUtil.TimeStamp();
            const updateObj = { ...obj };
            delete updateObj.id;
            await transaction.set(doc, updateObj, { merge: true });
            currentObj = obj;
        });
        if (currentObj == null) {
            throw new Error('Failed to complete transaction');
        }
        return currentObj;
    }
}
