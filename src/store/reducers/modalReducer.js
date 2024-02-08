import { types } from "store/actionTypes";

const initialState = {
    modal: 0
};

const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_MODAL:
            return {
                ...state
            };
        case types.SET_MODAL:
            return {
                ...state,
                modal: action.payload
            };
        default:
            return state;
    }
};

export default modalReducer;
