import { SET_URL, GET_URL } from "../actionTypes";

const initialState = {
    url: {}
};

const urlReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_URL:
            return {
                ...state
            };
        case SET_URL:
            return {
                ...state,
                url: action.payload
            };
        default:
            return state;
    }
};

export default urlReducer;
