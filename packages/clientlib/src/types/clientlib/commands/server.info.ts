export interface CommandGetServerInfoResponse {
    /** World Height */
    wh: number;
    /** World width */
    ww: number;
    // This is incomplete
}

export interface CommandGetServerInfo {
    command: 'GetServerInfo';
    request: {};
    response: CommandGetServerInfoResponse;
}
