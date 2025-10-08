import type { Sender, SenderRequest } from "./sender";
import { createTransport } from "nodemailer";

export class MailSender implements Sender {
  readonly #smtpHost: string;
  readonly #smtpPort: number;
  readonly #smtpUser: string;
  readonly #smtpPassword: string;

  constructor(
    data: {
      smtpHost: string;
      smtpPort: number;
      smtpUser: string;
      smtpPassword: string;
    },
  ) {
    if (!data.smtpHost) {
      throw new Error("SMTP Host not defined");
    }

    if (!data.smtpPort) {
      throw new Error("SMTP Port not defined");
    }

    if (!data.smtpUser) {
      throw new Error("SMTP User not defined");
    }

    if (!data.smtpPassword) {
      throw new Error("SMTP Password not defined");
    }

    this.#smtpHost = data.smtpHost;
    this.#smtpPort = data.smtpPort;
    this.#smtpUser = data.smtpUser;
    this.#smtpPassword = data.smtpPassword;
  }

  async send(data: SenderRequest): Promise<void> {
    const transporter = createTransport({
      host: this.#smtpHost,
      port: this.#smtpPort,
      secure: true,
      auth: {
        user: this.#smtpUser,
        pass: this.#smtpPassword,
      },
    });

    const { body, from, to } = data;

    try {
      await transporter.sendMail({
        from: `"${from.name}" <${from.email}>`,
        to: to,
        subject: "OMVA Website - Questão ou Comentário",
        html: this.#emailBody(from.name, from.email, body),
      });

      return Promise.resolve();
    } catch (err) {
      console.error("Error failed to send mail", err);
      throw new Error("Error Failed to send mail");
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
