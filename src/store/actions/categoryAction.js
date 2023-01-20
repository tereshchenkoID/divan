import { SET_SPORT } from "../actionTypes";

const setSport = (data) => {
    return {
        type: SET_SPORT,
        payload: data
    };
};

export { setSport };
