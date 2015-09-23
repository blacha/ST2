/// <reference path="../../typings/mithril/mithril.d.ts" />

export var ParseUtil = {
    URL: {
        LOGIN: 'https://api.parse.com/1/login'
    },

    token: m.prop((<any>localStorage).token),

    login: (user:string, pass:string):_mithril.MithrilPromise<any> => {
        return m.request({
            method: 'GET',
            url: ParseUtil.URL.LOGIN,
            data: {
                username: user,
                password: pass
            }
        }).then(function(data) {
            console.log(data);
        });
    },

    logout: () => {
        ParseUtil.token(null);
        m.route('/login');
    },


    getData: (name:string, id:string):_mithril.MithrilPromise<any> => {
        var url = `https://api.parse.com/1/classes/${name}/${id}`;
        return m.request({
            method: 'GET',
            url: url,
            config: ParseConfig
        }).then(function (data) {
            return data;
        }, function (err) {
            console.log('http:error', err);
            if (m.route() === '/login') {
                return;
            }
            m.route('/logout');
        });
    }
};

function ParseConfig(http, opts) {
    http.setRequestHeader('X-Parse-Application-Id', 'p1tXYbkTHiz7KuX9BiGG5LtJEe0EOqegIl6F1XhJ');
    http.setRequestHeader('X-Parse-REST-API-Key', 'UdPxMf4bww3S5KSUe9qAFYMaZ1mfEGYE2TGePGTU');
    if (ParseUtil.token()) {
        http.setRequestHeader('X-Parse-Session-Token', ParseUtil.token());
    }
    return http;
}