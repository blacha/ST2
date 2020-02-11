import * as o from 'ospec';
import { ClientLibPatch } from '../client.patcher';

o.spec('PatchFinder', () => {
    const ret = function ret() {
        // Noop
    };
    ret.prototype = {
        $ctor: new Function(
            `function $ctor(a,b){var $createHelper;var c=$I.VVJKSG.EAYGYC().HTLWPS();var d=true;var e=null;if (d){var f=false;e=a.BMUACB(this.WZXYZP.CXMEOD);if(e!=null){var g=$I.VVJKSG.EAYGYC().HTLWPS().SWGPLK(this.RYHQRB(),this.QTNSXR());if(this.BYTFGU()==$I.GXKJME.Own){g="#000000";}var h=this.NJLEJE+" "+b.JHDYUW.toString();var i=b.RRJSAU;var j=e.CAQTRQ;if ($I.HBJIZZ.AUNZFM().MBBKDA()){j="            ";}if((this.UDQMVP.Text!=h)||(this.UDQMVP.Color!=g)){f=true;this.UDQMVP.Text=h;this.UDQMVP.Color=g;}if((this.YTNYAC.Text!=i)||(this.YTNYAC.Color!=g)){f=true;this.YTNYAC.Text=i;this.YTNYAC.Color=g;}if((this.WAHFEP.Text!=j)||(this.WAHFEP.Color!=g)){f=true;this.WAHFEP.Text=j;this.WAHFEP.Color=g;}}else{this.UDQMVP.Text="";this.YTNYAC.Text="";this.WAHFEP.Text="";}if(f&&(this.SVDBIC!=null)){if(this.BYTFGU()!=$I.GXKJME.Own){this.SVDBIC.DRIBES(this.QTNSXR());}this.SVDBIC.WFDQFZ();}}else{this.DSVZYA();}}`,
        ),
        foo() {
            return 1;
        },
    };

    o('should find the function', () => {
        const res = ClientLibPatch.findFunctionInProto(ret, 'return 1');
        o(res).deepEquals({ key: 'foo', value: ret.prototype.foo.toString() });
    });

    o('should extract a value from function', () => {
        const res = ClientLibPatch.extractValueFromFunction(ret, 'return 1', /([0-9])/);
        o(res).equals('1');
    });

    o('should extract base colors from $ctor', () => {
        const res = ClientLibPatch.extractValueFromFunction(ret, '.Color=', /.*\.([A-Z]{6})\(this.*Color=.*/);
        o(res).equals('SWGPLK');
    });
});
