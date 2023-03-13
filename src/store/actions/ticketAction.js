import {useRequest} from "hooks/useRequest";

import { types } from "store/actionTypes";

export const setTicket = (data) => async dispatch => {
    const { get } = useRequest();

    if (data === 0) {
        dispatch({
            type: types.SET_TICKET,
            payload: {
                data: [],
                toggle: 0
            },
        })
    }
    else {
        try {
            const data = await get('https://365virtual.co/engine/shop/ticket/latest_history?locale=en_US')
            dispatch({
                type: types.SET_TICKET,
                payload: {
                    data: data,
                    toggle: 1
                },
            })
        }
        catch (e) {
            console.log(e)
        }
    }
};
