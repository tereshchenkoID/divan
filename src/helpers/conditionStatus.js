import {matchStatus} from "../constant/config";

export const conditionStatus = (status) => {
    switch (status) {
        case matchStatus.ANNOUNCEMENT:
            return 1
        case matchStatus.PROGRESS:
            return 2
        case matchStatus.RESULTS:
            return 3
        default:
            return 1;
    }
}
