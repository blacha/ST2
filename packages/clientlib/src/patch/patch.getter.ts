import { ClientPatch } from './client.patcher';

export class ClientLibPatchGetter<T> implements ClientPatch {
    path: string;
    sourceFunctionName: string;
    targetFunctionName: keyof T;
    re: RegExp;

    matchedVar: string | null;

    constructor(targetFunctionName: keyof T, sourceFunctionName: string, re: RegExp) {
        this.sourceFunctionName = sourceFunctionName;
        this.targetFunctionName = targetFunctionName;
        this.re = re;
    }

    isPatched(k: any): boolean {
        return k != null && typeof k[this.targetFunctionName] !== 'undefined';
    }

    apply(target: Function): boolean {
        const currentData = target.prototype[this.sourceFunctionName];
        if (currentData == null) {
            return false;
        }

        const matches = currentData.toString().match(this.re);
        if (!matches) {
            return false;
        }
        // Make sure the property does not already exist
        if (typeof target.prototype[this.targetFunctionName] !== 'undefined') {
            return true;
        }
        this.matchedVar = matches[1];
        Object.defineProperty(target.prototype, this.targetFunctionName, {
            configurable: true,
            get: function() {
                return this[matches[1]];
            },
        });
        return true;
    }

    remove(target: Function) {
        if (typeof target.prototype[this.targetFunctionName] !== 'undefined') {
            delete target.prototype[this.targetFunctionName];
        }
    }
}
