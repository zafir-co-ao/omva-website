export class ApiError extends Error {
    constructor(cause: string, message: string) {
        super(message);
        this.cause = cause;
        this.name = "ApiError";
    }
}
