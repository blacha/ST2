/* eslint-disable @typescript-eslint/camelcase */
export interface ClientLibTime {
    GetServerStep(): number;

    /** Date.now() as a string */
    GetData(): string;

    get_StepTime(): number;
    get_Diff(): number;
    get_ServerOffset(): number;
}
