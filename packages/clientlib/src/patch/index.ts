import { ClientLibMap } from '../types/clientlib/util';
import { ClientLibCityUnit } from '../types/clientlib/main.data/cities';
import { NpcCampType } from '../types/clientlib/main.data';
import { PatchObject, PatchData } from './patches';
import { ClientLibStatic } from '../types/clientlib';

/* eslint-disable @typescript-eslint/camelcase */
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
        return obj != null && typeof obj['$OffenseUnits'] !== 'undefined';
    }

    static hasPatchedCampType(obj: any): obj is PatchedCampType {
        return obj != null && typeof obj['$CampType'] !== 'undefined';
    }

    static hasPatchedId(obj: any): obj is PatchedId {
        return obj != null && typeof obj['$Id'] !== 'undefined';
    }

    static hasPatchedAllianceId(obj: any): obj is PatchedWorldObjectCity {
        return obj != null && typeof obj['$AllianceId'] !== 'undefined';
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

    /**
     * Patch a client lib function
     */
    static patchKey(patch: PatchObject, baseObject: ClientLibStatic): boolean {
        const protoPath = patch.target.split('.');
        const funcName = protoPath.pop();
        if (funcName == null) {
            return false;
        }

        const currentProto = ClientLibPatcher.getFromKey(protoPath, baseObject);
        if (currentProto == null) {
            return false;
        }

        const currentData = ClientLibPatcher.getFromKey(patch.source.split('.'), baseObject);
        if (currentData == null) {
            return false;
        }

        const matches = currentData.toString().match(patch.re);
        if (!matches) {
            return false;
        }

        // Make sure the property does not already exist
        if (typeof currentProto.prototype[funcName] !== 'undefined') {
            return true;
        }
        Object.defineProperty(currentProto.prototype, funcName, {
            configurable: true,
            get: function() {
                return this[matches[1]];
            },
        });
        return true;
    }

    static patch(baseObject: ClientLibStatic) {
        for (const patch of PatchData) {
            ClientLibPatcher.patchKey(patch, baseObject);
        }
    }
}
