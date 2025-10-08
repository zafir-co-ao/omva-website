export class ContactServiceHandler {
    async sendMail(name: string, email: string, message: string) {
        return await $fetch("/api/contact", {
            method: "POST",
            body: { name, email, message },
        });
    }
}
