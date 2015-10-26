/// <reference path="../../../typings/mithril/mithril.d.ts" />
import {ParseConfig} from '../../parse.config';


function logoutFunction(err) {
    console.log('http:error', err);
    if (m.route() === '/login') {
        return;
    }
    ParseUtil.logout();
    return err;
}

var TOKEN_KEY = 'token';

export var ParseUtil = {
    URL: {
        LOGIN: 'https://api.parse.com/1/login'
    },

    token: m.prop(localStorage.getItem(TOKEN_KEY)),

    login: (user:string, pass:string):_mithril.MithrilPromise<any> => {
        return m.request({
            method: 'POST',
            url: ParseUtil.URL.LOGIN,
            data: {
                username: user.toLowerCase(),
                password: pass,
                _method: 'GET',
                _ApplicationId: ParseConfig.APP,
                _JavaScriptKey: ParseConfig.JS
            }
        }).then(function (data:any) {
            ParseUtil.token(data.sessionToken);
            localStorage.setItem(TOKEN_KEY, data.sessionToken);
        });
    },

    func: (name:string, values:any):_mithril.MithrilPromise<any> => {
        var url = `https://api.parse.com/1/functions/${name}`;
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
        localStorage.setItem(TOKEN_KEY, null);
        ParseUtil.token(null);
        m.route('/login');
    },

    query: (name:string, query:any):_mithril.MithrilPromise<any> => {
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
    if (ParseUtil.token()) {
        http.setRequestHeader('X-Parse-Session-Token', ParseUtil.token());
    }
    return http;
}