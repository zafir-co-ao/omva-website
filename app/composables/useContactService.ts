import { ContactService } from "~~/server/contact-service/contact_service";
import { useFakeEmailSender } from "./useFakeEmailSender";

export const useContactService = () => new ContactService(useFakeEmailSender());
