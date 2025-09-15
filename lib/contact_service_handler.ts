export class ContactServiceHandler {
    async send(name: string, email: string, message: string) {
        return await $fetch("/api/contact", {
            method: "post",
            body: { name, email, message },
        });
    }
}
