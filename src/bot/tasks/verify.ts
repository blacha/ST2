import {CNCClient} from "../cnc/cnc";
import {Log} from "../../lib/log/log";
import {ParseCLIUtil} from "../db/parse";
import {ParseObject} from "../../cloud/objects/parse.object";
import {promiseSeries} from "../../extension/util/promise";

const VERIFY_URL = 'https://chard.nz/st2/#/verify'
function makeVerificationMessage(verifyUUID) {
    return `
    Welcome to ST2

    To complete the player verification process please click this link:

    [url]${VERIFY_URL}/${verifyUUID}[/url]
    `;
}


export class VerifyTask {
    private client;

    constructor(cnc:CNCClient) {
        this.client = cnc;
    }

    run($log:Log) {
        var log = $log.child({task: 'Verify', world: this.client.getWorld()});

        return ParseCLIUtil.getAll('Verify', {world: this.client.getWorld()}, log)
            .then(this.filterVerify.bind(this, log))
            .then(this.sendAllMessages.bind(this, log))
        .then(function() {
            // done.
        })
    }

    filterVerify($log, toVerify) {
        var toRun = toVerify.filter((verify) => {
            return verify.get('sent') == null;
        });

        $log.info({ messages: toRun.map(function(verify) {
            return verify.get('player');
        })}, 'sending messages to users');

        return toRun;
    }

    sendAllMessages($log, toVerify) {
        var sendMessage = (verify) => {
            return this.sendVerificationMessage($log, verify).then(() => {
                verify.set('sent', new Date());
                return verify.save();
            }).then(function() {
                $log.info({
                    player: verify.get('player')
                }, 'VerifyDone');
            })
        };

        return promiseSeries(toVerify, sendMessage);
    }

    sendVerificationMessage($log, verify) {
        return this.client.sendMail(verify.get('player'), 'Welcome to ST2', makeVerificationMessage(verify.get('uuid')), $log).then(function(){
            return verify;
        });
    }
};