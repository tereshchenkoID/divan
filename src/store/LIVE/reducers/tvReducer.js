import { types } from "../actionTypes";

const initialState = {
    tv: {}
};

const tvReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_LIVE_TV:
            return {
                ...state
            };
        case types.SET_LIVE_TV:
            return {
                ...state,
                tv: action.payload
            };
        default:
            return state;
    }
};

export default tvReducer;
