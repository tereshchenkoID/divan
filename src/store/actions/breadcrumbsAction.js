import { types } from "store/actionTypes";

const setBreadcrumbs = (data) => {
    return {
        type: types.SET_BREADCRUMBS,
        payload: data
    };
};

export { setBreadcrumbs };
