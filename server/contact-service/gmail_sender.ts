import { type Either, left, right } from "./either";
import type { Sender, SenderRequest } from "./sender";
import { EmailSendError } from "./email_send_error";
import { google } from "googleapis";

export class GmailSender implements Sender {
    readonly #oAuth2Client: any;

    constructor(
        readonly clientId: string,
        readonly clientSecret: string,
        readonly refreshToken: string,
    ) {
        if (!clientId) {
            throw new Error("GmailSender: clientId is required");
        }

        if (!clientSecret) {
            throw new Error("GmailSender: cleintSecret is required");
        }

        if (!refreshToken) {
            throw new Error("GmailSender: refreshToken is required");
        }

        this.#oAuth2Client = new google.auth.OAuth2(
            clientId,
            clientSecret,
        );

        this.#oAuth2Client.setCredentials({
            refresh_token: refreshToken,
        });
    }

    async send(
        data: SenderRequest,
    ): Promise<Either<EmailSendError, void>> {
        try {
            const gmail = google.gmail({
                version: "v1",
                auth: this.#oAuth2Client,
            });

            console.log("Sending email via Gmail API...");

            const raw = [
                `From: ${data.from.name} <${data.from.email}>`,
                `To: ${data.to}`,
                "Content-Type: text/html; charset=utf-8",
                "MIME-Version: 1.0",
                `Subject: Questões ou comentários de ${data.from.name}`,
                "",
                data.body,
            ].join("\n");

            const encodedMessage = Buffer.from(raw)
                .toString("base64")
                .replace(/\+/g, "-")
                .replace(/\//g, "_")
                .replace(/=+$/, "");

            await gmail.users.messages.send({
                userId: "me",
                requestBody: {
                    raw: encodedMessage,
                },
            });

            return right(undefined);
        } catch (error) {
            console.error("Error sending email via Gmail API:", error);
            return left(new EmailSendError("GmailSender"));
        }
    }
}
