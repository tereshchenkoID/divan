import { types } from "store/actionTypes";

import set from "helpers/breadcrumbs";

const setBreadcrumbs = (id, name, idx) => {
    const data = set(id, name, idx)

    return {
        type: types.SET_BREADCRUMBS,
        payload: data
    };
};

export { setBreadcrumbs };
