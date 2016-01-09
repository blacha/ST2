/// <reference path="../../typings/node/node.d.ts" />

import {ParseCLIUtil} from "./db/parse";
import {Log} from "../lib/log/log";
import {ConsoleLogStream} from "../lib/log/stream";
import {CNCClient} from './cnc/cnc';
import {VerifyTask} from './tasks/verify';
import {AllianceDataTask} from './tasks/alliance';
import {TaskManager} from './tasks/manager';

var $log = Log.getInstance().child({
    name: 'ST:Bot'
});
$log.addStream(new ConsoleLogStream(Log.DEBUG));


function makeTaskManagers(bots) {
    $log.info(`Found ${bots.length} bots`);

    return bots.map(function (bot) {
        var client = new CNCClient(bot.get('user'), bot.get('pass'), bot.get('world'));
        return new TaskManager(client, $log);
    });
}

function addTasks(managers) {
    managers.forEach((manager:TaskManager) => {
        manager.addTask(VerifyTask);
        //manager.addTask(AllianceDataTask)
    });

    return managers;
}

function runAllTasks(managers) {
    return managers.reduce((prev, current) => {
        return prev.then(() => {
            $log.info({
                world: current.getClient().getWorld(),
                tasks: current.getTasks().length
            }, 'Start bot');

            return current.run();
        });
    }, Promise.resolve());
}


ParseCLIUtil.getAll('BotData', null, $log)
    .then(makeTaskManagers)
    .then(addTasks)
    .then(runAllTasks)

    .then(function () {
        $log.info('Tasks done!');
    }, console.log.bind(console));
