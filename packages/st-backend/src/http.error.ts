export class HttpError extends Error {
    code: number;
    context?: Record<string, any>;
    constructor(code: number, message: string, context?: Record<string, any>) {
        super(message);
        this.code = code;
        this.context = context;
    }
}
