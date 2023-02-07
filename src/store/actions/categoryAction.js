import {types} from "store/actionTypes";

import {useRequest} from "hooks/useRequest";

export const loadCategoryData = (id) => async dispatch => {
    const { get } = useRequest();

    try {
        const data = await get(`config_tree_mini/41/0/${id}`)

        dispatch({
            type: types.SET_CATEGORY,
            payload: data.doc[0].data[0],
        })
    } catch (e) {
        console.log(e)
    }
};
