import { describe, expect, it } from "vitest";
import { EmailValue } from "./email_value";
import { InvalidEmailFormatError } from "./invalid_email_format_error";

describe("EmailValue", () => {
    it("Deve criar um email válido", () => {
        const emailOrErr = EmailValue.from("johndoe@example.com");
        expect(emailOrErr.isRight());
        if (emailOrErr.isRight()) {
            expect(emailOrErr.value.value).toBe("johndoe@example.com");
        }
    });

    it("Deve retornar erro se o email for inválido", () => {
        const invalidEmails = [
            "",
            "john.doe.example.com",
            "/kuivior@hoot.com",
            "invalidEmail",
            "@ladytrubin.co",
        ];

        invalidEmails.forEach((email) => {
            const emailOrErr = EmailValue.from(email);
            expect(emailOrErr.isLeft()).toBeTruthy();
            expect(emailOrErr.value).toBeInstanceOf(InvalidEmailFormatError);
        });
    });
});
