import {PlayerInfo} from './city/player.info';

declare var ClientLib;
if (typeof ClientLib !== 'undefined') {
    console.log(JSON.stringify(PlayerInfo.get(), null, 4));
}
