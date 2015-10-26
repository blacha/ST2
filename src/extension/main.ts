import {PlayerInfoModule} from './player/player.info.module';
import {CityData} from './city/city.data';

export {Log} from './log/log';

export var modules = [PlayerInfoModule];

export var PlayerInfo = PlayerInfoModule.get();