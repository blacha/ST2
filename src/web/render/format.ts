import {ParseJSONPlayerObject} from "../../lib/objects/player";
import {Faction} from "../../lib/data/faction";
import {OUnitType} from "../../lib/unit/ounittype";
import {DUnitType} from "../../lib/unit/dunittype";
import {GameResources} from "../../lib/game.resources";

var Formats = ['', 'K', 'M', 'G', 'T'];

export function formatNumber(num:number):string {
    var current = 0;
    while (num >= 1000 && current < Formats.length) {
        current++;
        num /= 1000;
    }

    return num.toFixed(2) + Formats[current];
}

export function formatTotalResources(resources:GameResources) {
    return m('span', {
        title: `T: ${formatNumber(resources.tiberium)} C: ${formatNumber(resources.crystal)} P: ${formatNumber(resources.power)}`
    }, formatNumber(resources.total()));
}

export function formatPercent(x:number) {
    return x + '%';
}

export function formatHours(seconds:number) {
    var hours = (seconds / 60 / 60);
    return (hours / 24).toFixed(2);
}


export function formatResearch(research:{[key:string] : number}, player:ParseJSONPlayerObject) {
    var data = countResearch(player);

    return m('span.AlliancePlayer-Upgrade', {
        title: 'Number of researched upgrades Off/Def'
    }, [
        m('span.PlayerUpgrade-Off', `${data.offense}o`),
        m('span.PlayerUpgrade-Def', `${data.defense}d`),
    ]);
}

export function countResearch(player:ParseJSONPlayerObject) {
    let oUpgrade = 0;
    let dUpgrade = 0;
    Object.keys(player.research).forEach(function (key) {
        let value = player.research[key];
        if (OUnitType.ID_MAP[key]) {
            oUpgrade += value;
        } else if (DUnitType.ID_MAP[key]) {
            dUpgrade += value;
        }
    });
    return {
        offense: oUpgrade,
        defense: dUpgrade
    }
}

export function sumResearch(player:ParseJSONPlayerObject) {
    let data = countResearch(player);
    return data.offense + data.defense;
}

export function formatTime(seconds:number, decimals = 2) {
    var interval = getTimeInterval(seconds);
    if (interval.amount < 2) {
        return `${interval.amount.toFixed(decimals)} ${interval.interval}`;
    }
    return `${interval.amount.toFixed(decimals)} ${interval.interval}s`;
}

function getTimeInterval(seconds:number) {
    var interval = seconds / 31536000;
    if (interval >= 1) {
        return {amount: interval, interval: 'year'};
    }

    interval = seconds / 2592000;
    if (interval >= 1) {
        return {amount: interval, interval: 'month'};
    }

    interval = seconds / 86400;
    if (interval >= 1) {
        return {amount: interval, interval: 'day'};
    }

    interval = seconds / 3600;
    if (interval >= 1) {
        return {amount: interval, interval: 'hour'};
    }

    interval = seconds / 60;
    if (interval >= 1) {
        return {amount: interval, interval: 'minute'};
    }

    return {amount: seconds, interval: 'second'}
}