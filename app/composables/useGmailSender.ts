import { GmailSender } from "../../server/contact-service/gmail_sender";

export const useGmailSender = () => {
    const accessToken = process.env.ACCESS_TOKEN as string;
    const refreshToken = process.env.REFRESH_TOKEN as string;
    return new GmailSender("./credentials.json", accessToken, refreshToken);
};
