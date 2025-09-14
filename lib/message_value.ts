import { Either, left, right } from "./either";

export class MessageValue {
    readonly #message: string;

    private constructor(message: string) {
        this.#message = message;
    }

    static from(message: string): Either<Error, MessageValue> {
        if (!message.trim().length) {
            return left(new Error("A mensagem é obrigatória"));
        }

        if (message.trim().length > 250) {
            return left(
                new Error("A mensagem deve ter no máximo 250 caracteres"),
            );
        }

        return right(new MessageValue(message));
    }

    get message() {
        return this.#message;
    }
}
