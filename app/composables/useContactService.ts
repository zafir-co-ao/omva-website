import { ContactService } from "~~/server/contact-service/contact_service";
import { useMailSender } from "~/composables/useMailSender";
import { useFakeEmailSender } from "~/composables/useFakeEmailSender";

const mailSender = useMailSender();
const fakeSender = useFakeEmailSender();

const sender = process.env.NODE_ENV === "development" ? fakeSender : mailSender;

export const useContactService = () => new ContactService(sender);
