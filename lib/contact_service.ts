import { Either, left, right } from "./either";
import { EmailValue } from "./email";
import { NameValue } from "./name_value";
import { Sender } from "./sender";

export class ContactService {
    readonly #sender: Sender;

    constructor(sender: Sender) {
        this.#sender = sender;
    }

    async send(
        name: string,
        email: string,
        message: string,
    ): Promise<Either<Error, string>> {
        const nameOrErr = NameValue.from(name);
        if (nameOrErr.isLeft()) {
            return left(nameOrErr.value);
        }

        const emailOrErr = EmailValue.fromString(email);
        if (emailOrErr.isLeft()) {
            return left(emailOrErr.value);
        }

        if (!message.trim().length) {
            return left(new Error("A mensagem é obrigatória"));
        }

        const result = await this.#sender.send(name, email, message);
        if (result.isLeft()) {
            return left(result.value);
        }

        return right("Dados enviados com sucesso");
    }
}
