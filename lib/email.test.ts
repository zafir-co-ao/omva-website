import { describe, expect, it } from "vitest";
import { EmailValue } from "./email";

describe("EmailValue", () => {
    it("O email deve ser válido", () => {
        const emailOrErr = EmailValue.fromString("johndoe@example.com");
        expect(emailOrErr.isRight());
        if (emailOrErr.isRight()) {
            expect(emailOrErr.value.value).toBe("johndoe@example.com");
        }
    });
});
