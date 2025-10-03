import type { Sender, SenderRequest } from "./sender";
import { gmail_v1, google } from "googleapis";
import { readFileSync } from "fs";

const SCOPES = ["https://www.googleapis.com/auth/gmail.send"];

export class GmailSender implements Sender {
  #credentialsFilePath: string;
  #accessToken: string;
  #refreshToken: string;

  constructor(
    credentialsFilePath: string,
    accessToken: string,
    refreshToken: string,
  ) {
    if (!credentialsFilePath) {
      throw new Error("CREDENTIALS_FILE_PATH is not defined.");
    }

    if (!accessToken) {
      throw new Error("ACCESS_TOKEN is not defined.");
    }

    if (!refreshToken) {
      throw new Error("REFRESH_TOKEN is not defined.");
    }

    this.#credentialsFilePath = credentialsFilePath;
    this.#accessToken = accessToken;
    this.#refreshToken = refreshToken;
  }

  async send(
    data: SenderRequest,
  ): Promise<void> {
    const gmail = await this.#authorize();
    const { to, body, from } = data;

    const emailLines = [
      `Content-Type: text/html; charset="UTF-8"`,
      `MIME-Version: 1.0`,
      `Content-Transfer-Encoding: 7bit`,
      `To: ${to}`,
      `From: ${from.name} <${from.email}>`,
      `Reply-To: "${from.name}" <${from.email}>`,
      "Subject: OMVA - Questao ou Comentario",
      "",
      this.#emailBody(from.name, from.email, body),
    ];

    const email = emailLines.join("\r\n");
    const encodedMessage = Buffer.from(email)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    try {
      await gmail.users.messages.send({
        userId: "me",
        requestBody: {
          raw: encodedMessage,
        },
      });

      return Promise.resolve(undefined);
    } catch (error) {
      console.error("Error sending email via Gmail API:", error);
      throw new Error("Failed to send email via Gmail API.");
    }
  }

  async #authorize(): Promise<gmail_v1.Gmail> {
    try {
      const json = JSON.parse(
        readFileSync(this.#credentialsFilePath, "utf-8"),
      );
      const { client_id, client_secret, redirect_uris } = json.installed;

      const oAuth2Client = new google.auth.OAuth2({
        clientId: client_id,
        clientSecret: client_secret,
        redirectUri: redirect_uris[0],
      });

      if (!process.env.REFRESH_TOKEN) {
        throw new Error("REFRESH_TOKEN is not defined.");
      }

      oAuth2Client.setCredentials({
        access_token: this.#accessToken,
        refresh_token: this.#refreshToken,
        scope: SCOPES.join(" "),
      });

      const gmail = google.gmail({ version: "v1", auth: oAuth2Client });
      return gmail;
    } catch (error: any) {
      throw new Error(`Failed to authorize Gmail API: ${error.message}`);
    }
  }

  #emailBody(name: string, email: string, message: string): string {
    return `
        <html>
          <head>
            <title>OMVA - Questões ou Comentários</title>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #f9f9f9;
                padding: 20px;
              }
              .container {
                max-width: 600px;
                margin: auto;
                border: 1px solid #ddd;
                padding: 20px;
              }
              h2 {
                color: #2c3e50;
                margin-bottom: 20px;
                text-align: center;
              }
              p {
                font-size: 15px;
                color: #333;
                line-height: 1.5;
              }
              .info {
                background: #f1f1f1;
                padding: 10px;
                border-radius: 5px;
                margin-bottom: 15px;
              }
              .label {
                font-weight: bold;
                color: #555;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h2>OMVA - Ordem dos Médicos Veterinários de Angola</h2>
      
              <div class="info">
                <p><span class="label">Nome:</span> ${name}</p>
                <p><span class="label">Email:</span> ${email}</p>
              </div>
      
              <p><span class="label">Questão / Comentário:</span></p>
              <p>${message}</p>
            </div>
          </body>
        </html>
        `;
  }
}
