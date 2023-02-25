import { types } from "store/actionTypes";

const setLive = (data) => {
    return {
        type: types.SET_LIVE,
        payload: data
    };
};

export { setLive };
