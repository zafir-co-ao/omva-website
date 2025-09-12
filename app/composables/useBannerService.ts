import { type Either, left, right } from "~/types/antbox";
import useAntboxService from "./useAntboxService";
import { ApiError } from "~/types/apiError";

export default function () {
    const { antboxClient } = useAntboxService();
    const GET_BANNER_CAUSE = "BannerService:getBanner";

    const getBanner = async (
        page: string,
    ): Promise<Either<ApiError, URL>> => {
        try {
            const response = await antboxClient.query(
                [
                    ["properties.banner-image:page", "==", page],
                ],
                1,
                1,
            );

            if (response.isLeft()) {
                return left(
                    new ApiError(GET_BANNER_CAUSE, response.value),
                );
            }

            const banners = response.value.nodes;

            if (!banners.length) {
                return left(
                    new ApiError(
                        GET_BANNER_CAUSE,
                        `No banner found for page: ${page}`,
                    ),
                );
            }

            const bannerUrl = antboxClient.getNodeUrl(
                banners[0]?.uuid as string,
            );
            return right(new URL(bannerUrl));
        } catch (error) {
            return left(
                new ApiError(
                    GET_BANNER_CAUSE,
                    (error as Error).message,
                ),
            );
        }
    };

    return {
        getBanner,
        getHomeBanner: () => getBanner(BANNERS.HOME),
        getGeneralAssemblyBanner: () => getBanner(BANNERS.GENERAL_ASSEMBLY),
        getCongressBanner: () => getBanner(BANNERS.CONGRESS),
        getRegionalCouncilsBanner: () => getBanner(BANNERS.REGIONAL_COUNCILS),
        getMembershipBanner: () => getBanner(BANNERS.MEMBERSHIP),
        getHistoryBanner: () => getBanner(BANNERS.HISTORY),
        getVeterinaryProfileBanner: () => getBanner(BANNERS.VETERINARY_PROFILE),
    };
}

enum BANNERS {
    HOME = "home",
    HISTORY = "history",
    CONGRESS = "congress",
    MEMBERSHIP = "membership",
    GENERAL_ASSEMBLY = "general-assembly",
    REGIONAL_COUNCILS = "regional-councils",
    VETERINARY_PROFILE = "veterinary-profile",
}
