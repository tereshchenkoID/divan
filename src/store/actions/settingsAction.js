import {useRequest} from "hooks/useRequest";

import { types } from "store/actionTypes";

export const setSettings = () => async dispatch => {
    const { get } = useRequest();

    try {
        const data = await get('/settings')
        dispatch({
            type: types.SET_SETTINGS,
            payload: data,
        })
    }
    catch (e) {
        console.log(e)
    }
};
