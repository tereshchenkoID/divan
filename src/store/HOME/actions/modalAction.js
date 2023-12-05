import { types } from "store/actionTypes";

const setModal = (data) => {
    return {
        type: types.SET_MODAL,
        payload: data
    };
};

export { setModal };
