export interface StModule {
    start(): Promise<void>;
    stop(): Promise<void>;
}
