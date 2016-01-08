import * as BotLogin from './bot.login';
import {ParseCLIUtil} from "./db/parse";
import {Log} from "../lib/log/log";
import {ConsoleLogStream} from "../lib/log/stream";
import {CNCClient} from './cnc/cnc';
import {VerifyTask} from './tasks/verify';

var $log = Log.getInstance().child({
    name: 'ST:Bot'
});
$log.addStream(new ConsoleLogStream());

$log.debug('Starting Bot');

//ParseCLIUtil.getAll('Verify', $log).then(function(data) {
//    console.log('botData', data);
//
//    var CNC =
//}, console.log.bind(console));
//
//var cnc = new CNCClient('w327@c.ac.nz', 'W327-rva9bts');
//
//
//cnc.sendMail('shockrnz', 'This is a test message', makeVerificationMessage, $log).then(function() {
//    console.log('done', arguments);
//}, function(e) {
//    console.log('nope', e)
//});
//
//
//
////cnc.getAllianceInfo(150, $log).then(function() {
////    console.log('done', arguments);
////}).catch(function(e) {
////    console.log('nope', e)
////});
//
//
//function
//
//
//
//
//
//
//var AllianceTask = {
//    run(world:number, cnc:CNCClient) {
//
//    }
//};

var task = new VerifyTask(327, null);
task.run($log);