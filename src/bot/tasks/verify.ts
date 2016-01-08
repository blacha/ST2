import {CNCClient} from "../cnc/cnc";
import {Log} from "../../lib/log/log";
import {ParseCLIUtil} from "../db/parse";

const VERIFY_URL = 'https://chard.nz/st2/#/verify'
function makeVerificationMessage(verifyUUID) {
    return `
    Welcome to ST2

    To complete the player verification process please click this link:

    [url]${VERIFY_URL}/${verifyUUID}[/url]
    `
}

export class VerifyTask {
    private world;
    private cnc;

    constructor(world:number, cnc:CNCClient) {
        this.world = world;
        this.cnc = cnc;
    }

    run($log:Log) {
        var log = $log.child({task: 'Verify', world: this.world});

        ParseCLIUtil.getAll('Verify', log).then(function(toVerify) {
            log.info('got-data', toVerify);
        })
    }

    sendVerificationMessage(verify, $log) {
        return this.cnc.sendMail(verify.get('username'), 'Welcome to ST2', makeVerificationMessage(verify.get('uuid')), $log);
    }

};