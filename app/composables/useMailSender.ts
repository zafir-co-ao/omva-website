import { MailSender } from "../../server/contact-service/mail_sender";

export const useMailSender = () => {
    const smtpHost = process.env.SMTP_HOST as string;
    const smtpPort = process.env.SMTP_PORT as unknown as number;
    const smtpUser = process.env.SMTP_USER as string;
    const smtpPass = process.env.SMTP_PASS as string;

    return new MailSender({
        smtpHost,
        smtpPort,
        smtpUser,
        smtpPassword: smtpPass,
    });
};
