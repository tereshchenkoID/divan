import { types } from "store/actionTypes";

const initialState = {
    live: 0
};

const liveReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_LIVE:
            return {
                ...state
            };
        case types.SET_LIVE:
            return {
                ...state,
                live: action.payload
            };
        default:
            return state;
    }
};

export default liveReducer;
