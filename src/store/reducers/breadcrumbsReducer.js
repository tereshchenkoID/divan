import { types } from "store/actionTypes";

const initialState = {
    breadcrumbs: {}
};

const breadcrumbsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_BREADCRUMBS:
            return {
                ...state
            };
        case types.SET_BREADCRUMBS:
            return {
                ...state,
                breadcrumbs: action.payload
            };
        default:
            return state;
    }
};

export default breadcrumbsReducer;
