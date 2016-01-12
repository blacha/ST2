interface TableColOptions {
    formatter?: (value:any, data?:any) => any;
    sorter?: CustomGetter;
    sort?: string;
}

interface CustomGetter {
    (data:any, col?:TableCol, ctrl?:any): any
}

export class TableCol {
    public header:string;
    public key:string;
    public sortKey:string;
    private customGetter:CustomGetter;
    private customSortGetter:CustomGetter;
    private customFormatter:(value:any, data?:any) => string;

    public enabled = true;
    public sortable = true;
    public order = -1;

    private initalSortOrder = -1;

    constructor(header:string, key:string|CustomGetter, options?:TableColOptions) {
        this.header = header;
        if (options) {
            this.customFormatter = options.formatter;
            this.customSortGetter = options.sorter;
            this.sortKey = options.sort;
        }

        if (typeof key === 'string') {
            this.key = <string>key;
        }

        if (typeof key === 'function') {
            this.customGetter = <CustomGetter>key;
            if (this.customSortGetter == null) {
                this.customSortGetter = this.customGetter;
            }
        }
    }

    setGetValue(custom) {
        this.customGetter = custom;
    }

    setGetSortValue(custom) {
        this.customGetter = custom;
    }

    getValue(data:any, ctrl:any):string {
        var value = '';
        if (this.customGetter) {
            value = this.customGetter(data, this);
        } else {
            value = TableCol.getValueByKey(data, this.key);
        }

        if (this.customFormatter) {
            return this.customFormatter(value, data);
        }
        return value;
    }

    static getValueByKey(data:any, key:string):string {
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

    getSortValue(data:any, ctrl:any):string {
        var value = '';
        if (this.customSortGetter) {
            value = this.customSortGetter(data, this, ctrl);
        } else {
            value = TableCol.getValueByKey(data, this.sortKey || this.key);
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