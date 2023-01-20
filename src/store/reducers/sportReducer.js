import { GET_BREADCRUMBS, SET_BREADCRUMBS } from "../actionTypes";

const initialState = {
    breadcrumbs: {}
};

const breadcrumbsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_BREADCRUMBS:
            return {
                ...state
            };
        case SET_BREADCRUMBS:
            return {
                ...state,
                breadcrumbs: action.payload
            };
        default:
            return state;
    }
};

export default breadcrumbsReducer;
