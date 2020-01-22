import * as FireStore from 'typesaurus/adaptor';
import { Model, ModelUtil } from './model';

export class Store<T extends Model<T>> {
    maker: new (obj?: T) => T;
    table: string;
    constructor(table: string, maker: new () => T) {
        this.maker = maker;
        this.table = table;
    }

    async getAllBy<K extends keyof T>(key: K, value: T[K], limit = 100): Promise<T[]> {
        const doc = await FireStore.default()
            .collection(this.table)
            .where(key as string, '==', value)
            .limit(limit)
            .get();
        return doc.docs.map(c => new this.maker(c.data() as T));
    }

    async getBy<K extends keyof T>(key: K, value: T): Promise<T | undefined> {
        const doc = await FireStore.default()
            .collection(this.table)
            .where(key as string, '==', value)
            .limit(1)
            .get();
        if (doc.size == 1) {
            return new this.maker(doc.docs[0].data() as T);
        }
        return undefined;
    }

    create() {
        return new this.maker();
    }

    async getOrCreate(id: T['id']): Promise<T> {
        const doc = FireStore.default()
            .collection(this.table)
            .doc(id);
        const docObj = await doc.get();
        return new this.maker(docObj.data() as T);
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

    async transaction(id: T['id'], update: (obj: T) => any | Promise<any>) {
        const doc = FireStore.default()
            .collection(this.table)
            .doc(id);

        await FireStore.default().runTransaction(async transaction => {
            const docObj = await transaction.get(doc);
            const obj = new this.maker(docObj.data() as T);
            await update(obj);

            obj.updatedAt = ModelUtil.TimeStamp();
            const updateObj = { ...obj };
            delete updateObj.id;
            await transaction.set(doc, updateObj, { merge: true });
        });
    }
}
