import {useLocalStorage} from "helpers/localStorage";

import { types } from "store/actionTypes";

const setSetting = (data) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {setLocalStorage} = useLocalStorage()

    setLocalStorage('setting', JSON.stringify(data))

    return {
        type: types.SET_SETTING,
        payload: data
    };
};

export { setSetting };
