import * as o from 'ospec';
import 'source-map-support/register';
import { PatchWorldObjectCity, PatchWorldObjectNPCCamp } from '../patch.data';
import { ClientLibPatch } from '../client.patcher';

const TestFunctionWorldObject = `function(a,b,c,d){var $createHelper;var e={};$I.JXOATA.prototype.YSIVYC.call (this,a,b.TLOBVD());var f;this.MJUXKK=-1;this.TQJOAQ=-1;this.PHASSC=-1;this.CQFDQU=-1;this.LSAMML=-1;this.UDWOJP=-1;this.PNREBP=-1;var g=$I.ITZSNM.HLKEWN(c,d);this.NIGUWT=((g&1)!=0);var h=(((g>>1)&1)!=0);var i=(((g>>2)&1)!=0);var j=(((g>>3)&1)!=0);var k=(((g>>4)&1)!=0);var l=(((g>>5)&1)!=0);var m=(((g>>6)&1)!=0);var n=(((g>>7)&1)!=0);this.TIUOVE=(((g>>8)&1)!=0);this.JHDYUW=((g>>9)&0xff);this.NISZLR=((g>>0x11)&15);this.CXMEOD=((g>>0x16)&0x3ff);this.DGRLKS=b.WMQTTZ(this.CXMEOD);d+=5;if (h){this.MJUXKK=(e.$r=$I.ITZSNM.ABZEHV(c,d,e),f=e.c,e.$r);d+=f;}if (i){this.TQJOAQ=(e.$r=$I.ITZSNM.ABZEHV(c,d,e),f=e.c,e.$r);d+=f;}if (j){this.PHASSC=(e.$r=$I.ITZSNM.ABZEHV(c,d,e),f=e.c,e.$r);d+=f;this.CQFDQU=(e.$r=$I.ITZSNM.ABZEHV(c,d,e),f=e.c,e.$r);d+=f;}if (k){this.LSAMML=(e.$r=$I.ITZSNM.ABZEHV(c,d,e),f=e.c,e.$r);d+=f;}if (l){this.UDWOJP=(e.$r=$I.ITZSNM.ABZEHV(c,d,e),f=e.c,e.$r);d+=f;this.HUZFDB=(e.$r=$I.ITZSNM.ABZEHV(c,d,e),f=e.c,e.$r);d+=f;}if (m){this.PNREBP=(e.$r=$I.ITZSNM.ABZEHV(c,d,e),f=e.c,e.$r);d+=f;}this.WIIHVW=(e.$r=$I.ITZSNM.ABZEHV(c,d,e),f=e.c,e.$r);d+=f;if (n){this.XQTUKB=(e.$r=$I.ITZSNM.ABZEHV(c,d,e),f=e.c,e.$r);d+=f;}else{this.XQTUKB=-1;}this.CUQDSG=(e.$r=$I.ITZSNM.ABZEHV(c,d,e),f=e.c,e.$r);d+=f;this.UAYKLX=(e.$r=$I.ITZSNM.ABZEHV(c,d,e),f=e.c,e.$r);d+=f;this.UQLPBA=(e.$r=$I.ITZSNM.ABZEHV(c,d,e),f=e.c,e.$r);d+=f;this.RRJSAU=c.substr(d);return this;}`;
const TestFunctionNpcCamp = `function(a,b,c,d){var $createHelper;var e={};$I.JXOATA.prototype.YSIVYC.call (this,a,b);var f;this.ASLERL=-1;this.HKXTPE=-1;var g=$I.ITZSNM.XSTVIB(c,d);this.LATNTS=((g&1)!=0);var h=(((g>>1)&1)!=0);var i=(((g>>2)&1)!=0);this.DPPRMX=(((g>>3)&1)!=0);this.RMLGMJ=(((g>>4)&0x3fff)/100);this.XVBWQT=Math.floor(Math.floor((this.RMLGMJ+0.5)));this.LRWCOA=((g>>0x12)&15);this.FEXPQI=((g>>0x16)&$I.JMLMRM.Event);d+=4;if (h){this.ASLERL=(e.$r=$I.ITZSNM.ABZEHV(c,d,e),f=e.c,e.$r);d+=f;this.HKXTPE=(e.$r=$I.ITZSNM.ABZEHV(c,d,e),f=e.c,e.$r);d+=f;}this.ZQFJEW=(e.$r=$I.ITZSNM.ABZEHV(c,d,e),f=e.c,e.$r);d+=f;if (i){this.QHESTB=(e.$r=$I.ITZSNM.ABZEHV(c,d,e),f=e.c,e.$r);d+=f;}else{this.QHESTB=-1;}this.SUJJBN=(e.$r=$I.ITZSNM.ABZEHV(c,d,e),f=e.c,e.$r);return this;}`;
o.spec('PatchTest', () => {
    const WorldObjectCity = function WorldObjectCity() {
        // Noop
    } as any;

    WorldObjectCity.prototype = {
        UQLPBA: 'AllianceId',
        UAYKLX: 'Id',
        DGRLKS: 'PlayerId',
        $ctor: TestFunctionWorldObject,
    };
    const WorldObjectNPCCamp = function WorldObjectNPCCamp() {
        // Noop
    } as any;
    WorldObjectNPCCamp.prototype = {
        FEXPQI: 'CampType',
        SUJJBN: 'Id',
        RMLGMJ: 'Level',
        $ctor: TestFunctionNpcCamp,
    };

    o('should lookup patched objects', () => {
        (global as any).window = { a: { b: { c: 'd' } } };
        const patch = new ClientLibPatch<any, any>('a.b.c');
        o(patch.getBaseObject()).equals('d');

        patch.path = 'a.b';
        o(patch.getBaseObject()).equals('d');
        patch.baseObject = null;
        o(patch.getBaseObject()).deepEquals({ c: 'd' });
    });

    o('should patch world object', () => {
        const oldObj = new WorldObjectCity();
        PatchWorldObjectCity.baseObject = WorldObjectCity;

        o(WorldObjectCity.prototype.$Id).equals(undefined);
        o(WorldObjectCity.prototype.$AllianceId).equals(undefined);
        o(WorldObjectCity.prototype.$PlayerId).equals(undefined);

        PatchWorldObjectCity.apply();

        const newObj = new WorldObjectCity();
        o(newObj.$AllianceId).equals('AllianceId');
        o(newObj.$Id).equals('Id');
        o(newObj.$PlayerId).equals('PlayerId');

        o(oldObj.$AllianceId).equals('AllianceId');
        o(oldObj.$Id).equals('Id');
        o(oldObj.$PlayerId).equals('PlayerId');

        PatchWorldObjectCity.remove();
        o(WorldObjectCity.prototype.$Id).equals(undefined);
        o(WorldObjectCity.prototype.$AllianceId).equals(undefined);
        o(WorldObjectCity.prototype.$PlayerId).equals(undefined);
    });

    o('should patch npc camps', () => {
        const oldObj = new WorldObjectNPCCamp() as any;
        PatchWorldObjectNPCCamp.baseObject = WorldObjectNPCCamp;

        o(WorldObjectNPCCamp.prototype.$Id).equals(undefined);
        o(WorldObjectNPCCamp.prototype.$Level).equals(undefined);
        o(WorldObjectNPCCamp.prototype.$CampType).equals(undefined);

        PatchWorldObjectNPCCamp.apply();

        const newObj = new WorldObjectNPCCamp();
        o(newObj.$CampType).equals('CampType');
        o(newObj.$Id).equals('Id');
        o(newObj.$Level).equals('Level');

        o(oldObj.$CampType).equals('CampType');
        o(oldObj.$Id).equals('Id');
        o(oldObj.$Level).equals('Level');

        PatchWorldObjectNPCCamp.remove();
        o(WorldObjectNPCCamp.prototype.$Id).equals(undefined);
        o(WorldObjectNPCCamp.prototype.$AllianceId).equals(undefined);
        o(WorldObjectNPCCamp.prototype.$PlayerId).equals(undefined);
    });

    o('should replace a function', () => {
        class ToReplace {
            funcToReplace() {
                return 'A';
            }
        }
        const oldObj = new ToReplace();
        const patcher = new ClientLibPatch<{}, typeof ToReplace>('path');
        patcher.baseObject = ToReplace;
        patcher.replaceFunction('funcToReplace', () => 'B');
        o(oldObj.funcToReplace()).equals('A');

        patcher.apply();
        o(oldObj.funcToReplace()).equals('B');

        patcher.remove();
        o(oldObj.funcToReplace()).equals('A');
    });
});
