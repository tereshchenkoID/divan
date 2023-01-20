import { SET_BREADCRUMBS } from "../actionTypes";

const setBreadcrumbs = (data) => {
    return {
        type: SET_BREADCRUMBS,
        payload: data
    };
};

export { setBreadcrumbs };
