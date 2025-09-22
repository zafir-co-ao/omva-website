export class InvalidMessageError extends Error {
    constructor(cause: string) {
        super(
            `${cause}: A mensagem é obrigatória e deve ter no máximo 250 caracteres`,
        );
    }
}
