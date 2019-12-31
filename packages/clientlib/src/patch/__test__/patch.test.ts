import * as o from 'ospec';
import 'source-map-support/register';
import { PatchData } from '../patches';
import { ClientLibPatcher } from '../index';

const TestFunction = `function(a,b,c,d){var $createHelper;var e={};$I.JXOATA.prototype.YSIVYC.call (this,a,b.TLOBVD());var f;this.MJUXKK=-1;this.TQJOAQ=-1;this.PHASSC=-1;this.CQFDQU=-1;this.LSAMML=-1;this.UDWOJP=-1;this.PNREBP=-1;var g=$I.ITZSNM.HLKEWN(c,d);this.NIGUWT=((g&1)!=0);var h=(((g>>1)&1)!=0);var i=(((g>>2)&1)!=0);var j=(((g>>3)&1)!=0);var k=(((g>>4)&1)!=0);var l=(((g>>5)&1)!=0);var m=(((g>>6)&1)!=0);var n=(((g>>7)&1)!=0);this.TIUOVE=(((g>>8)&1)!=0);this.JHDYUW=((g>>9)&0xff);this.NISZLR=((g>>0x11)&15);this.CXMEOD=((g>>0x16)&0x3ff);this.DGRLKS=b.WMQTTZ(this.CXMEOD);d+=5;if (h){this.MJUXKK=(e.$r=$I.ITZSNM.ABZEHV(c,d,e),f=e.c,e.$r);d+=f;}if (i){this.TQJOAQ=(e.$r=$I.ITZSNM.ABZEHV(c,d,e),f=e.c,e.$r);d+=f;}if (j){this.PHASSC=(e.$r=$I.ITZSNM.ABZEHV(c,d,e),f=e.c,e.$r);d+=f;this.CQFDQU=(e.$r=$I.ITZSNM.ABZEHV(c,d,e),f=e.c,e.$r);d+=f;}if (k){this.LSAMML=(e.$r=$I.ITZSNM.ABZEHV(c,d,e),f=e.c,e.$r);d+=f;}if (l){this.UDWOJP=(e.$r=$I.ITZSNM.ABZEHV(c,d,e),f=e.c,e.$r);d+=f;this.HUZFDB=(e.$r=$I.ITZSNM.ABZEHV(c,d,e),f=e.c,e.$r);d+=f;}if (m){this.PNREBP=(e.$r=$I.ITZSNM.ABZEHV(c,d,e),f=e.c,e.$r);d+=f;}this.WIIHVW=(e.$r=$I.ITZSNM.ABZEHV(c,d,e),f=e.c,e.$r);d+=f;if (n){this.XQTUKB=(e.$r=$I.ITZSNM.ABZEHV(c,d,e),f=e.c,e.$r);d+=f;}else{this.XQTUKB=-1;}this.CUQDSG=(e.$r=$I.ITZSNM.ABZEHV(c,d,e),f=e.c,e.$r);d+=f;this.UAYKLX=(e.$r=$I.ITZSNM.ABZEHV(c,d,e),f=e.c,e.$r);d+=f;this.UQLPBA=(e.$r=$I.ITZSNM.ABZEHV(c,d,e),f=e.c,e.$r);d+=f;this.RRJSAU=c.substr(d);return this;}`;
o.spec('PatchTest', () => {
    function getWindow() {
        function WorldObjectCity() {
            //noop
        }

        WorldObjectCity.prototype = {
            UQLPBA: 'AllianceId',
            UAYKLX: 'Id',
            DGRLKS: 'PlayerId',
            $ctor: TestFunction,
        };

        const win = {
            ClientLib: {
                Data: {
                    WorldSector: { WorldObjectCity },
                },
            },
            // @ts-ignore
            WorldCity: new WorldObjectCity(),
        };
        return win;
    }
    o('should patch world object', () => {
        const getAllianceId = PatchData.find(f => f.target == 'ClientLib.Data.WorldSector.WorldObjectCity.$AllianceId');
        const getId = PatchData.find(f => f.target == 'ClientLib.Data.WorldSector.WorldObjectCity.$Id');
        const getPlayerId = PatchData.find(f => f.target == 'ClientLib.Data.WorldSector.WorldObjectCity.$PlayerId');

        if (getAllianceId == null || getId == null || getPlayerId == null) {
            throw new Error('Failed to find patches to test');
        }

        const window = getWindow();

        const protoPath = getAllianceId.source.split('.');
        protoPath.pop();
        const proto = ClientLibPatcher.getFromKey(protoPath, window);
        o(proto['$Id']).equals(undefined);
        o(proto['$AllianceId']).equals(undefined);
        o(proto['$PlayerId']).equals(undefined);

        const resId = ClientLibPatcher.getFromKey(getId.source.split('.'), window);
        const resAllianceId = ClientLibPatcher.getFromKey(getAllianceId.source.split('.'), window);
        const PlayerId = ClientLibPatcher.getFromKey(getAllianceId.source.split('.'), window);

        o(resId).equals(TestFunction);
        o(resAllianceId).equals(TestFunction);
        o(PlayerId).equals(TestFunction);

        ClientLibPatcher.patchKey(getAllianceId, window as any);
        ClientLibPatcher.patchKey(getId, window as any);
        ClientLibPatcher.patchKey(getPlayerId, window as any);

        const WorldObjectCity = window.ClientLib.Data.WorldSector.WorldObjectCity as any;
        const newObj = new WorldObjectCity();
        o(newObj.$AllianceId).equals('AllianceId');
        o(newObj.$Id).equals('Id');
        o(newObj.$PlayerId).equals('PlayerId');

        o(window.WorldCity.$AllianceId).equals('AllianceId');
        o(window.WorldCity.$Id).equals('Id');
        o(window.WorldCity.$PlayerId).equals('PlayerId');
    });
});
