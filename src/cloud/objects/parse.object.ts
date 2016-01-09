/// <reference path="../parse.d.ts" />
import {Log} from '../../lib/log/log';

export interface ParseBaseObject {
    get: (key:string) => any;
    set: (key:string, value:any) => void;
    save: () => any;
    setACL: (acl:any) => any;
}

export class ParseObject {
    name:string;
    code:string[];

    constructor(name:string) {
        this.name = name;
        this.code = [];
    }

    getSchema() {
        return {};
    }

    query() {
        return new Parse.Query(Parse.Object.extend(this.name));
    }

    firstQuery(args, master:boolean, $log:Log) {
        var query = this.query();
        Object.keys(args).forEach(function (key) {
            query.equalTo(key, args[key]);
        });

        if (master) {
            Parse.Cloud.useMasterKey();
        }

        return query.first().then((output)  => {
            $log.trace({
                schema: this.name,
                action: 'get-first-query',
                hasResult: output != null,
                args: args
            }, 'get-first-query');

            return output;
        });
    }


    first(key:string, value:any, master:boolean, $log:Log) {
        var query = this.query();
        query.equalTo(key, value);
        if (master) {
            Parse.Cloud.useMasterKey();
        }
        return query.first().then((output)  => {
            $log.trace({
                schema: this.name,
                action: 'get-first',
                hasResult: output != null,
                args: {
                    key: key,
                    value: value
                }
            }, 'get-first');

            return output;
        })
    }

    create(obj, master:boolean, $log:Log) {
        var ParseObj = Parse.Object.extend(this.name);
        var schema = this.getSchema();

        var newObj = new ParseObj();
        var childLog = Log.child({
            schema: this.name,
            action: 'create',
        });

        Object.keys(schema).forEach(function (key) {
            var keyVal = schema[key];
            var value = obj[keyVal];
            if (value) {
                childLog.trace({
                    key: key,
                    value: value
                }, 'Key');
                newObj.set(keyVal, value);
            }
        });
        if (master) {
            Parse.Cloud.useMasterKey();
        }
        return newObj.save();
    }
}