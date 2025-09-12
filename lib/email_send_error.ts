export class EmailSendError extends Error {
    constructor(cause: string) {
        super(`${cause}: Erro ao enviar email`);
        this.name = "EmailSendErrror";
        this.cause = cause;
    }
}
