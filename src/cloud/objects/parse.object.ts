/// <reference path="../parse.d.ts" />
export enum ParseErrorCode {
    NOT_FOUND
}

export class ParseObject {
    name:string;
    code:string[];

    constructor(name:string) {
        this.name = name;
        this.code = [];
    }

    getCode(code) {
        return this.name.toUpperCase() + '_' + ParseErrorCode[code];
    }

    getSchema() {
        return {};
    }

    query() {
        return new Parse.Query(Parse.Object.extend(this.name));
    }


    first(key:string, value:any, master = false) {
        var query = this.query();
        query.equalTo(key, value);
        if (master) {
            Parse.Cloud.useMasterKey();
        }
        return query.first().then((output)  => {
            console.log('get-first ' + this.name + ':' +  JSON.stringify(output));
            return output;
        })
    }

    create(obj, master = false) {
        var ParseObj = Parse.Object.extend(this.name);
        var schema = this.getSchema();

        var newObj = new ParseObj();
        console.log('create-schema :' + this.name + '-' + JSON.stringify(Object.keys(schema)));

        Object.keys(schema).forEach(function (key) {
            var keyVal = schema[key];
            var value = obj[keyVal];
            if (value) {
                console.log('create ' + key + '=' + value);
                newObj.set(keyVal, value);
            }
        });
        if (master) {
            Parse.Cloud.useMasterKey();
        }
        return newObj.save();
    }
}