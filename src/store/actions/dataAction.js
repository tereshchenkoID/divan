import {useRequest} from "hooks/useRequest";

import { types } from "store/actionTypes";

export const setData = (id) => async dispatch => {
    const { get } = useRequest();

    try {
        const data = await get(`/client/getFeed/football/?leagueId=${id}`)
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
