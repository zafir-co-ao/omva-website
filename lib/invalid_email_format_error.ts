export class InvalidEmailFormatError extends Error {
    constructor(cause: string, email: string) {
        super(`${cause}: O email ${email} é inválido`);
    }
}
