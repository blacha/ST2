import {CNCClient} from "../cnc/cnc";
import {Log} from "../../lib/log/log";
import {ParseCLIUtil} from "../db/parse";
import {ParseObject} from "../../cloud/objects/parse.object";

const VERIFY_URL = 'https://chard.nz/st2/#/verify'
function makeVerificationMessage(verifyUUID) {
    return `
    Welcome to ST2

    To complete the player verification process please click this link:

    [url]${VERIFY_URL}/${verifyUUID}[/url]
    `;
}


export class VerifyTask {
    static getName() {
        return 'Verify';
    }

    static run(client:CNCClient, $log:Log) {
        var log = $log.child({task: 'Verify', world: client.getWorld()});
        log.info('Start ' + VerifyTask.getName());

        return ParseCLIUtil.getAll('Verify', {
            world: client.getWorld()
        }, log)
            .then(VerifyTask.filterVerify.bind(VerifyTask, log))
            .then(VerifyTask.sendAllMessages.bind(VerifyTask, log, client))
            .then(function () {
                // done.
            })
    }

    static filterVerify($log:Log, toVerify) {
        var toRun = toVerify.filter((verify) => {
            return verify.get('sent') == null;
        });

        if (toRun.length > 0) {
            $log.info({
                messages: toRun.map(function (verify) {
                    return verify.get('player');
                })
            }, 'sending messages to users');
        }

        return toRun;
    }

    static sendAllMessages($log:Log, client:CNCClient, toVerify) {

        return toVerify.reduce((prevVerfiy, verify) => {
            prevVerfiy.then(() => {
                return VerifyTask.sendVerificationMessage($log, client, verify);
            }).then(() => {
                verify.set('sent', new Date());
                return verify.save();
            }).then(function () {
                $log.info({
                    player: verify.get('player')
                }, 'VerifyDone');
            })
        }, Promise.resolve());

    }

    static sendVerificationMessage($log:Log, client:CNCClient, verify) {
        return client.sendMail(verify.get('player'), 'Welcome to ST2', makeVerificationMessage(verify.get('uuid')), $log).then(function () {
            return verify;
        });
    }
};