import * as Util from '../util';
import {Constants} from '../constants';
import {GameDataJSON,GameDataRepair} from './gamedata';
import {GameDataResource} from "./gamedata";

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
        return 0;
        //return Util.getSingleGrowthValue(this.data.health, level,
        //    Constants.HEALTH_GROWTH);
    }

    getPlunder(level:number):GameDataRepair {
        return Util.getRepairValue(this.data, level);
    }

    getUpgradeCost(level:number):GameDataResource {
        return Util.getUpgradeCost(this.data, level);
    }

    getTotalUpgradeCost(level:number):GameDataResource {
        return Util.getTotalUpgradeCost(this.data, level);
    }
}