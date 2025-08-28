import { type Either, left, right } from "~/types/antbox";
import { ApiError } from "~/types/apiError";

export default function () {
    const { antboxClient } = useAntboxService();
    const GET_GOVERNING_BODY_URL_CAUSE =
        "GoverningBodyService:getGoverningBodyURL";

    const getGoverningBodyURL = async (
        reference: string,
    ): Promise<Either<ApiError, URL>> => {
        try {
            const response = await antboxClient.query(
                [["fid", "==", reference]],
                1,
                1,
            );
            if (response.isLeft()) {
                return left(
                    new ApiError(GET_GOVERNING_BODY_URL_CAUSE, response.value),
                );
            }

            const nodes = response.value.nodes;
            if (!nodes.length) {
                return left(
                    new ApiError(
                        GET_GOVERNING_BODY_URL_CAUSE,
                        `No member of governing body found for reference: ${reference}`,
                    ),
                );
            }

            const governingBodyUrl = antboxClient.getNodeUrl(
                nodes[0]?.uuid as string,
            );
            return right(new URL(governingBodyUrl));
        } catch (error) {
            return left(
                new ApiError(
                    GET_GOVERNING_BODY_URL_CAUSE,
                    (error as Error).message,
                ),
            );
        }
    };

    return { getGoverningBodyURL };
}
