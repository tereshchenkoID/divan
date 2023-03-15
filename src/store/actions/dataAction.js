import {useRequest} from "hooks/useRequest";
import {setDelta} from "./deltaAction";

import { types } from "store/actionTypes";

export const setData = (id) => async dispatch => {
    const { get } = useRequest('feed');

    try {
        const data = await get(`/FOOTBALL_LEAGUE/${id}`)

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
