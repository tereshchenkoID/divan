import { GET_CATEGORY, SET_CATEGORY } from "../actionTypes";

const initialState = {
    category: {}
};

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CATEGORY:
            return {
                ...state
            };
        case SET_CATEGORY:
            return {
                ...state,
                category: action.payload
            };
        default:
            return state;
    }
};

export default categoryReducer;
