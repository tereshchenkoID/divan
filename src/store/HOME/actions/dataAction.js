import {useRequest} from "hooks/useRequest";

import {setDelta} from "store/actions/deltaAction";

import { types } from "store/actionTypes";

export const setData = (el, value) => async dispatch => {
    const { get } = useRequest('feed');

    try {
        const data = value || await get(`/${el.type}/${el.id}`)

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
