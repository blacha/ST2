import { ClientPatch, StringFunc } from './client.patcher';

export class ClientLibPatchFunction implements ClientPatch {
    oldFunction: Function | null;
    newFunction: Function;
    path: string;
    sourceFunctionName: any;
    targetFunction: Function;

    constructor(sourceFunctionName: string | StringFunc, targetFunction: Function) {
        this.sourceFunctionName = sourceFunctionName;
        this.targetFunction = targetFunction;
    }

    isPatched(): boolean {
        return false;
    }

    apply(): boolean {
        // TODO
        return false;
    }
    remove() {
        return false;
    }
}

// const PatchedWorldObjectNpcCampId = new ClientLibPatcher<{$Id: string}> {
//     'ClientLib.Data.WorldSector.WorldObjectNPCCamp'
// }
