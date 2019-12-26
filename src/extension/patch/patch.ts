/* eslint-disable @typescript-eslint/camelcase */
import { PatchData, PatchObject } from './patch.data';
import { NpcCampType } from '../@types/client.lib.const';
import { ClientLibCityUnit } from '../@types/client.lib';
import { ClientLibMap } from '../@types/client.lib.util';

export interface PatchedId {
    $Id: number;
}
export interface PatchedWorldObjectCity extends PatchedId {
    $AllianceId: number;
    $PlayerId: number;
}

export interface PatchedCampType {
    $CampType: NpcCampType;
}
export interface PatchedCityUnits {
    $OffenseUnits: ClientLibMap<ClientLibCityUnit>;
    $DefenseUnits: ClientLibMap<ClientLibCityUnit>;
}

export class ClientLibPatcher {
    static hasPatchedCityUnits(obj: any): obj is PatchedCityUnits {
        return obj != null && typeof obj['$OffenseUnits'] == 'function';
    }
    static hasPatchedCampType(obj: any): obj is PatchedCampType {
        return obj != null && typeof obj['$CampType'] == 'function';
    }
    static hasPatchedId(obj: any): obj is PatchedId {
        return obj != null && typeof obj['$Id'] == 'function';
    }
    static hasPatchedAllianceId(obj: any): obj is PatchedWorldObjectCity {
        return obj != null && typeof obj['$AllianceId'] == 'function';
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

    static patchKey(patch: PatchObject, baseObject = window) {
        const protoPath = patch.target.split('.');
        const funcName = protoPath.pop();
        if (funcName == null) {
            return;
        }

        const currentProto = ClientLibPatcher.getFromKey(protoPath, baseObject);
        if (currentProto == null) {
            // logger.error({
            //     func: funcName,
            //         proto: protoPath.join('.')
            // }, 'Invalid prototype path');
            return;
        }

        const currentData = ClientLibPatcher.getFromKey(patch.source.split('.'), baseObject);
        if (currentData == null) {
            // logger.error({ func: funcName, data: patch.data }, 'Invalid data path');
            return;
        }

        const matches = currentData.toString().match(patch.re);
        if (!matches) {
            // logger.error({ func: funcName }, 'Unable to map');
            return;
        }

        console.log('DefineProperty', currentProto, funcName, matches[1]);
        Object.defineProperty(currentProto.prototype, funcName, {
            get: function() {
                return this[matches[1]];
            },
        });

        // logger.debug({ func: funcName, match: matches[1] }, `patching.. ${funcName} to ${matches[1]}`);
        // currentProto.prototype[funcName] = makeReturn(matches[1]);
    }

    static patch(baseObject = window) {
        for (const patch of PatchData) {
            ClientLibPatcher.patchKey(patch, baseObject);
        }
    }
}
