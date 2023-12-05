import { types } from "store/actionTypes";

const initialState = {
    notification: null
};

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_NOTIFICATION:
            return {
                ...state
            };
        case types.SET_NOTIFICATION:
            return {
                ...state,
                notification: action.payload
            };
        default:
            return state;
    }
};

export default notificationReducer;
