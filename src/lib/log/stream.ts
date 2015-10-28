import {LogMessage} from './message';

export interface LogStream {
    setLevel:(level:number) => void;
    write:(message:LogMessage) => void;
}


export class ConsoleLogStream implements LogStream {

    constructor(private level:number) {
    }

    setLevel(level:number) {
        this.level = level;
    }

    write(message:LogMessage) {
        if (message.level < this.level) {
            return;
        }
        console.log(JSON.stringify(message));
    }

}
