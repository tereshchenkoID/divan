import {useRequest} from "hooks/useRequest";
import {setDelta} from "./deltaAction";

import { types } from "store/actionTypes";

const setUpdate = (id) => async dispatch => {
    const { get } = useRequest();

    try {
        const data = await get(`/client/getFeed/football/?eventId=${id}`)
        dispatch(setDelta(data.timer))

        dispatch({
            type: types.SET_UPDATE,
            payload: data,
        })

        return data
    }
    catch (e) {
        console.log(e)
    }
};

export { setUpdate };
