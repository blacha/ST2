
import { PATCH_DATA } from './patch.data';

export interface PatchedId {
    $get_Id(): number;
}

export interface PatchedCampType {
    $get_CampType(): ClientLibNpcCampType
}
export interface PatchedCityUnits {
    $get_OffenseUnits(): ClientLibMap<ClientLibCityUnit>;
    $get_DefenseUnits(): ClientLibMap<ClientLibCityUnit>;
}

export class ClientLibPatcher {
    static hasPatchedCityUnits(obj: any): obj is PatchedCityUnits {
        return obj != null && typeof obj['$get_OffenseUnits'] == 'function'
    }
    static hasPatchedCampType(obj: any): obj is PatchedCampType {
        return obj != null && typeof obj['$get_CampType'] == 'function'
    }
    static hasPatchedId(obj: any): obj is PatchedId {
        return obj != null && typeof obj['$get_Id'] == 'function'
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

    static patch() {
        for (const [key, patch] of Object.entries(PATCH_DATA)) {
            var protoPath = key.split('.');
            var funcName = protoPath.pop();
            if (funcName == null) {
                continue;
            }


            var currentProto = ClientLibPatcher.getFromKey(protoPath);
            if (currentProto == null) {
                // logger.error({
                //     func: funcName,
                //         proto: protoPath.join('.')
                // }, 'Invalid prototype path');
                continue;
            }

            var currentData = ClientLibPatcher.getFromKey(patch.data.split('.'));
            if (currentData == null) {
                // logger.error({ func: funcName, data: patch.data }, 'Invalid data path');
                continue;
            }

            var matches = currentData.toString().match(patch.re);
            if (!matches) {
                // logger.error({ func: funcName }, 'Unable to map');
                continue;
            }

            // logger.debug({ func: funcName, match: matches[1] }, `patching.. ${funcName} to ${matches[1]}`);
            currentProto.prototype[funcName] = makeReturn(matches[1]);
        }
    }
}


function makeReturn(str: string): any {
    return function() {
        // @ts-ignore
        return this[str];
    };
}
