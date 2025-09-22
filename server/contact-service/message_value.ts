import { type Either, left, right } from "./either";
import { InvalidMessageError } from "./invalid_message_error";

export class MessageValue {
    readonly #message: string;

    private constructor(message: string) {
        this.#message = message;
    }

    static from(message: string): Either<Error, MessageValue> {
        if (!message || message.length > 250) {
            return left(
                new InvalidMessageError("MessageValue"),
            );
        }

        return right(new MessageValue(message));
    }

    get message() {
        return this.#message;
    }
}
