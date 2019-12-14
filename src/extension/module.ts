export interface StModule {
    name: string;
    start(): Promise<void>;
    stop(): Promise<void>;
}
