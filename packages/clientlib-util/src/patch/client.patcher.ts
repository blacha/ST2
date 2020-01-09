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

    public addGetter(key: keyof Pi, sourceFunctionName: string, re: RegExp): ClientLibPatchGetter<Pi> {
        const getter = new ClientLibPatchGetter(key, sourceFunctionName, re);
        this.patches.push(getter);
        return getter;
    }

    public replaceFunction(sourceFunctionName: keyof Po, targetFunction: Function): ClientLibPatchFunction<Po> {
        const replacement = new ClientLibPatchFunction(sourceFunctionName, targetFunction);
        this.patches.push(replacement);
        return replacement;
    }

    /**
     * Lookup dot paths inside of object
     *
     * @example
     * ClientLib.Foo.Bar
     *
     * @param obj object to lookup in
     * @param path path to find
     */
    public static getObjectFromPath(obj: any, path: string): Function | null {
        const keys = path.split('.');

        let currentProto = obj as any;
        while (keys.length > 0) {
            const currentKey = keys.shift();
            if (currentKey == null) {
                return null;
            }
            currentProto = currentProto[currentKey];
            if (currentKey == null) {
                throw new Error(`Cannot find path : ${path} @ ${currentKey}`);
            }
        }
        return currentProto;
    }

    public static findFunctionInProto(obj: any, path: string, toFind: string | RegExp): string | null {
        const target = ClientLibPatch.getObjectFromPath(obj, path);
        if (target == null) {
            throw new Error(`Unable to find target prototype to patch path: ${path}`);
        }

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

    public static extractValueFromFunction(obj: any, path: string, toFind: string | RegExp, extract: RegExp): string {
        const source = ClientLibPatch.findFunctionInProto(obj, path, toFind);
        if (source == null) {
            throw new Error(`Unable to extract value from path:${path}`);
        }
        const extracted = source.match(extract);
        if (extracted == null) {
            throw new Error(`Unable to extract value from path:${path}`);
        }
        return extracted[1];
    }

    public apply() {
        const currentClass = this.getBaseObject();
        for (const patch of this.patches) {
            patch.apply(currentClass);
        }
    }

    public remove() {
        const currentClass = this.getBaseObject();
        for (const patch of this.patches) {
            patch.remove(currentClass);
        }
    }
}
