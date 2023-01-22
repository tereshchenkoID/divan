import { types } from "store/actionTypes";

const initialState = {
    sport: []
};

const sportReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_SPORT:
            return {
                ...state
            };
        case types.SET_SPORT:
            return {
                ...state,
                sport: action.payload
            };
        default:
            return state;
    }
};

export default sportReducer;
