import { types } from "store/actionTypes";

const initialState = {
    event: {}
};

const eventMatchReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_EVENT_MATCH:
            return {
                ...state
            };
        case types.SET_EVENT_MATCH:
            return {
                ...state,
                event: action.payload
            };
        default:
            return state;
    }
};

export default eventMatchReducer;
