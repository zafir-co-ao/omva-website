import { GmailSender } from "../../server/contact-service/gmail_sender";

export const useGmailSender = () => {
    const config = useRuntimeConfig();

    const gmailClientId = config.public.gmailClientId as string;
    const gmailClientSecret = config.public.gmailClientSecret as string;
    const refreshToken = config.public.gmailRefreshToken as string;

    return new GmailSender(gmailClientId, gmailClientSecret, refreshToken);
};
