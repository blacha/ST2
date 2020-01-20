import { PheStatic } from '../../phe';
import { ClientLibStatic } from '..';
import { CommandIgmGetMsg } from '../commands';

declare const phe: PheStatic;
declare const ClientLib: ClientLibStatic;

const instance = ClientLib.Net.CommunicationManager.GetInstance();
instance.SendSimpleCommand<CommandIgmGetMsg>(
    'IGMGetMsg',
    { mailId: 20 },
    phe.cnc.Util.createEventDelegate<CommandIgmGetMsg>(ClientLib.Net.CommandResult, null, (ctx, data) => {
        console.log(ctx, data.f, data.m, data.s);
    }),
);

ClientLib.Net.CommunicationManager.GetInstance().SendSimpleCommand(
    'GetServerInfo',
    {},
    phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, null, (ctx, data) => {
        console.log(ctx, data);
    }),
);
