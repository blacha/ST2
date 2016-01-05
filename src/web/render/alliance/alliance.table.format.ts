import {CommandInfoData} from "../../../api/player.info";
import {Faction} from "../../../lib/data/faction";
import {PlayerRepairInfo} from "../../../api/player.info";

import * as Format from '../format';

export function formatCP(commandPoints:CommandInfoData) {
    var current = Math.floor(commandPoints.current);
    return m('span', {
        title: `${current}/${commandPoints.max} `
    }, current);
}

export function formatFaction(faction:number) {
    return m(`i.Faction.Faction-${Faction.fromID(faction).getName()}`);
}

export function formatRepair(repair:PlayerRepairInfo):any {
    return Math.floor(repair.time / 36) / 100;
}

export function formatTimeAgo(dateString:string) {
    var currentTime = +new Date();
    var oldTime = +new Date(dateString);
    return Format.formatTime((currentTime - oldTime) / 1000, 0);
}