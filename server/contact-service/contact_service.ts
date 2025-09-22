import { type Either, left, right } from "./either";
import { EmailValue } from "./email_value";
import { NameValue } from "./name_value";
import { type Sender } from "./sender";
import { MessageValue } from "./message_value";

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

        const messageOrErr = MessageValue.from(message);
        if (messageOrErr.isLeft()) {
            return left(messageOrErr.value);
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
