import { nodeServiceClient } from "~/types/antbox";

export default function () {
    const antboxUrl = useRuntimeConfig().public.antboxUrl as string;
    const antboxTenant = useRuntimeConfig().public.antboxTenant as string;

    if (!antboxUrl) {
        throw new Error("ANTBOX URL is not defined");
    }

    const antboxClient = nodeServiceClient({
        url: antboxUrl,
        tenant: antboxTenant,
    });

    if (!antboxClient) {
        throw new Error("Failed to create Antbox client");
    }

    return { antboxClient };
}
