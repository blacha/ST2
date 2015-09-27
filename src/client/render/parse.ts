/// <reference path="../../../typings/mithril/mithril.d.ts" />


function logoutFunction(err) {
    console.log('http:error', err);
    if (m.route() === '/login') {
        return;
    }
    ParseUtil.logout();
}
export var ParseUtil = {
    URL: {
        LOGIN: 'https://api.parse.com/1/login'
    },

    token: m.prop((<any>localStorage).token),

    login: (user:string, pass:string):_mithril.MithrilPromise<any> => {
        return m.request({
            method: 'POST',
            url: ParseUtil.URL.LOGIN,
            data: {
                username: user.toLowerCase(),
                password: pass
            }
        }).then(function (data) {
            console.log(data);
        });
    },

    func: (name:string, values:any):_mithril.MithrilPromise<any> => {
        var url = `https://api.parse.com/1/functions/${name}`;
        return m.request({
            method: 'POST',
            url: url,
            config: ParseConfig,
            data: values,
        }).then(function (data:any) {
            return data.result;
        }, logoutFunction);
    },

    create: (name:string, values:any):_mithril.MithrilPromise<any> => {
        var url = `https://api.parse.com/1/classes/${name}`;
        return m.request({
            method: 'POST',
            url: url,
            config: ParseConfig,
            data: values,
        }).then(function (data:any) {
            return data.result;
        }, logoutFunction);
    },

    logout: () => {
        ParseUtil.token(null);
        m.route('/login');
    },

    query: (name:string, query:any):_mithril.MithrilPromise<any> => {
        var url = `https://api.parse.com/1/classes/${name}`;
        return m.request({
            method: 'GET',
            url: url,
            config: ParseConfig,
            data: {
                where: JSON.stringify(query)
            },
        }).then(function (data) {
            return data;
        }, logoutFunction);
    },

    getData: (name:string, id:string):_mithril.MithrilPromise<any> => {
        var url = `https://api.parse.com/1/classes/${name}/${id}`;
        return m.request({
            method: 'GET',
            url: url,
            config: ParseConfig

        }).then(function (data) {
            return data;
        }, logoutFunction);
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