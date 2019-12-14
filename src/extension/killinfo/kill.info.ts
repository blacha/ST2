import { ClientLibBattleViewUnit, ClientLibStatic, MouseMode } from '../@types/client.lib';
import { StModule } from '../module';

declare const $I: any;
declare const ClientLib: ClientLibStatic;

export interface KillInfoProto {
    functionName: string;
    protoName: string;
    internalObj: string;
    showFunction: string;
}

/**
 * Display the approximate plunder amount when mousing over units inside the battle view
 */
class KillInfo implements StModule {
    name = 'KillInfo';

    protoInfo: KillInfoProto | null = null;
    oldFunction: Function | null = null;

    async start() {
        this.findPrototype();

        if (this.protoInfo == null) {
            return;
        }
        const proto = $I[this.protoInfo.protoName];
        if (proto == null || proto.prototype[this.protoInfo.functionName] == null) {
            return;
        }

        this.oldFunction = proto.prototype[this.protoInfo.functionName];
        proto.prototype[this.protoInfo.functionName] = function(c: ClientLibBattleViewUnit) {
            if (typeof c.get_UnitDetails !== 'function') {
                return this.oldFunction.call(this, c);
            }

            this.oldFunction.call(this, c);
            if (ClientLib.Vis.VisMain.GetInstance().get_MouseMode() != MouseMode.Default) {
                return;
            }

            const unit = c.get_UnitDetails();

            // TODO adjust plunder to hp
            // const hp = unit.get_HitpointsPercent();
            const plunder = unit.get_UnitLevelRepairRequirements();
            const data = unit.get_UnitGameData_Obj();

            if (this[this.protoInfo.internalObj] != null) {
                this[this.protoInfo.internalObj][this.protoInfo.showFunc](data.dn, data.ds, plunder, '');
            }
        };
    }

    findPrototype() {
        const funcNameMatch = '"tnf:full hp needed to upgrade")';
        const funcContentMatch = 'DefenseTerrainFieldType';
        let funcName = '';

        /** Look for the translation string */
        function searchFunction(proto: any) {
            for (const j of Object.keys(proto)) {
                if (j.length !== 6) {
                    continue;
                }

                const func = proto[j];
                if (typeof func === 'function') {
                    const str = func.toString();
                    if (str.indexOf(funcNameMatch) !== -1) {
                        return j;
                    }
                }
            }
            return '';
        }

        for (const i of Object.keys($I)) {
            const obj = $I[i];
            if (obj.prototype === undefined) {
                continue;
            }
            if (funcName === '') {
                funcName = searchFunction(obj.prototype);
                if (funcName === '') {
                    continue;
                }
            }

            const func = obj.prototype[funcName];
            if (func === undefined) {
                continue;
            }
            const str = func.toString();

            // not the particular version we are looking for
            if (str.indexOf(funcContentMatch) === -1) {
                continue;
            }

            const matches = str.match(/(.{6}).(.{6})\(d,e,i,f\)/);
            if (matches !== null && matches.length === 3) {
                this.protoInfo = {
                    functionName: funcName,
                    protoName: i,
                    internalObj: matches[1],
                    showFunction: matches[2],
                };
            }
        }
    }

    async stop() {
        if (this.oldFunction == null || this.protoInfo == null) {
            return;
        }
        // reset the function
        $I[this.protoInfo.protoName].prototype[this.protoInfo.functionName] = this.oldFunction;
        this.oldFunction = null;
    }
}
