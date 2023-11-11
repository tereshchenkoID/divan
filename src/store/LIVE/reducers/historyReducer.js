import { types } from "../actionTypes";

const initialState = {
    history: {}
};

const historyReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_LIVE_HISTORY:
            return {
                ...state
            };
        case types.SET_LIVE_HISTORY:
            return {
                ...state,
                history: action.payload
            };
        default:
            return state;
    }
};

export default historyReducer;
