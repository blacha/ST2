import {CNCClient} from "../cnc/cnc";
import {Log} from "../../lib/log/log";

export interface CNCTask {
    run:(cnc:CNCClient, $log:Log) => any;
    getName:() => string;
}

export class TaskManager {
    private client: CNCClient;
    private log: Log;
    private defer;
    private queue;
    private taskNames: string[];

    constructor(client: CNCClient, $log:Log) {
        this.client = client;
        this.log = $log;

        this.defer = Promise.defer();
        this.queue = this.defer.promise;
        this.taskNames = [];
    }

    addTask(task:CNCTask) {
        this.queue = this.queue.then(() => {
            return task.run(this.client, this.log);
        });
        this.taskNames.push(task.getName());
    }

    getClient() {
        return this.client;
    }

    getTasks() {
        return this.taskNames;
    }

    run() {
        this.defer.resolve();
        return this.queue;
    }
}