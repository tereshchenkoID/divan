import {useRequest} from "hooks/useRequest";
import {setDelta} from "store/actions/deltaAction";

import { types } from "../actionTypes";

export const setHistory = (url) => async dispatch => {
    const { get } = useRequest('viewer/leaguetable');

    try {
        const data = await get(url)
        
        dispatch(setDelta(data.timer))
        dispatch({
            type: types.SET_LIVE_HISTORY,
            payload: data,
        })

        return data
    }
    catch (e) {
        console.log(e)
    }
};
