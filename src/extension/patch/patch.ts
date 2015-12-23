import {Log} from '../../lib/log/log';

import {PATCH_DATA} from './patch.data';

export class ClientLibPatcher {

    static getFromKey(keys:string[], current = window) {
        var currentKey = keys.shift();
        if (keys.length > 0) {
            var newKey = current[currentKey];
            if (newKey == null) {
            }
            return ClientLibPatcher.getFromKey(keys, newKey);
        }

        return current[currentKey];
    }

    static patch() {
        var logger = Log.child({module: 'patch'});

        function makeReturn(str) {
            return function () {
                return this[str];
            };
        }

        var functionNames = Object.keys(PATCH_DATA);
        for (var i = 0; i < functionNames.length; i++) {
            var key = functionNames[i];
            var patch = PATCH_DATA[key];
            var protoPath = key.split('.');
            var funcName = protoPath.pop();

            logger.trace({func: funcName}, 'Patching');

            var currentProto = ClientLibPatcher.getFromKey(protoPath);
            if (currentProto == null) {
                logger.error({
                    func: funcName,
                    proto: protoPath.join('.')
                }, 'Invalid prototype path');
                continue;
            }

            var currentData = ClientLibPatcher.getFromKey(patch.data.split('.'));
            if (currentData == null) {
                logger.error({func: funcName, data: patch.data}, 'Invalid data path');
                continue;
            }

            var matches = currentData.toString().match(patch.re);
            if (!matches) {
                logger.error({func: funcName}, 'Unable to map');
                continue;
            }

            logger.debug({func: patch.func, match: matches[1]}, 'patching..');
            currentProto.prototype[funcName] = makeReturn(matches[1]);

        }
    }
}
