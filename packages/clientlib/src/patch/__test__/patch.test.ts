import * as o from 'ospec';
import 'source-map-support/register';
import { PatchData } from '../patches';
import { ClientLibPatcher } from '../index';

const TestFunctionWorldObject = `function(a,b,c,d){var $createHelper;var e={};$I.JXOATA.prototype.YSIVYC.call (this,a,b.TLOBVD());var f;this.MJUXKK=-1;this.TQJOAQ=-1;this.PHASSC=-1;this.CQFDQU=-1;this.LSAMML=-1;this.UDWOJP=-1;this.PNREBP=-1;var g=$I.ITZSNM.HLKEWN(c,d);this.NIGUWT=((g&1)!=0);var h=(((g>>1)&1)!=0);var i=(((g>>2)&1)!=0);var j=(((g>>3)&1)!=0);var k=(((g>>4)&1)!=0);var l=(((g>>5)&1)!=0);var m=(((g>>6)&1)!=0);var n=(((g>>7)&1)!=0);this.TIUOVE=(((g>>8)&1)!=0);this.JHDYUW=((g>>9)&0xff);this.NISZLR=((g>>0x11)&15);this.CXMEOD=((g>>0x16)&0x3ff);this.DGRLKS=b.WMQTTZ(this.CXMEOD);d+=5;if (h){this.MJUXKK=(e.$r=$I.ITZSNM.ABZEHV(c,d,e),f=e.c,e.$r);d+=f;}if (i){this.TQJOAQ=(e.$r=$I.ITZSNM.ABZEHV(c,d,e),f=e.c,e.$r);d+=f;}if (j){this.PHASSC=(e.$r=$I.ITZSNM.ABZEHV(c,d,e),f=e.c,e.$r);d+=f;this.CQFDQU=(e.$r=$I.ITZSNM.ABZEHV(c,d,e),f=e.c,e.$r);d+=f;}if (k){this.LSAMML=(e.$r=$I.ITZSNM.ABZEHV(c,d,e),f=e.c,e.$r);d+=f;}if (l){this.UDWOJP=(e.$r=$I.ITZSNM.ABZEHV(c,d,e),f=e.c,e.$r);d+=f;this.HUZFDB=(e.$r=$I.ITZSNM.ABZEHV(c,d,e),f=e.c,e.$r);d+=f;}if (m){this.PNREBP=(e.$r=$I.ITZSNM.ABZEHV(c,d,e),f=e.c,e.$r);d+=f;}this.WIIHVW=(e.$r=$I.ITZSNM.ABZEHV(c,d,e),f=e.c,e.$r);d+=f;if (n){this.XQTUKB=(e.$r=$I.ITZSNM.ABZEHV(c,d,e),f=e.c,e.$r);d+=f;}else{this.XQTUKB=-1;}this.CUQDSG=(e.$r=$I.ITZSNM.ABZEHV(c,d,e),f=e.c,e.$r);d+=f;this.UAYKLX=(e.$r=$I.ITZSNM.ABZEHV(c,d,e),f=e.c,e.$r);d+=f;this.UQLPBA=(e.$r=$I.ITZSNM.ABZEHV(c,d,e),f=e.c,e.$r);d+=f;this.RRJSAU=c.substr(d);return this;}`;
const TestFunctionNpcCamp = `function(a,b,c,d){var $createHelper;var e={};$I.JXOATA.prototype.YSIVYC.call (this,a,b);var f;this.ASLERL=-1;this.HKXTPE=-1;var g=$I.ITZSNM.XSTVIB(c,d);this.LATNTS=((g&1)!=0);var h=(((g>>1)&1)!=0);var i=(((g>>2)&1)!=0);this.DPPRMX=(((g>>3)&1)!=0);this.RMLGMJ=(((g>>4)&0x3fff)/100);this.XVBWQT=Math.floor(Math.floor((this.RMLGMJ+0.5)));this.LRWCOA=((g>>0x12)&15);this.FEXPQI=((g>>0x16)&$I.JMLMRM.Event);d+=4;if (h){this.ASLERL=(e.$r=$I.ITZSNM.ABZEHV(c,d,e),f=e.c,e.$r);d+=f;this.HKXTPE=(e.$r=$I.ITZSNM.ABZEHV(c,d,e),f=e.c,e.$r);d+=f;}this.ZQFJEW=(e.$r=$I.ITZSNM.ABZEHV(c,d,e),f=e.c,e.$r);d+=f;if (i){this.QHESTB=(e.$r=$I.ITZSNM.ABZEHV(c,d,e),f=e.c,e.$r);d+=f;}else{this.QHESTB=-1;}this.SUJJBN=(e.$r=$I.ITZSNM.ABZEHV(c,d,e),f=e.c,e.$r);return this;}`;
o.spec('PatchTest', () => {
    function getWindow() {
        function WorldObjectCity() {
            //noop
        }

        WorldObjectCity.prototype = {
            UQLPBA: 'AllianceId',
            UAYKLX: 'Id',
            DGRLKS: 'PlayerId',
            $ctor: TestFunctionWorldObject,
        };

        function WorldObjectNPCCamp() {
            // Noop
        }
        WorldObjectNPCCamp.prototype = {
            FEXPQI: 'CampType',
            SUJJBN: 'Id',
            RMLGMJ: 'Level',
            $ctor: TestFunctionNpcCamp,
        };

        const win = {
            ClientLib: {
                Data: {
                    WorldSector: { WorldObjectCity, WorldObjectNPCCamp },
                },
            },
            // @ts-ignore
            WorldCity: new WorldObjectCity(),
            // @ts-ignore
            NpcCamp: new WorldObjectNPCCamp(),
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

        o(resId).equals(TestFunctionWorldObject);
        o(resAllianceId).equals(TestFunctionWorldObject);
        o(PlayerId).equals(TestFunctionWorldObject);

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

    o('should patch npc camps', () => {
        const getCampType = PatchData.find(f => f.target == 'ClientLib.Data.WorldSector.WorldObjectNPCCamp.$CampType');
        const getId = PatchData.find(f => f.target == 'ClientLib.Data.WorldSector.WorldObjectNPCCamp.$Id');
        const getLevel = PatchData.find(f => f.target == 'ClientLib.Data.WorldSector.WorldObjectNPCCamp.$Level');

        if (getCampType == null || getId == null || getLevel == null) {
            throw new Error('Failed to find patches to test');
        }

        const window = getWindow();

        const protoPath = getCampType.source.split('.');
        protoPath.pop();
        const proto = ClientLibPatcher.getFromKey(protoPath, window);
        o(proto['$Id']).equals(undefined);
        o(proto['$Level']).equals(undefined);
        o(proto['$CampType']).equals(undefined);

        const campType = ClientLibPatcher.getFromKey(getCampType.source.split('.'), window);
        const cityId = ClientLibPatcher.getFromKey(getId.source.split('.'), window);
        const level = ClientLibPatcher.getFromKey(getLevel.source.split('.'), window);

        o(campType).equals(TestFunctionNpcCamp);
        o(cityId).equals(TestFunctionNpcCamp);
        o(level).equals(TestFunctionNpcCamp);

        ClientLibPatcher.patchKey(getCampType, window as any);
        ClientLibPatcher.patchKey(getId, window as any);
        ClientLibPatcher.patchKey(getLevel, window as any);

        const WorldObjectNPCCamp = window.ClientLib.Data.WorldSector.WorldObjectNPCCamp as any;
        const newObj = new WorldObjectNPCCamp();
        o(newObj.$CampType).equals('CampType');
        o(newObj.$Id).equals('Id');
        o(newObj.$Level).equals('Level');

        o(window.NpcCamp.$CampType).equals('CampType');
        o(window.NpcCamp.$Id).equals('Id');
        o(window.NpcCamp.$Level).equals('Level');
    });
});
