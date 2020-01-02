import { GameDataUnitId } from '@cncta/clientlib';
import * as o from 'ospec';
import { BaseBuilder, BaseExporter } from '../base';
import { BaseExampleForgotten, BaseExampleNod } from './base.example';

o.spec('BaseBuilder', () => {
    o('should load example base', () => {
        const base = BaseBuilder.load(BaseExampleForgotten);
        o(BaseExporter.toCncOpt(base)).equals(
            `3|F|F|Camp|.15u......15y.15r.15b15h.t...tt..15s15v......cc16n.16q...........c......16w.c.cc.15h..........j.15g....15s..hh.15m.h...16o..15m15r.kk.....15q16t16t..ll..lll.h..hh.16w16w16s..k...kk...15ol....15r....................................|0|0|0|0|0|0|0|newEconomy`,
        );
    });
    o('should load example nod base', () => {
        const base = BaseBuilder.load(BaseExampleNod);
        o(BaseExporter.toCncOpt(base)).equals(
            `3|N|N|shocknod 1|..16e.13y.15w.12i.t...17h.....12f.12d13r18s18h13b.ccc12r13r15s....11p11p11p19h16q13hc..t23a11p12r22s....11p11p11p13h.18h..........j..........12m11w.12m12w...kk14dll13dkk.11w12m13f15m15f15m14f...13m13w14d13wk13w14mjjj14djj14m.....12m..hh.h.ll..........12v11v12v13v..15m14m14m14m15m.13t....12q11q..16t...11k11q...16t|0|0|0|0|0|0|0|newEconomy`,
        );

        o(base.isResearched(GameDataUnitId.NodMilitants)).equals(true);
        o(base.isResearchUpgraded(GameDataUnitId.NodMilitants)).equals(true);

        o(base.isResearched(GameDataUnitId.NodCobra)).equals(true);
        o(base.isResearchUpgraded(GameDataUnitId.NodCobra)).equals(true);

        o(base.isResearched(GameDataUnitId.NodCommando)).equals(false);
        o(base.isResearchUpgraded(GameDataUnitId.NodCommando)).equals(false);
    });
});
