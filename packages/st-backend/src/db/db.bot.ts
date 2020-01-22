// import { AccountSessionId, BaseFireStore, FireStoreTable, WorldId, WorldSessionId } from './db';

// export interface TaAccountSchema extends BaseFireStore {
//     email: string;
//     password: string;
//     session: Session<AccountSessionId>;
//     worlds: WorldSession[];
// }

// export interface WorldSession extends Session<WorldSessionId> {
//     worldId: WorldId;
// }

// export interface Session<T extends string> {
//     id: T;
//     expiresAt: number;
// }

// export type TaAccountStore = FireStoreTable<'account', TaAccountSchema>;
