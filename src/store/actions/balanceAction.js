import {useRequest} from "hooks/useRequest";

import { types } from "store/actionTypes";

export const setBalance = () => async dispatch => {
    const { get } = useRequest();

    try {
        const data = await get('client/getFeed/balance/')
        dispatch({
            type: types.SET_BALANCE,
            payload: data,
        })
    }
    catch (e) {
        console.log(e)
    }
};
