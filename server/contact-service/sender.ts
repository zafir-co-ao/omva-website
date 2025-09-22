import { type Either } from "./either";
import { EmailSendError } from "./email_send_error";

export interface Sender {
    send(
        data: SenderRequest,
    ): Promise<Either<EmailSendError, void>>;
}

export interface SenderRequest {
    from: {
        name: string;
        email: string;
    };
    to: string;
    body: string;
}
