import { GET_SPORT, SET_SPORT } from "../actionTypes";

const initialState = {
    sport: []
};

const sportReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SPORT:
            return {
                ...state
            };
        case SET_SPORT:
            return {
                ...state,
                sport: action.payload
            };
        default:
            return state;
    }
};

export default sportReducer;
