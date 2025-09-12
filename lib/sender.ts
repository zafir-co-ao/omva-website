import { Either } from "./either";
import { EmailSendError } from "./email_send_error";

export interface Sender {
    send(
        name: string,
        email: string,
        message: string,
    ): Promise<Either<EmailSendError, void>>;
}
