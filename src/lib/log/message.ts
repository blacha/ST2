export interface LogMessage {
    hostname: string;
    pid?: number;
    level: number;
    time: Date;
    msg: string;
    v: number;
}