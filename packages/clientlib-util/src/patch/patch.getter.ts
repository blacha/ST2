import { ClientPatch } from './client.patcher';

export type StringGetter = () => string | null | undefined;
export type VarGetter = string | StringGetter | null | undefined;
export class ClientLibPatchGetter<Pi> implements ClientPatch {
    varName: VarGetter;
    targetFunctionName: keyof Pi;

    constructor(targetFunctionName: keyof Pi, varName: VarGetter) {
        this.targetFunctionName = targetFunctionName;
        this.varName = varName;
    }

    isPatched(k: any): boolean {
        return k != null && typeof k[this.targetFunctionName] !== 'undefined';
    }

    apply(target: Function): boolean {
        // Make sure the property does not already exist
        if (typeof target.prototype[this.targetFunctionName] !== 'undefined') {
            return true;
        }

        const varName = typeof this.varName == 'function' ? this.varName() : this.varName;
        if (varName == null) {
            return false;
        }
        Object.defineProperty(target.prototype, this.targetFunctionName, {
            configurable: true,
            get: function() {
                return this[varName];
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
