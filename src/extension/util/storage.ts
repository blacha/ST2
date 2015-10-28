export class StorageUtil {
    static PREFIX = 'ST:2';

    static makeKey(key:string) {
        return [StorageUtil.PREFIX, key].join(':');
    }

    static getItem(key:string) {
        var realKey = StorageUtil.makeKey(key);
        var data = localStorage.getItem(realKey);
        if (data == null){
            return null;
        }
        var dataObj = JSON.parse(data);
        if (dataObj.time) {
            return dataObj.value;
        }

        return null;
    }

    static setItem(key, value) {
        var realKey = StorageUtil.makeKey(key);

        localStorage.setItem(realKey, JSON.stringify({
            time: +new Date(),
            value: value
        }));
    }

    static clear() {
        // TODO
    }
}