import { Either, left, right } from "./either";
import { EmailValue } from "./email_value";
import { NameValue } from "./name_value";
import { Sender } from "./sender";

const INTERNAL_EMAIL = "geral@omvangola.co.ao";

export class ContactService {
    readonly #sender: Sender;

    constructor(sender: Sender) {
        this.#sender = sender;
    }

    async send(
        name: string,
        email: string,
        message: string,
    ): Promise<Either<Error, void>> {
        const nameOrErr = NameValue.from(name);
        if (nameOrErr.isLeft()) {
            return left(nameOrErr.value);
        }

        const emailOrErr = EmailValue.from(email);
        if (emailOrErr.isLeft()) {
            return left(emailOrErr.value);
        }

        if (!message.trim().length) {
            return left(new Error("A mensagem é obrigatória"));
        }

        const result = await this.#sender.send({
            from: {
                email,
                name,
            },
            body: message,
            to: INTERNAL_EMAIL,
        });
        if (result.isLeft()) {
            return left(result.value);
        }

        return right(undefined);
    }
}
