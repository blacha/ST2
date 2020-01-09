import { ClientPatch, StringFunc } from './client.patcher';

export class ClientLibPatchFunction implements ClientPatch {
    path: string;
    sourceFunctionName: any;
    targetFunction: Function;
    oldFunction: Function | null;

    constructor(sourceFunctionName: string | StringFunc, targetFunction: Function) {
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
        baseObject.prototype[this.sourceFunctionName] = baseObject.prototype[this.backupFunctionName];
        delete baseObject.prototype[this.backupFunctionName];
        delete this.oldFunction;
        return true;
    }
}
