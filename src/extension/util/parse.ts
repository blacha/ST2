import {ParseConfig} from '../../parse.config';
import {Log} from '../../lib/log/log';
declare var Promise:any;

var INSTANCE:ParseUtil;
export class ParseUtil {

    static TIMEOUT = 5000;
    private queue;

    constructor() {
        var defer = Promise.defer();
        this.queue = defer.promise;

        defer.resolve();
    }

    static getInstance():ParseUtil {
        if (INSTANCE == null) {
            INSTANCE = new ParseUtil();
        }
        return INSTANCE;
    }

    static send(name:string, data:Object, log:Log) {
        return ParseUtil.getInstance().send(name, data, log);
    }

    send(name:string, data:Object, log:Log) {
        var defer = Promise.defer();

        var requestLog = log.child({func: name});

        this.queue.then(() => {
            requestLog.info('Request..');

            var queueDefer = Promise.defer();

            var http = new XMLHttpRequest();

            var url = `https://api.parse.com/1/functions/${name}`;

            http.open('POST', url, true);
            http.setRequestHeader('X-Parse-Application-Id', ParseConfig.APP);
            http.setRequestHeader('X-Parse-REST-API-Key', ParseConfig.REST);
            http.setRequestHeader('Content-Type', 'application/json');
            var timedOut = false;
            var resolved = false;
            http.onreadystatechange = function () {
                if (http.readyState !== 4) {
                    return;
                }

                queueDefer.resolve();
                var response = JSON.parse(http.responseText);
                if (timedOut) {
                    return;
                }
                resolved = true;
                defer.resolve(response);
            };

            http.send(JSON.stringify(data));

            setTimeout(function () {
                if (resolved) {
                    return;
                }
                timedOut = true;

                defer.reject('Timeout');
            }, ParseUtil.TIMEOUT);

            return queueDefer.promise;
        });

        return defer.promise;
    }
}
