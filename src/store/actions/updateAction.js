import {useRequest} from "hooks/useRequest";

import { types } from "store/actionTypes";

const setUpdate = (id) => async dispatch => {
    const { get } = useRequest('feed');

    try {
        const data = await get(`/EVENT/${id}`)
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
