import {CommandInfoData} from "../../../api/player.info";
import {Faction} from "../../../lib/data/faction";
import {PlayerRepairInfo} from "../../../api/player.info";

import * as Format from '../format';

export function formatCP(commandPoints:CommandInfoData) {
    return Math.floor(commandPoints.current) + '/' + commandPoints.max;
}

export function formatFaction(faction:number) {
    return Faction.fromID(faction).getCode();
}

export function formatRepair(repair:PlayerRepairInfo):any {
    return Math.floor(repair.time / 36) / 100;
}

export function formatTimeAgo(dateString:string) {
    var currentTime = +new Date();
    var oldTime = +new Date(dateString);
    return Format.formatTime((currentTime - oldTime) / 1000, 0);
}