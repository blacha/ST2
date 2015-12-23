import {ParsePlayerObject} from "../../../lib/objects/player";
interface AllianceTableColOptions {
    formatter: (value:any) => string;
}
export class AllianceTableCol {
    header:string;
    key:string;
    customGetter:(data:ParsePlayerObject) => string;
    customFormatter:(value:any) => string;
    enabled = true;

    constructor(header:string, key:string, options?:AllianceTableColOptions) {
        this.header = header;
        this.key = key;
        if (options) {
            this.customFormatter = options.formatter;
        }
    }

    setGetValue(custom) {
        this.customGetter = custom;
    }

    getValue(data:ParsePlayerObject):string {
        var value = '';
        if (this.customGetter) {
            value = this.customGetter(data);
        } else {
            value = this.getValueByKey(data);
        }

        if (this.customFormatter) {
            return this.customFormatter(value);
        }
        return value;
    }

    getValueByKey(data:ParsePlayerObject):string {
        var keys = this.key.split('.');
        var current = data;
        for (var i = 0; i < keys.length; i++) {
            var currentKey = keys[i];
            current = current[currentKey];
            if (current == null) {
                return null;
            }
        }

        return <any>current;
    }

}