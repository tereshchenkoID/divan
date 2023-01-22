import { types } from "store/actionTypes";

import {useRequest} from "hooks/useRequest";

export const loadLeagueData = (id, category) => async dispatch => {
    const { get } = useRequest();

    try {
        const data = await get(`config_tree_mini/41/0/${id}/${category}`)

        dispatch({
            type: types.SET_LEAGUE,
            payload: data.doc[0].data[0].realcategories[0].uniquetournaments,
        })
    } catch (e) {
        console.log(e)
    }
};
