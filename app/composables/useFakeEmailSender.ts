import { FakeEmailSender } from "../../server/contact-service/fake_email_sender";

export const useFakeEmailSender = () => new FakeEmailSender();
