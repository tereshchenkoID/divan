import { types } from "store/actionTypes";

import { useRequest } from "hooks/useRequest";

export const loadSportData = () => async dispatch => {
    const { get } = useRequest();

    try {
        const data = await get('config_sports/41/0')

        dispatch({
            type: types.SET_SPORT,
            payload: data.doc[0].data,
        })
    } catch (e) {
        console.log(e)
    }
};
