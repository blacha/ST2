import { ClientLibPatchGetter, VarGetter } from './patch.getter';
import { ClientLibPatchFunction } from './patch.replacement';

export type StringFunc = (obj: any) => string;

export interface ClientPatch<Po extends typeof BaseClass = typeof BaseClass> {
    isPatched(k: any): boolean;
    /** apply the patch */
    apply(target: Po): boolean;
    /** Remove the patch */
    remove(target: Po): void;
}
export interface PatchedId {
    $Id: number;
}
// TODO can we work around declaring a basic class to extend from?
export declare class BaseClass {}
/**
 * Pi Interface for the new patches
 * Po Object that is being patched
 */
export class ClientLibPatch<Pi = {}, Po extends typeof BaseClass = typeof BaseClass> {
    patches: ClientPatch[] = [];
    currentClass: Function | null;
    baseObject?: Po;
    path: string;

    constructor(path: string) {
        this.path = path;
    }

    setObject(o: Po) {
        this.baseObject = o;
    }

    getBaseObject(): Po {
        if (this.baseObject == null) {
            const parts = this.path.split('.');
            let current: any = window;
            while (parts.length > 0) {
                const currentPart = parts.shift();
                if (currentPart == null) {
                    throw new Error('Unable find object in path: ' + this.path);
                }
                current = current[currentPart];
                if (current == null) {
                    throw new Error('Unable to find object in path: ' + this.path);
                }
            }
            this.baseObject = current;
        }
        return this.baseObject as Po;
    }

    static hasPatchedId(k: any): k is PatchedId {
        return k != null && typeof k['$Id'] != 'undefined';
    }

    public isPatched(k: any): k is Pi {
        for (const patch of this.patches) {
            if (!patch.isPatched(k)) {
                return false;
            }
        }
        return true;
    }

    /**
     * Patch a object to provide a new getter
     *
     * @param key name of getter to create
     * @param sourceFunctionName name of function to use as the source information
     * @param re text to find inside of source function to find the correct 'KJNGHF'
     */
    public addGetter(key: keyof Pi, sourceFunctionName: keyof Po['prototype'], re: RegExp): ClientLibPatchGetter<Pi> {
        const getter = new ClientLibPatchGetter(key, () => {
            const currentData = (this.baseObject as any).prototype[sourceFunctionName];
            if (currentData == null) {
                throw new Error('Failed to load patch');
            }

            const matches = currentData.toString().match(re);
            if (!matches) {
                throw new Error('Failed to load patch, no matches');
            }
            return matches[1];
        });
        this.patches.push(getter);
        return getter;
    }

    public addAlias(key: keyof Pi, target: VarGetter) {
        if (target == null) {
            throw new Error(`Failed to add patch: ${key} missing target`);
        }
        const getter = new ClientLibPatchGetter(key, target);
        this.patches.push(getter);
        return getter;
    }

    public replaceFunction(
        sourceFunctionName: keyof Po['prototype'],
        targetFunction: Function,
    ): ClientLibPatchFunction<Po> {
        const replacement = new ClientLibPatchFunction(sourceFunctionName, targetFunction);
        this.patches.push(replacement);
        return replacement;
    }

    public static findFunctionInProto(
        target: Function,
        toFind: string | RegExp,
    ): { key: string; value: string } | null {
        for (const functionName of Object.keys(target.prototype)) {
            const value = target.prototype[functionName];
            if (typeof value != 'function') {
                continue;
            }
            const functionData: string = value.toString();
            if (typeof toFind == 'string') {
                if (functionData.includes(toFind)) {
                    return { key: functionName, value: functionData };
                }
            } else if (functionData.match(toFind) != null) {
                return { key: functionName, value: functionData };
            }
        }
        return null;
    }

    /**
     * Look for a function inside the target's prototype where it contains toFind, then extract the first match.
     * @param target Class to search inside
     * @param toFind text to find
     * @param extract text to extract
     */
    public static extractValueFromFunction(target: Function, toFind: string | RegExp, extract: RegExp): string {
        const source = ClientLibPatch.findFunctionInProto(target, toFind);
        if (source == null) {
            throw new Error(`Unable to extract "${toFind}" from target:${target}`);
        }
        const extracted = source.value.match(extract);
        if (extracted == null) {
            throw new Error(`Unable to extract "${toFind}" from target:${target}`);
        }
        return extracted[1];
    }

    /**
     * Apply all patches
     */
    public apply() {
        const obj = this.getBaseObject();
        for (const patch of this.patches) {
            patch.apply(obj);
        }
    }

    /** Remove all patches */
    public remove() {
        const obj = this.getBaseObject();

        for (const patch of this.patches) {
            patch.remove(obj);
        }
    }
}
