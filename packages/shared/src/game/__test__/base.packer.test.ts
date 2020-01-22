import * as o from 'ospec';
import { Base } from '../base/base';
import { BaseBuilder } from '../base/base.builder';
import { BaseExporter } from '../base/base.export';
import { NumberPacker, BaseLayoutPacker } from '../base';
import { BaseLocationPacker } from '@cncta/util';

o.spec('NumberPacker', () => {
    o('should pack/unpack a id', () => {
        const str = NumberPacker.pack([4120, 2048872]);
        o(str).equals('S41.K0b8');
        const [worldId, cityId] = NumberPacker.unpack(str);
        o({ worldId, cityId }).deepEquals({ worldId: 4120, cityId: 2048872 });
    });

    o('should unpack a layout', () => {
        const cncOpt = `3|G|G|Base|..........cc.t.c............cc.t.t................t.c..tt...............j..............k.hhhh.....h...........k.kk..l.h.l.....l..l...jj.....l.......................................|0|0|0|0|0|0|0|newEconomy`;
        const baseOrig = BaseBuilder.fromCnCOpt(cncOpt);

        const layout = BaseLayoutPacker.pack(baseOrig);
        o(layout).equals('.QL81..YXE2..4c49.K2..4.Cyfn5.Bhyf5..qMSp6.Co.o8n65.69p');
        const base = new Base();
        base.tiles = BaseLayoutPacker.unpack(layout);
        o(BaseExporter.toCncOpt(base)).equals(cncOpt);
    });

    o('should pack xy', () => {
        const point = BaseLocationPacker.pack(768, 398);
        const pointS = NumberPacker.pack(point);

        o(pointS).equals('EfRl1');
        o(point).equals(26084096);

        o(NumberPacker.unpack(pointS)[0]).equals(point);
        o(BaseLocationPacker.unpack(point)).deepEquals({ x: 768, y: 398 });
    });
});
