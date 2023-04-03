import {useRequest} from "hooks/useRequest";
import {setDelta} from "./deltaAction";

import { types } from "store/actionTypes";

export const setData = (el) => async dispatch => {
    const { get } = useRequest('feed');

    try {
        const data = await get(`/${el.type}/${el.id}`)

        dispatch(setDelta(data.timer))
        dispatch({
            type: types.SET_DATA,
            payload: data,
        })

        return data
    }
    catch (e) {
        console.log(e)
    }
};
