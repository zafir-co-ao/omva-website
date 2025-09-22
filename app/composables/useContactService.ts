import { ContactService } from "~~/server/contact-service/contact_service";
import { useGmailSender } from "./useGmailSender";
const gmailSender = useGmailSender();
// const fakeSender = useFakeEmailSender();

export const useContactService = () => new ContactService(gmailSender);
