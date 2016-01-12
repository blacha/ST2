import {ParseObject} from './parse.object';
import {ParseJSONLayoutObject} from "../../lib/objects/layout";
import {ParseBaseObject} from "./parse.object";
import {Log} from "../../lib/log/log";
import {CityLayout} from "../../api/city.layout";
import {ParseRole} from "../permission/role";
import {AllianceObject} from "./alliance";
import {ACL} from "../permission/acl";
import {PlayerObject} from "./player";

export interface ParseLayoutObject extends ParseBaseObject {
    attrs: ParseJSONLayoutObject;
}

export class LayoutObject extends ParseObject {
    static schema = {
        CITYID: 'cityid',
        FACTION: 'faction',
        LEVEL: 'level',
        NAME: 'name',
        PLAYER: 'player',
        TILES: 'tiles',
        UPGRADES: 'upgrades',
        VERSION: 'version',
        WORLD: 'world',
        X: 'x',
        Y: 'y',
        COORD: 'coord'
    };

    schema = LayoutObject.schema;


    constructor() {
        super('Layout');
    }

    create(obj:CityLayout, master:boolean, $log:Log) {
        var layoutObj;
        return super.create(obj, master, $log).then((layout) => {
            layoutObj = layout;
            $log.debug('Layout created');
            return this.addACLS(layout, obj, $log);
        });
    }

    addACLS(obj:ParseLayoutObject, scanObj:CityLayout, $log:Log) {
        return Parse.Promise.when([
            ParseRole.getOrCreate(AllianceObject.RoleNameByData(scanObj.world, scanObj.alliance), $log),
            ParseRole.getOrCreate(PlayerObject.RoleName(scanObj.player), $log),
        ]).then(() => {
            var acl = obj.getACL();
            if (acl == null) {
                acl = ACL.create();
            }

            acl.setRoleReadAccess(AllianceObject.RoleNameByData(scanObj.world, scanObj.alliance), true);
            acl.setRoleReadAccess(PlayerObject.RoleName(scanObj.player), true);
            obj.setACL(acl);
            return obj.save();
        })
    }

    getSchema() {
        return this.schema;
    }

    makeCoord(x:number, y:number):number {
        var xMajor = (x & 0xffff) << 0x10;
        var yMinor = y & 0xffff;
        return xMajor | yMinor;
    }
}

export var Layout = new LayoutObject();