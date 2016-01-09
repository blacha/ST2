import {CNCClient} from "../cnc/cnc";
import {Log} from "../../lib/log/log";
import {ParseCLIUtil} from "../db/parse";
import {promiseSeries} from "../../extension/util/promise";
import {AlliancePlayerInfoData} from "../../api/player.info";
export class AllianceDataTask {

    private client:CNCClient;

    constructor(cnc:CNCClient) {
        this.client = cnc;
    }

    run($log:Log) {
        var log = $log.child({task: 'Alliance', world: this.client.getWorld()});

        return ParseCLIUtil.getAll('Alliance', {world: this.client.getWorld()}, log)
            .then(this.filterAlliance.bind(this, log))
            .then(this.getAllData.bind(this, log))
            .then(function() {
                // done.
            })
    }

    filterAlliance($log:Log, alliances) {
        return alliances.filter(function(alliance) {
            return alliance.get('alliance') > -1;
        });
    }

    getAllData($log:Log, alliances) {
        return promiseSeries(alliances, this.getAllianceData.bind(this, $log));
    }

    getAllianceData($log, alliance) {
        var allianceId = alliance.get('alliance');

        return this.client.getAllianceInfo(allianceId, $log).then(function(data:AllianceData) {
            var allianceData = data.m.map(function(playerData:AlliancePlayerData):AlliancePlayerInfoData {
                return {
                    name: playerData.n,
                    rank: playerData.r,
                    score: playerData.p
                }
            });

            //return ParseCLIUtil.run('alliance_members', {
            //    alliance: allianceId,
            //    members: allianceData
            //}, $log);
        });
    }
}

interface AllianceData {
    a: string;
    m: AlliancePlayerData[]
}

interface AlliancePlayerData {
    c: number;
    f: number;
    i: number;
    n: string;
    p: number;
    r: number;
}



var AllianceData = { a: 'ANVIL',
    bd: 2852,
    bde: 1498,
    bdp: 1354,
    d: 'ru CiC: [player]exie82[/player]\nen CiC: [player]bloody1nine1[/player]\n\nOur song [url]https://youtu.be/lDQ7hXMLxGc[/url]',
    egwr: 0,
    egws: 0,
    f: '',
    fac: 2,
    fd: 0,
    i: 524,
    ii: false,
    m:
        [ { c: 6, f: 2, i: 1289, n: '89206666636', p: 1340918, r: 348 },
            { c: 5, f: 2, i: 260, n: 'H0RD', p: 1648672, r: 264 },
            { c: 6, f: 2, i: 70, n: 'varennik_a', p: 1455446, r: 307 },
            { c: 6, f: 2, i: 1027, n: 'rsg1970', p: 1294251, r: 369 },
            { c: 6, f: 2, i: 1220, n: 'patriot1578', p: 1808493, r: 230 },
            { c: 6, f: 2, i: 1585, n: 'Fariz670', p: 1797850, r: 232 },
            { c: 6, f: 2, i: 521, n: 'kaDrFox', p: 2578022, r: 133 },
            { c: 6, f: 1, i: 1680, n: 'gnom6661', p: 1976884, r: 209 },
            { c: 4, f: 1, i: 825, n: 'Tualatin_Duo', p: 627895, r: 713 },
            { c: 6, f: 2, i: 766, n: 'Kornishon66', p: 1600845, r: 271 },
            { c: 6, f: 2, i: 2412, n: 'sery33', p: 1660193, r: 260 },
            { c: 6, f: 1, i: 24, n: 'Owchi13', p: 1942054, r: 214 },
            { c: 6, f: 2, i: 1266, n: 'Igor8222', p: 1252408, r: 389 },
            { c: 6, f: 1, i: 1172, n: 'ZoryanV', p: 1470275, r: 302 },
            { c: 6, f: 2, i: 1226, n: 'Asgard_nsk', p: 1187416, r: 423 },
            { c: 5, f: 2, i: 750, n: 'KycoK-3MEA', p: 1088730, r: 479 },
            { c: 5, f: 2, i: 411, n: 'exie82', p: 778959, r: 625 },
            { c: 6, f: 2, i: 2853, n: 'TAHKU_M9ICO_', p: 1196070, r: 418 },
            { c: 5, f: 2, i: 713, n: 'uncle_SU', p: 1187176, r: 424 },
            { c: 5, f: 2, i: 212, n: '3EBC', p: 1131301, r: 452 },
            { c: 5, f: 2, i: 1471, n: 'ZORRO_CB', p: 743869, r: 651 },
            { c: 6, f: 1, i: 1725, n: 'BlitzwingGL', p: 1151772, r: 443 },
            { c: 6, f: 2, i: 1830, n: 'minouche1973', p: 1394958, r: 322 },
            { c: 6, f: 1, i: 1772, n: 'Skah04', p: 2305252, r: 168 },
            { c: 6, f: 2, i: 251, n: 'HintoA', p: 1418988, r: 315 },
            { c: 7, f: 2, i: 30, n: 'battleSiR', p: 3076979, r: 83 },
            { c: 7, f: 2, i: 752, n: 'lvivjanyn1', p: 2968023, r: 93 },
            { c: 6, f: 2, i: 1455, n: 'Var_lam88', p: 1839450, r: 223 },
            { c: 7, f: 2, i: 203, n: 'lordleonardo79', p: 2607561, r: 128 },
            { c: 7, f: 1, i: 333, n: 'Roman-5788', p: 2777898, r: 110 },
            { c: 7, f: 2, i: 1244, n: '00Sniper0', p: 2467724, r: 145 },
            { c: 6, f: 2, i: 8, n: 'The_Putin_V_V_', p: 2435422, r: 148 },
            { c: 7, f: 2, i: 914, n: 'bloody1nine1', p: 2926093, r: 95 },
            { c: 6, f: 1, i: 1505, n: 'FranHtein', p: 1356184, r: 340 } ],
    mc: 34,
    ms: 58494031,
    ms4: 58494031,
    n: '-Anvil-',
    nb: 202,
    opois:
        [ { i: 3929, l: 19, t: 8, x: 128, y: 169 },
            { i: 3430, l: 30, t: 6, x: 174, y: 211 },
            { i: 3439, l: 31, t: 8, x: 210, y: 178 },
            { i: 3438, l: 32, t: 7, x: 210, y: 188 },
            { i: 3311, l: 33, t: 6, x: 428, y: 264 },
            { i: 3252, l: 34, t: 3, x: 205, y: 217 },
            { i: 3171, l: 35, t: 6, x: 420, y: 272 },
            { i: 3160, l: 35, t: 2, x: 417, y: 261 },
            { i: 3170, l: 36, t: 5, x: 411, y: 302 } ],
    poi: 9,
    r: 7,
    rpois:
        [ { ns: 0, ps: 0, r: 15, s: 100000 },
            { ns: 0, ps: 0, r: 17, s: 65000 },
            { ns: 0, ps: 0, r: 51, s: 0 },
            { ns: 0, ps: 0, r: 12, s: 150000 },
            { ns: 0, ps: 0, r: 12, s: 150000 },
            { ns: 0, ps: 0, r: 14, s: 25000 },
            { ns: 0, ps: 0, r: 18, s: 15065 } ] }
