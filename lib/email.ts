import { Either, left, right } from "./either";
import { InvalidEmailFormatError } from "./invalid_email_format_error";

export class EmailValue {
    readonly #value: string;

    private constructor(email: string) {
        this.#value = email;
    }

    static fromString(
        email: string,
    ): Either<InvalidEmailFormatError, EmailValue> {
        const emailRegex =
            /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

        if (!email.trim().match(emailRegex)) {
            return left(new InvalidEmailFormatError("EmailValue", email));
        }

        return right(new EmailValue(email));
    }

    get value(): string {
        return this.#value;
    }
}
