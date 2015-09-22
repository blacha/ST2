/// <reference path="../../typings/mithril/mithril.d.ts" />

export var ParseUtil = {
    login: (user:string, pass:string):_mithril.MithrilPromise<string> => {
        return null;
    },

    logout: () => {

    },


    getData: (name:string, id:string):_mithril.MithrilPromise<any> => {
        var url = `https://api.parse.com/1/classes/${name}/${id}`;
        return m.request({
            method: 'GET',
            url: url,
            config: ParseConfig
        }).then(function (data) {
            return data;
        }, function () {
            m.route('/logout')
        });
    }
};

function ParseConfig(http, opts) {
    http.setRequestHeader('X-Parse-Application-Id', 'p1tXYbkTHiz7KuX9BiGG5LtJEe0EOqegIl6F1XhJ');
    http.setRequestHeader('X-Parse-REST-API-Key', 'UdPxMf4bww3S5KSUe9qAFYMaZ1mfEGYE2TGePGTU');
    return http;
}