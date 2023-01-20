import { SET_CATEGORY } from "../actionTypes";

const setCategory = (data) => {
    return {
        type: SET_CATEGORY,
        payload: data
    };
};

export { setCategory };
