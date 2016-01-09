declare var Promise:any;
var r = require('request');
var axios = require('axios');
import {Log} from "../../lib/log/log";



export class CNCClient {
    static USER_AGENT = 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.114 Safari/537.36';
    static URL = {
        LOGIN: 'https://www.tiberiumalliances.com/j_security_check',
        AUTH: 'https://www.tiberiumalliances.com/login/auth',
        LAUNCH: 'https://www.tiberiumalliances.com/game/launch',
        AJAX: '/Presentation/Service.svc/ajaxEndpoint/'
    };

    private username;
    private password;
    private cookie;

    private worldURL:string;
    private session:string;
    private key:string;

    private world:number;

    constructor(username:string, password:string, world:number) {
        this.username = username;
        this.password = password;
        this.world = world;

        this.cookie = r.jar();
    }

    getWorld() {
        return this.world;
    }


    public connect($log) {
        var log = $log.child({
            module: 'CNC',
            username: this.username,
            action: 'connect'
        });

        if (this.session != null && this.key != null && this.worldURL != null) {
            return Promise.accept();
        }

        return this._connect(log).then(() => {
            return this._launch(log);
        }).then(() => {
            return this._openSession(log);
        }).then(() => {
            log.info({
                key: this.key,
                session: this.session,
            }, 'Connection made');
        });
    }

    private _connect($log:Log) {
        var defer = Promise.defer();

        $log.info('Login');

        var loginFields = {
            'spring-security-redirect': '',
            id: '',
            timezone: '13',
            j_username: this.username,
            j_password: this.password,
            _web_remember_me: ''
        };

        r.post({
            strictSSL: false,
            url: CNCClient.URL.LOGIN,
            form: loginFields,
            headers: {
                'User-Agent': CNCClient.USER_AGENT
            },
            jar: this.cookie,
            followAllRedirects: true
        }, (err, res) => {

            if (err) {
                $log.error(err);
                return defer.reject(err);
            }

            var matches = res.body.match(/loggedInUser: '(.*)'/);

            if (!matches || matches[1] == '') {
                $log.debug('Failed to log in');
                defer.reject(new Error('Could not login!'));
                return;
            }

            $log.debug({match: matches[1]}, 'Logged In!');

            return defer.resolve();
        });

        return defer.promise;

    }


    private _launch($log:Log) {
        var defer = Promise.defer();
        r.get({
            strictSSL: false,
            url: CNCClient.URL.LAUNCH,
            headers: {
                'User-Agent': CNCClient.USER_AGENT,
                'Referer': CNCClient.URL.AUTH
            },
            jar: this.cookie
        }, (err, res) => {
            if (err) {
                $log.error('Unable to launch game world');
                return defer.reject(err);
            }

            var matches;
            var session = /sessionId" value="([^"]+)"/;
            matches = res.body.match(session);

            if (!matches) {
                return defer.reject(new Error('Unable to find sessionID'));
            }

            this.session = matches[1];

            var world = /action="([^"]+)\/index\.aspx"/;
            matches = res.body.match(world);
            if (!matches) {
                return defer.reject(new Error('Unable to find last used world'));
            }

            this.worldURL = matches[1];
            $log.debug({
                session: this.session,
            }, 'World Launched');

            if (session == null || world == null) {
                $log.error({
                    session: this.session,
                    world: this.worldURL
                }, 'Unable to launch game world');
                return defer.reject(new Error('Unable to launch game world'));
            }

            defer.resolve();
        });

        return defer.promise;
    }

    private _openSession($log:Log) {
        var defer = Promise.defer();
        $log.debug({
            session: this.session,
        }, 'Open Session');

        var data = {
            session: this.session,
            reset: true,
            refId: -1,
            version: -1,
            platformId: 1
        };
        var count = 0;

        var getKey = (data) => {
            $log.debug({key: data.i}, 'Get session key');

            this.key = data.i;
            if (this.key != null && this.key !== '00000000-0000-0000-0000-000000000000') {
                return defer.resolve();
            }

            count++;
            if (count === 6) {
                return defer.reject(new Error('unable to get Session key!'));
            }


            setTimeout(() => {
                return this.getData('OpenSession', data, $log).then(getKey);
            }, 500);

        };

        this.getData('OpenSession', data, $log).then(getKey);

        return defer.promise;
    }

    getData(endPoint, args, $log:Log) {

        if (args.session == undefined) {
            args.session = this.key;
        }
        var url = this.worldURL + CNCClient.URL.AJAX + endPoint;

        $log.info(endPoint);

        return axios.post(url, args, {
            headers: {
                'User-Agent': CNCClient.USER_AGENT,
                'Content-Type': 'application/json'
            },
        }).then(function (response) {
            if (response.status !== 200) {
                $log.error('Error fetching data');
            }
            return response.data;
        }).catch(function (response) {
            $log.error('Error fetching data');
        });
    }

    sendMail(username:string, title:string, message:string, $log:Log) {
        var log = $log.child({
            method: 'sendMail',
            to: username
        });

        var messageData = {
            players: username,
            alliances: '',
            subject: title,
            body: `<cnc><cncs>Hello</cncs><cncd>${+new Date()}</cncd><cnct>${message}</cnct></cnc>`
        };

        return this.connect(log).then(() => {
            return this.getData('IGMBulkSendMsg', messageData, log);
        });
    }

    getAllianceInfo(allianceID:number, $log:Log) {
        /*
         GetPublicAllianceInfo
         */
        var log = $log.child({
            method: 'GetPublicAllianceInfo',
            alliance: allianceID
        });

        var requestData = {
            id: allianceID
        };

        return this.connect(log).then(() => {
            return this.getData('GetPublicAllianceInfo', requestData, log);
        })
    }

}