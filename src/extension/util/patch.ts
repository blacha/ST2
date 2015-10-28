import {Log} from '../../lib/log/log';

interface ClientPatch {
    name: string;
    str: string;
    func: string;
    re: RegExp;
    proto: Object;
    applied?: boolean;
}

export class PatchUtil {
    static PATCHES:{[key:string] : ClientPatch} = {};

    static addPatch(patch:ClientPatch) {
        PatchUtil.PATCHES[patch.name] = patch;
    }


    static patch(name:string, log:Log) {
        var logger = log.child({action: 'patch', patch: name});

        var patch = PatchUtil.PATCHES[name];

        if (patch == null) {
            return logger.error('No patch found');
        }

        if (patch.applied) {
            return;
        }

        function makeReturn(str) {
            return function () {
                return this[str];
            };
        }



        var matches = patch.str.match(patch.re);
        if (!matches) {
            logger.error('Unable to map "' + patch.func + '"');
        }

        logger.info({func: patch.func, match: matches[1]}, 'patching..');

        patch.proto[patch.func] = makeReturn(matches[1]);
        patch.applied = true;
    }

}
