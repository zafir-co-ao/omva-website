import { expect, test } from "vitest";
import { ContactService } from "./contact_service";
import { FakeEmailSender } from "./fake_email_sender";
import { InvalidEmailFormatError } from "./invalid_email_format_error";
import { InvalidNameError } from "./invalid_name_error";

test("ContactService.send - Deve enviar todas as informações de contacto", async () => {
    const sender = new FakeEmailSender();
    const service = new ContactService(sender);

    const result = await service.send(
        "John Doe",
        "johndoe@example.com",
        "Hello, this is a test message.",
    );

    expect(result.isRight()).toBeTruthy();
});

test("ContactService.send - Deve retornar erro se o nome estiver vazio", async () => {
    const sender = new FakeEmailSender();
    const service = new ContactService(sender);

    const result = await service.send("", "john.doe@example.com", "Hello");

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(InvalidNameError);
});

test("ContactService.send - Deve retornar erro se o email estiver vazio", async () => {
    const sender = new FakeEmailSender();
    const service = new ContactService(sender);

    const result = await service.send("John Doe", "", "Hello");

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(
        InvalidEmailFormatError,
    );
});

test("ContactService.send - Deve retornar erro se a mensagem estiver vazia", async () => {
    const sender = new FakeEmailSender();
    const service = new ContactService(sender);

    const result = await service.send("John Doe", "johndoe@example.com", "");

    expect(result.isLeft()).toBe(true);
    expect((result.value as Error).message).toBe("A mensagem é obrigatória");
});
