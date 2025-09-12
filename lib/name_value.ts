import { Either, left, right } from "./either";

export class NameValue {
    #name: string;

    private constructor(name: string) {
        this.#name = name;
    }

    static from(name: string): Either<Error, NameValue> {
        if (!name.trim().length || name.trim().length < 3) {
            return left(
                new Error(
                    "O nome é obrigatório e deve ter pelo menos 3 caracteres",
                ),
            );
        }

        return right(new NameValue(name));
    }

    get value(): string {
        return this.#name;
    }
}
