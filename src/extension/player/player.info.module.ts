import {PlayerInfo} from './player.info';
import {Log} from '../../lib/log/log';

import {ParseUtil} from '../util/parse';
import {PatchUtil} from '../util/patch';

export class PlayerInfoModule {
    static INTERVAL_TIME = 5000;
    static $interval;
    static log:Log;

    static start() {
        PlayerInfoModule.log = Log.child({module: 'PlayerInfo'});
        PlayerInfoModule.log.info('Starting...');

        PlayerInfoModule.$interval = setInterval(PlayerInfoModule.run, PlayerInfoModule.INTERVAL_TIME);
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

    static run() {
        if (PlayerInfoModule.log == null) {
            PlayerInfoModule.start();
        }

        var data = PlayerInfo.scan();
        if (data.changes == false) {
            PlayerInfoModule.log.debug('No changes');
            return;
        }

        PlayerInfoModule.log.debug('Changes Found');
        ParseUtil.send('player_info', data.data, PlayerInfoModule.log).then(function (resp) {
            console.log('response', resp);
        }, function (err) {
            console.log('err', err);
        })
    }

    static patch() {
        PatchUtil.addPatch({
            name: 'ClientLib.Data.CityUnits.get_DefenseUnits',
            str: ClientLib.Data.CityUnits.prototype.HasUnitMdbId.toString(),
            proto: ClientLib.Data.CityUnits.prototype,
            re: /for \(var c in \{d:this\.(.{6})/,
            func: 'get_DefenseUnits'
        });

        PatchUtil.addPatch({
            name: 'ClientLib.Data.CityUnits.get_OffenseUnits',
            str: ClientLib.Data.CityUnits.prototype.HasUnitMdbId.toString(),
            proto: ClientLib.Data.CityUnits.prototype,
            re: /for \(var b in \{d:this\.(.{6})/,
            func: 'get_OffenseUnits'
        });
    }

}