import { ClientPatch } from './client.patcher';

/**
 * Replace a function on a prototype with a new function
 *
 * stores a backup inside the `backupFunctionName` so it can be revered
 */
export class ClientLibPatchFunction<T> implements ClientPatch {
    sourceFunctionName: keyof T;
    targetFunction: Function;
    oldFunction: Function | null;

    constructor(sourceFunctionName: keyof T, targetFunction: Function) {
        this.sourceFunctionName = sourceFunctionName;
        this.targetFunction = targetFunction;
    }

    get backupFunctionName() {
        return `__st__${this.sourceFunctionName}`;
    }

    isPatched(): boolean {
        return false;
    }

    apply(baseObject: Function): boolean {
        if (typeof baseObject.prototype[this.backupFunctionName] != 'undefined') {
            return false;
        }
        baseObject.prototype[this.backupFunctionName] = baseObject.prototype[this.sourceFunctionName];
        this.oldFunction = baseObject.prototype[this.backupFunctionName];
        baseObject.prototype[this.sourceFunctionName] = this.targetFunction;
        return true;
    }

    remove(baseObject: Function) {
        if (typeof baseObject.prototype[this.backupFunctionName] == 'undefined') {
            return false;
        }
        baseObject.prototype[this.sourceFunctionName] = this.oldFunction;
        delete baseObject.prototype[this.backupFunctionName];
        delete this.oldFunction;
        return true;
    }
}
