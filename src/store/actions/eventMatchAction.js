import {types} from "store/actionTypes";

import {useRequest} from "hooks/useRequest";

export const loadEventMatchData = (id) => async dispatch => {
    const { get } = useRequest();

    try {
        const data = await get(`https://matchtracker.live/api/event/${id}`)

        dispatch({
            type: types.SET_EVENT_MATCH,
            payload: data.results[0],
        })
    } catch (e) {
        console.log(e)
    }
};
