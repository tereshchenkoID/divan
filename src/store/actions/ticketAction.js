import { types } from "store/actionTypes";

export const setTicket = (data) => async dispatch => {
    dispatch({
        type: types.SET_TICKET,
        payload: data,
    })
};
