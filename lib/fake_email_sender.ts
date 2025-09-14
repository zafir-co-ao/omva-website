import { Either, right } from "./either";
import { Sender, SenderRequest } from "./sender";
import { EmailSendError } from "./email_send_error";

export class FakeEmailSender implements Sender {
    async send(
        data: SenderRequest,
    ): Promise<Either<EmailSendError, void>> {
        console.log(
            `O ${data.from.name} enviou a seguinte mensagem: ${data.body}`,
        );
        return right(undefined);
    }
}
