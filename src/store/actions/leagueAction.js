import { SET_LEAGUE } from "../actionTypes";

const setLeague = (data) => {
    return {
        type: SET_LEAGUE,
        payload: data
    };
};

export { setLeague };
