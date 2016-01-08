import {ParseConfig} from "../../parse.config";
import Parse = require('parse/node');
import {Log} from "../../lib/log/log";

Parse.initialize(ParseConfig.APP, ParseConfig.JS, '2Yy0P9z6Ybp4ewFc736K8KhN4DUAbyi4A2gkzMgi');
Parse.Cloud.useMasterKey();

export var ParseCLIUtil = {
    getAll(className, $log:Log) {
        $log = $log.child({
            module: 'Parse',
            className: className
        });

        $log.info('getAll');
        var Obj = Parse.Object.extend(className);
        var query = new Parse.Query(Obj);

        return query.find().then(function(data) {
            return data;
        });
    }
};