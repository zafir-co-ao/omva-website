import type { Sender, SenderRequest } from "./sender";

export class FakeEmailSender implements Sender {
    async send(data: SenderRequest): Promise<void> {
        console.log(
            `O ${data.from.name} enviou a seguinte mensagem: ${data.body}`,
        );
        return Promise.resolve(undefined);
    }
}
