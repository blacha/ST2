import * as o from 'ospec';
import { Base } from '../base';
import { BaseBuilder } from '../base.builder';
import { BasePacker } from '../base.packer';

o.spec('BasePacker', () => {
    o('should pack/unpack a id', () => {
        const str = BasePacker.id.pack(4120, 2048872);
        o(str).equals('8B0k.14s');
        const out = BasePacker.id.unpack(str);
        o(out).deepEquals({ worldId: 4120, cityId: 2048872 });
    });

    o('should unpack a layout', () => {
        const cncOpt = `3|G|G|Base|..........cc.t.c............cc.t.t................t.c..tt...............j..............k.hhhh.....h...........k.kk..l.h.l.....l..l...jj.....l.......................................|0|0|0|0|0|0|0|newEconomy`;
        const baseOrig = BaseBuilder.fromCnCOpt(cncOpt);

        const packed = BasePacker.layout.pack(baseOrig.tiles);
        o(packed).equals('10.2c.t.c12.2c.t.t16.t.c2.2t15.j14.k.4h5.h11.k.2k2.l.h.l5.l2.l3.2j5.l');
        const base = new Base();
        base.tiles = BasePacker.layout.unpack(packed);
        o(base.toCncOpt()).equals(cncOpt);
    });

    o('should pack xy', () => {
        const point = BasePacker.xy.pack(768, 398);
        const pointS = BasePacker.number.pack(point);

        o(pointS).equals('1LrFe');
        o(point).equals(26084096);

        o(BasePacker.number.unpack(pointS)).equals(point);
        o(BasePacker.xy.unpack(point)).deepEquals({ x: 768, y: 398 });
    });
});

o.run();
