/// <reference path="../../../typings/mithril/mithril.d.ts" />
import {ParseConfig} from '../../parse.config';
import {Log} from '../../lib/log/log';

function logoutFunction(err) {
    console.log('http:error', err);
    if (m.route() === '/login') {
        return;
    }
    ParseWebUtil.logout();
    return err;
}

var TOKEN_KEY = 'token';

export var ParseWebUtil = {
    URL: {
        LOGIN: 'https://api.parse.com/1/login'
    },

    token: m.prop(localStorage.getItem(TOKEN_KEY)),

    login: (user:string, pass:string, $log:Log):_mithril.MithrilPromise<any> => {
        $log.info({
            username: user
        }, 'Login');
        return m.request({
            method: 'POST',
            url: ParseWebUtil.URL.LOGIN,
            data: {
                username: user.toLowerCase(),
                password: pass,
                _method: 'GET',
                _ApplicationId: ParseConfig.APP,
                _JavaScriptKey: ParseConfig.JS
            }
        }).then(function (data:any) {
            ParseWebUtil.token(data.sessionToken);
            localStorage.setItem(TOKEN_KEY, data.sessionToken);
        });
    },

    func: (name:string, values:any, $log:Log):_mithril.MithrilPromise<any> => {
        var url = `https://api.parse.com/1/functions/${name}`;
        $log.debug({
            name: name,
            attrs: values
        }, 'Run parse function');

        return m.request({
            method: 'POST',
            url: url,
            config: ParseConfigFunc,
            data: values,
        }).then(function (data:any) {
            return data.result;
        });
    },

    create: (name:string, values:any):_mithril.MithrilPromise<any> => {
        var url = `https://api.parse.com/1/classes/${name}`;
        return m.request({
            method: 'GET',
            url: url,
            config: ParseConfigFunc,
            data: values,
        }).then(function (data:any) {
            return data.result;
        }, logoutFunction);
    },

    logout: () => {
        localStorage.removeItem(TOKEN_KEY);
        ParseWebUtil.token(null);
        console.log('logout-token', ParseWebUtil.token());
        m.route('/login');
    },

    query: (name:string, query:any, $log:Log):_mithril.MithrilPromise<any> => {
        $log.debug({
            name: name,
            attrs: query
        }, 'Run query');

        var url = `https://api.parse.com/1/classes/${name}`;
        return m.request({
            method: 'GET',
            url: url,
            config: ParseConfigFunc,
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
            config: ParseConfigFunc
        }).then(function (data) {
            return data;
        }, logoutFunction);
    }
};

function ParseConfigFunc(http, opts) {
    http.setRequestHeader('X-Parse-Application-Id', ParseConfig.APP);
    http.setRequestHeader('X-Parse-REST-API-Key', ParseConfig.REST);
    if (ParseWebUtil.token()) {
        http.setRequestHeader('X-Parse-Session-Token', ParseWebUtil.token());
    }
    return http;
}