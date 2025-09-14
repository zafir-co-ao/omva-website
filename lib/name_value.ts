import { Either, left, right } from "./either";
import { InvalidNameError } from "./invalid_name_error";

export class NameValue {
    readonly #value: string;

    private constructor(name: string) {
        this.#value = name;
    }

    static from(name: string): Either<InvalidNameError, NameValue> {
        if (!name.trim().length || name.trim().length < 3) {
            return left(new InvalidNameError("NameValue"));
        }

        return right(new NameValue(name));
    }

    get value(): string {
        return this.#value;
    }
}
