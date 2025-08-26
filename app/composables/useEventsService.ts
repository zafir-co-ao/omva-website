import { type Either, left, right } from "~/types/antbox";
import { ApiError } from "~/types/apiError";

export default function () {
    const { antboxClient } = useAntboxService();
    const GET_EVENTS_URL_CAUSE = "EventsService:getEventsURL";

    const getEventURL = async (
        reference: string,
    ): Promise<Either<ApiError, URL>> => {
        try {
            const ref = reference.replace(".", "-");
            const response = await antboxClient.query(
                [["fid", "==", ref]],
                1,
                1,
            );
            if (response.isLeft()) {
                return left(
                    new ApiError(GET_EVENTS_URL_CAUSE, response.value),
                );
            }

            const nodes = response.value.nodes;
            if (!nodes.length) {
                return left(
                    new ApiError(
                        GET_EVENTS_URL_CAUSE,
                        `No event found for reference: ${reference}`,
                    ),
                );
            }

            const eventsUrl = antboxClient.getNodeUrl(
                nodes[0]?.uuid as string,
            );
            return right(new URL(eventsUrl));
        } catch (error) {
            return left(
                new ApiError(
                    GET_EVENTS_URL_CAUSE,
                    (error as Error).message,
                ),
            );
        }
    };

    return { getEventURL };
}
