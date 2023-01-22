import { types } from "store/actionTypes";

const initialState = {
    url: {}
};

const urlReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_URL:
            return {
                ...state
            };
        case types.SET_URL:
            return {
                ...state,
                url: action.payload
            };
        default:
            return state;
    }
};

export default urlReducer;
