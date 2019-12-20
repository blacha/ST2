/* eslint-disable @typescript-eslint/camelcase */
import { PATCH_DATA } from './patch.data';
import { NpcCampType } from '../@types/client.lib.const';
import { ClientLibMap, ClientLibCityUnit } from '../@types/client.lib';

export interface PatchedId {
    $get_Id(): number;
}
export interface PatchedWorldObjectCity extends PatchedId {
    $get_AllianceId(): number;
}

export interface PatchedCampType {
    $get_CampType(): NpcCampType;
}
export interface PatchedCityUnits {
    $get_OffenseUnits(): ClientLibMap<ClientLibCityUnit>;
    $get_DefenseUnits(): ClientLibMap<ClientLibCityUnit>;
}

interface PatchData {
    data: string;
    re: RegExp;
}

// eslint:disable @typescript-eslint/no-use-before-define
function makeReturn(str: string): any {
    return function() {
        // @ts-ignore
        return this[str];
    };
}

export class ClientLibPatcher {
    static hasPatchedCityUnits(obj: any): obj is PatchedCityUnits {
        return obj != null && typeof obj['$get_OffenseUnits'] == 'function';
    }
    static hasPatchedCampType(obj: any): obj is PatchedCampType {
        return obj != null && typeof obj['$get_CampType'] == 'function';
    }
    static hasPatchedId(obj: any): obj is PatchedId {
        return obj != null && typeof obj['$get_Id'] == 'function';
    }
    static hasPatchedAllianceId(obj: any): obj is PatchedWorldObjectCity {
        return obj != null && typeof obj['$get_AllianceId'] == 'function';
    }

    static getFromKey(keys: string[], current: any = window): any {
        const currentKey = keys.shift();
        if (currentKey == null) {
            return current;
        }
        if (keys.length > 0) {
            const newKey = current[currentKey];
            if (newKey == null) {
            }
            return ClientLibPatcher.getFromKey(keys, newKey);
        }

        return current[currentKey];
    }

    static patchKey(key: string, patch: PatchData) {
        const protoPath = key.split('.');
        const funcName = protoPath.pop();
        if (funcName == null) {
            return;
        }

        const currentProto = ClientLibPatcher.getFromKey(protoPath);
        if (currentProto == null) {
            // logger.error({
            //     func: funcName,
            //         proto: protoPath.join('.')
            // }, 'Invalid prototype path');
            return;
        }

        const currentData = ClientLibPatcher.getFromKey(patch.data.split('.'));
        if (currentData == null) {
            // logger.error({ func: funcName, data: patch.data }, 'Invalid data path');
            return;
        }

        const matches = currentData.toString().match(patch.re);
        if (!matches) {
            // logger.error({ func: funcName }, 'Unable to map');
            return;
        }

        console.log('Patching', funcName, matches[1]);
        // logger.debug({ func: funcName, match: matches[1] }, `patching.. ${funcName} to ${matches[1]}`);
        currentProto.prototype[funcName] = makeReturn(matches[1]);
    }

    static patch() {
        for (const [key, patch] of Object.entries(PATCH_DATA)) {
            ClientLibPatcher.patchKey(key, patch);
        }
    }
}
