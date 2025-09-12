import { describe, expect, it } from "vitest";
import { NameValue } from "./name_value";

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
        ];

        invalidNames.forEach((name) => {
            const nameOrError = NameValue.from(name);
            expect(nameOrError.isLeft()).toBeTruthy();
            expect((nameOrError.value as Error).message).toBe(
                "O nome é obrigatório e deve ter pelo menos 3 caracteres",
            );
        });
    });
});
