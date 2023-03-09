import {useLocalStorage} from "helpers/localStorage";

import { types } from "store/actionTypes";

// eslint-disable-next-line react-hooks/rules-of-hooks
const {getLocalStorage} = useLocalStorage()

const initialState = {
    setting:
        JSON.parse(getLocalStorage('setting')) ||
        {
            'show': false,
            'printing-mode': 1,
            'stake-mode': 1,
        }
};

const settingReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_SETTING:
            return {
                ...state
            };
        case types.SET_SETTING:
            return {
                ...state,
                setting: action.payload
            };
        default:
            return state;
    }
};

export default settingReducer;
