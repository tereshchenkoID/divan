import { types } from "../actionTypes";

const initialState = {
    progress: 0
};

const progressReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_LIVE_PROGRESS:
            return {
                ...state
            };
        case types.SET_LIVE_PROGRESS:
            return {
                ...state,
                progress: action.payload
            };
        default:
            return state;
    }
};

export default progressReducer;
