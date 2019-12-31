export * from './db.base';
export * from './db.object';
export * from './db.player';

import { DbObject } from './db.object';

export interface BaseLayout {
    layout: string;
    updatedAt: number;
}

export type XyKey = string;
export interface DbLayout extends DbObject {
    layouts: Record<XyKey, BaseLayout>;
}
