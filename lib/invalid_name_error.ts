export class InvalidNameError extends Error {
    constructor(cause: string) {
        super(
            `${cause}: O nome é obrigatório e deve ter pelo menos 3 caracteres`,
        );
        this.name = "InvalidNameError";
        this.cause = cause;
    }
}
