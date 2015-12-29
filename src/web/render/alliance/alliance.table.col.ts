import {ParsePlayerObject} from "../../../lib/objects/player";
interface AllianceTableColOptions {
    formatter?: (value:any, data?:ParsePlayerObject) => any;
    sortter?: (value:any, col:AllianceTableCol) => any;
    sort?: string;
}
export class AllianceTableCol {
    public header:string;
    public key:string;
    public sortKey: string;
    private customGetter:(data:ParsePlayerObject, col:AllianceTableCol) => string;
    private customSortGetter:(data:ParsePlayerObject, col:AllianceTableCol) => any;
    private customFormatter:(value:any, data?:ParsePlayerObject) => string;

    public enabled = true;
    public sortable = true;
    public order = -1;

    private initalSortOrder = -1;

    constructor(header:string, key:string, options?:AllianceTableColOptions) {
        this.header = header;
        this.key = key;
        if (options) {
            this.customFormatter = options.formatter;
            this.customSortGetter = options.sortter;
            this.sortKey = options.sort;
        }
    }

    setGetValue(custom) {
        this.customGetter = custom;
    }

    setGetSortValue(custom) {
        this.customGetter = custom;
    }

    getValue(data:ParsePlayerObject):string {
        var value = '';
        if (this.customGetter) {
            value = this.customGetter(data, this);
        } else {
            value = AllianceTableCol.getValueByKey(data, this.key);
        }

        if (this.customFormatter) {
            return this.customFormatter(value, data);
        }
        return value;
    }

    static getValueByKey(data:ParsePlayerObject, key:string):string {
        var keys = key.split('.');
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

    getSortValue(data:ParsePlayerObject):string {
        var value = '';
        if (this.customSortGetter) {
            value = this.customSortGetter(data, this);
        } else {
            value = AllianceTableCol.getValueByKey(data, this.sortKey || this.key);
        }
        if (value == null) {
            return '';
        }
        return value;
    }

    swapSortOrder() {
        this.order *= -1;
    }

    resetSortOrder() {
        this.order = this.initalSortOrder;
    }



}