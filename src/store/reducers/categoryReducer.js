import { types } from "store/actionTypes";

const initialState = {
    category: {}
};

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_CATEGORY:
            return {
                ...state
            };
        case types.SET_CATEGORY:
            return {
                ...state,
                category: action.payload
            };
        default:
            return state;
    }
};

export default categoryReducer;
