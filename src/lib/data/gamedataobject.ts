import * as Util from '../util';
import {Constants} from '../constants';
import {GameDataJSON} from './gamedata';

export class GameDataObject {
    public data:GameDataJSON;
    private className:string;
    private codeName:string; // cncopt code

    constructor(private id:number) {
    }


    getClassName() {
        return this.className;
    }

    getID() {
        return this.id;
    }

    getGameData():GameDataJSON {
        return this.data;
    }

    setGameData(data:GameDataJSON) {
        this.data = data;
        this.className = this.data.display.toLowerCase().replace(/ /g, '-');
    }

    getHealth(level:number) {
        return Util.getSingleGrowthValue(this.data.health, level,
            Constants.HEALTH_GROWTH);
    }

    getPlunder(level:number) {
        return Util.getGrowthValue(this.data.repair, level,
            Constants.RESOURCE_PLUNDER_GROWTH);
    }

    getCost(level:number) {
        return Util.getGrowthValue(this.data.resources, level,
            Constants.RESOURCE_COST_GROWTH);
    }
}