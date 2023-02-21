import { types } from "store/actionTypes";

const setGame = (data) => {
    return {
        type: types.SET_GAME,
        payload: data
    };
};

export { setGame };
