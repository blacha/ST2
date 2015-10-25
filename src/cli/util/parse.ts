import {ParseConfig} from '../../parse.config';
declare var Promise:any;

export class ParseUtil {

    private queue;

    constructor() {
        var defer = Promise.defer();
        this.queue = defer.promise;

        defer.resolve();
    }


    send(name, data) {
        var defer = Promise.defer();

        this.queue.then(() => {
            console.log('request', data);
            var queueDefer = Promise.defer();

            var http = new XMLHttpRequest();

            var url = `https://api.parse.com/1/functions/${name}`;

            http.open('POST', url, true);
            http.setRequestHeader('X-Parse-Application-Id', ParseConfig.APP);
            http.setRequestHeader('X-Parse-REST-API-Key', ParseConfig.REST);
            http.setRequestHeader('Content-Type', 'application/json');
            var timedOut = false;
            var resolved = false;
            http.onreadystatechange = function() {
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

            setTimeout(function() {
                if (resolved) {
                    return;
                }
                timedOut = true;

                defer.reject('Timeout');
            }, 2000);

            return queueDefer.promise;
        });

        return defer.promise;
    }
}
//function parseFunction(func, args) {
//    var defer = Promise.defer();
//
//
//    var http = new XMLHttpRequest();
//
//    var url = 'https://api.parse.com/1/classes/Layout';
//
//    http.open('POST', url, true);
//    http.setRequestHeader('X-Parse-Application-Id', 'p1tXYbkTHiz7KuX9BiGG5LtJEe0EOqegIl6F1XhJ');
//    http.setRequestHeader('X-Parse-REST-API-Key', 'UdPxMf4bww3S5KSUe9qAFYMaZ1mfEGYE2TGePGTU');
//    http.setRequestHeader('Content-Type', 'application/json');
//
//    http.onreadystatechange = function() {
//        if (http.readyState == 4 && http.status == 201) {
//            var response = JSON.parse(http.responseText);
//            var id = response.objectId;
//            console.log(id);
//        }
//    };
//
//    http.send(JSON.stringify(data));
//}
