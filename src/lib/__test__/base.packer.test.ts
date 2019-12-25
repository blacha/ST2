import * as o from 'ospec';
import { Building } from '../building/building';
import { BuildingType } from '../building/building.type';
import { BasePacker } from '../base.packer';
import { Base } from '../base';

o.spec('BasePacker', () => {
    o('should pack/unpack a id', () => {
        const str = BasePacker.packId(410, 2048872);
        o(str).equals('AB9DaAGa');
        const out = BasePacker.unpackId(str);
        o(out).deepEquals({ worldId: 410, cityId: 2048872 });
    });

    o('should unpack a layout', () => {
        const base = new Base();
        BasePacker.unpackLayout(
            [0, 270408, 0, 532552, 0, 2162688, 144, 0, 4, 85721088, 83886445, 0, 100921792, 3112, 75500550, 196608],
            base,
        );

        o(base.toCncOpt()).equals(
            '3|G|G|Base|..........cc.t.c............cc.t.t................t.c..tt...............j..............k.hhhh.....h...........k.kk..l.h.l.....l..l...jj.....l.......................................|0|0|0|0|0|0|0|newEconomy',
        );
    });
});
