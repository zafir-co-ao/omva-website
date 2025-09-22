import { describe, expect, it } from "vitest";
import { NameValue } from "./name_value";
import { InvalidNameError } from "./invalid_name_error";

describe("NameValue", () => {
    it("Deve criar um nome válido", () => {
        const nameOrError = NameValue.from("John Doe");
        expect(nameOrError.isRight()).toBe(true);
        if (nameOrError.isRight()) {
            expect(nameOrError.value.value).toBe("John Doe");
        }
    });

    it("Deve retornar erro se o nome for inválido", () => {
        const invalidNames = [
            "",
            "Ds",
            "James",
        ];

        invalidNames.forEach((name) => {
            const nameOrError = NameValue.from(name);
            expect(nameOrError.isLeft()).toBeTruthy();
            expect(nameOrError.value).toBeInstanceOf(InvalidNameError);
        });
    });
});
