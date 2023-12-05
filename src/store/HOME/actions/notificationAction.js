import { types } from "store/actionTypes";

const setNotification = (data) => {
    return {
        type: types.SET_NOTIFICATION,
        payload: data
    };
};

export { setNotification };
