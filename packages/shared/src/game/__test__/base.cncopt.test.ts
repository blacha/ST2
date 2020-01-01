import * as o from 'ospec';
import 'source-map-support/register';
import { GameData } from '../../data/loader';
import { BaseBuilder } from '../base/base.builder';
import { BaseProduction } from '../production';
import { BaseExporter } from '../base/base.export';

const codes: Record<string, string> = {
    shockA: `3|N|N|s-A|10b10p10p10p10r.12y.10d10rt15a10p10r11h...10r10p11p10p10r.11s11h..ccc10r.11s.14e.....11h.10nc..10h...13s.......10n.11h..........j..................kk.ll.kk....d..........k..jjjwjj.........hh.h.ll.....q.10z11m11m9v9v9v11v....10q...10t........10t........13t|0|0|0|0|0|0|0|newEconomy`,
    Outpost: `3|F|N|Outpost|..........13n.tt..t....12r12r....12q.13h13utt.c........12n.12y.....12s13s...13n.t.13n..12w..........12q.....h..h.12b12b12b12bhkk..12m.ll.12q.12mj.....ll13q..12b12b.13s..h..k.jjk.h..12gl13q.....h..12m12m...10m9m.......8m8m.......9q9q.......10v8v7v...|0|0|0|0|0|0|0|newEconomy`,
    NickiMinaj: `3|G|G|NickiMinaj|......13e.10y.t9r8p9rt8r....9r8r8p8p10rt..ccc10a8p10r....8r8p9rt8rcc7d.t8r8p8r10s.....8r.c.t.7f.7b......j..................kk.ll.kk...............k..jjj5mjj5m.....5m5m5mhh.h.ll5m....9r9r.......10r10r.......12r11r.9g.7a....11g10g..8a.10p.|0|0|0|0|0|0|0|newEconomy`,
    Executor1985: `3|G|G|Executor1985|.12y.8b..12e.8f.12h10a10r.12h....8p8p8p8d.12s12h.10r11n11n11n......8p8p12s.12h.11nc.10a12h...12s.......11n.12h..........j..................kk.ll.kk...............k..jjj.jj.........hh.h.ll.....11g11g12r11r11r11r...10p10p.......10a10a................|0|0|0|0|0|0|0|newEconomy`,
    shockB: `3|N|N|s-B|10b8r10p11p11p9r12y.15e.t10p18a11p11h....9r11p11p11p9r12s11h10d.ccc7r9r12s.......11h.11nc..t...14s.......11n.11h..........j..................kk.ll.kk....d..........k..jjjwjj.........hh.h.ll......10z13z15m13m10v11v11v12v.10q......11t........11tq.......15t|11424|8000|13600|25|14|24|25|newEconomy`,
};

o.spec('Base.cncOpt', () => {
    o.before(() => GameData.load());

    for (const key of Object.keys(codes)) {
        o('should round trip ' + key, () => {
            const code = codes[key];
            const base = BaseBuilder.fromCnCOpt(code);
            o(BaseExporter.toCncOpt(base)).equals(code);
        });
    }

    o('should get resource production', () => {
        const base = BaseBuilder.fromCnCOpt(codes.shockB);
        const output = BaseProduction.getOutput(base);

        const { alliance, cont, pkg } = output;
        o(Math.floor(cont.tiberium)).equals(7498);
        o(pkg.tiberium).equals(8200);
        o(alliance.tiberium).equals(11424);

        o(Math.floor(cont.crystal)).equals(4148);
        o(pkg.crystal).equals(4100);
        o(alliance.crystal).equals(8000);

        o(Math.floor(cont.power)).equals(21910);
        o(pkg.power).equals(7950);
        o(alliance.power).equals(13600);

        o(cont.credits).equals(8070);
        o(pkg.credits).equals(3780);
        o(alliance.credits).equals(0);
    });
});
