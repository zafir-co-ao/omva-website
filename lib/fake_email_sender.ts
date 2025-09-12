import { Either, right } from "./either";
import { Sender } from "./sender";
import { EmailSendError } from "./email_send_error";

export class FakeEmailSender implements Sender {
    async send(
        name: string,
        _email: string,
        message: string,
    ): Promise<Either<EmailSendError, void>> {
        console.log(`O ${name} enviou a seguinte mensagem: ${message}`);
        return right(undefined);
    }
}
