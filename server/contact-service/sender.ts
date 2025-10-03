export interface Sender {
    send(data: SenderRequest): Promise<void>;
}

export interface SenderRequest {
    from: {
        name: string;
        email: string;
    };
    to: string;
    body: string;
}
