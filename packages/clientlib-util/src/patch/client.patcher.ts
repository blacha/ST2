import { ClientLibPatchGetter } from './patch.getter';
import { ClientLibPatchFunction } from './patch.replacement';
import { ClientLibClass } from '@cncta/clientlib';

export type StringFunc = (obj: any) => string;

export interface ClientPatch {
    isPatched(k: any): boolean;
    /** apply the patch */
    apply(target: Function): boolean;
    /** Remove the patch */
    remove(target: Function): void;
}
export interface PatchedId {
    $Id: number;
}
/**
 * Pi Interface for the new patches
 * Po Object that is being patched
 */
export class ClientLibPatch<Pi = {}, Po extends {} = {}> {
    patches: ClientPatch[] = [];
    currentClass: Function | null;
    getBaseObject: () => ClientLibClass<Po>;

    constructor(obj: () => ClientLibClass<Po>) {
        this.getBaseObject = obj;
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
    public addGetter(key: keyof Pi, sourceFunctionName: keyof Po, re: RegExp): ClientLibPatchGetter<Pi, Po> {
        const getter = new ClientLibPatchGetter(key, sourceFunctionName, re);
        this.patches.push(getter);
        return getter;
    }

    public replaceFunction(sourceFunctionName: keyof Po, targetFunction: Function): ClientLibPatchFunction<Po> {
        const replacement = new ClientLibPatchFunction(sourceFunctionName, targetFunction);
        this.patches.push(replacement);
        return replacement;
    }

    public static findFunctionInProto(target: Function, toFind: string | RegExp): string | null {
        for (const functionName of Object.keys(target.prototype)) {
            const value = target.prototype[functionName];
            if (typeof value != 'function') {
                continue;
            }
            const functionData: string = value.toString();
            if (typeof toFind == 'string') {
                if (functionData.includes(toFind)) {
                    return functionData;
                }
            } else if (functionData.match(toFind) != null) {
                return functionData;
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
        const extracted = source.match(extract);
        if (extracted == null) {
            throw new Error(`Unable to extract "${toFind}" from target:${target}`);
        }
        return extracted[1];
    }

    /**
     * Apply all patches
     */
    public apply() {
        const currentClass = this.getBaseObject();
        for (const patch of this.patches) {
            patch.apply(currentClass);
        }
    }

    /** Remove all patches */
    public remove() {
        const currentClass = this.getBaseObject();
        for (const patch of this.patches) {
            patch.remove(currentClass);
        }
    }
}
