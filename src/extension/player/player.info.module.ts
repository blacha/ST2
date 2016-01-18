import {PlayerInfo} from './player.info';
import {Log} from '../../lib/log/log';

import {ParseUtil} from '../util/parse';

export class PlayerInfoModule {
    static INTERVAL_TIME = 30000;
    static $interval;
    static log:Log;

    static start() {
        PlayerInfoModule.log = Log.child({module: 'PlayerInfo'});
        PlayerInfoModule.log.info('Starting...');

        PlayerInfoModule.$interval = setInterval(PlayerInfoModule.run, PlayerInfoModule.INTERVAL_TIME);
        PlayerInfoModule.run();
    }

    static stop() {
        if (PlayerInfoModule.$interval) {
            clearInterval(PlayerInfoModule.$interval);
        }

        PlayerInfoModule.$interval = null;
    }

    static getInstance() {
        return PlayerInfo;
    }

    static run(force = false) {
        if (PlayerInfoModule.log == null) {
            PlayerInfoModule.start();
        }

        var data = PlayerInfo.scan();
        if (data.changes == false && force === false) {
            PlayerInfoModule.log.debug('No changes');
            return;
        }

        PlayerInfoModule.log.debug('Changes Found');
        ParseUtil.send('player_info', data.data, PlayerInfoModule.log).then(function (resp) {
        }, function (err) {
            PlayerInfoModule.log.error({error: err}, 'Error updating player');
        })
    }
}
