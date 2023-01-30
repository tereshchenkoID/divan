import { types } from "store/actionTypes";
import {useLocalStorage} from "helpers/localStorage";


// eslint-disable-next-line react-hooks/rules-of-hooks
const {getLocalStorage} = useLocalStorage()

const initialState = {
    breadcrumbs: JSON.parse(getLocalStorage('breadcrumbs')) || {}
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
