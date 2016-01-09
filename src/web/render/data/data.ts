import {ParseJSONWorldObject} from "../../../lib/objects/world";
import {ParseUtil} from "../../../extension/util/parse";
import {ParseWebUtil} from "../parse";
import {ParseJSONAllianceObject} from "../../../lib/objects/alliance";
import {ParseJSONPlayerObject} from "../../../lib/objects/player";

var INSTANCE:AllianceData = null;

export class AllianceData {

    private worlds:{[key: string] : ParseJSONWorldObject};
    private alliances:{[key: string]: { date: number, alliances: ParseJSONAllianceObject[]}};
    private players:{[key: string]: { date: number, players: ParseJSONPlayerObject[]}};

    constructor() {
        this.reset();
    }

    getWorld(worldID:number, $log):_mithril.MithrilPromise<ParseJSONWorldObject> {
        if (this.worlds[worldID]) {
            console.log('world-cache', worldID);
            var defer = m.deferred();
            defer.resolve(this.worlds[worldID]);
            return defer.promise;
        }

        return ParseWebUtil.query('World', {world: worldID}, $log).then((data) => {
            if (data.results.length === 1){
                this.worlds[worldID] = data.results[0];
            }
            return data.results[0];
        });
    }

    getAlliances(worldID:number, $log):_mithril.MithrilPromise<ParseJSONAllianceObject[]> {
        var allianceCache = this.alliances[worldID];
        if (allianceCache != null && allianceCache.date + 30 * 1000 > +new Date()){
            console.log('alliance-cache', allianceCache);
            var defer = m.deferred();
            defer.resolve(allianceCache.alliances);
            return defer.promise;
        }

        return ParseWebUtil.query('Alliance', {world: worldID}, $log).then((data) => {
            this.alliances[worldID] = {
                alliances: data.results,
                date: +new Date()
            };
            return data.results;
        });
    }

    getPlayers(worldID:number, $log):_mithril.MithrilPromise<ParseJSONPlayerObject[]> {
        var playerCache = this.players[worldID];
        if (playerCache != null && playerCache.date + 30 * 1000 > +new Date()){
            console.log('player-cache', playerCache);
            var defer = m.deferred();
            defer.resolve(playerCache.players);
            return defer.promise;
        }

        return ParseWebUtil.query('Player', {world: worldID}, $log).then((data) => {
            this.players[worldID] = {
                players: data.results,
                date: +new Date()
            };
            return data.results;
        });
    }

    static getInstance():AllianceData {
        if (INSTANCE == null) {
            INSTANCE = new AllianceData();
        }
        return INSTANCE;
    }

    reset() {
        this.worlds = {};
        this.alliances = {};
        this.players = {};
    }
}