/// <reference path="../../typings/node/node.d.ts" />

import {ParseCLIUtil} from "./db/parse";
import {Log} from "../lib/log/log";
import {ConsoleLogStream} from "../lib/log/stream";
import {CNCClient} from './cnc/cnc';
import {VerifyTask} from './tasks/verify';
import {AllianceDataTask} from './tasks/alliance';
import {promiseSeries} from "../extension/util/promise";


var $log = Log.getInstance().child({
    name: 'ST:Bot'
});
$log.addStream(new ConsoleLogStream(Log.DEBUG));

ParseCLIUtil.getAll('BotData', null, $log).then(function(bots) {
    $log.info(`Found #${bots.length} bots`);

    return bots.map(function(bot) {
        return new CNCClient(bot.get('user'), bot.get('pass'), bot.get('world'));
    });
}).then(function(clients) {
    function runTask(task) {
        return task.run($log);
    }

    function runTasks(client) {
        var tasks = [
            new VerifyTask(client),
            //new AllianceDataTask(client)
        ];

        $log.info({
            world: client.getWorld(),
            tasks: tasks.length
        }, 'Start bot');

        return promiseSeries(tasks, runTask);
    }

    return promiseSeries(clients, runTasks)
}).then(function() {
    $log.info('Tasks done!');
})
