import { types } from "store/actionTypes";

const initialState = {
    delta: 0
};

const deltaReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_DELTA:
            return {
                ...state
            };
        case types.SET_DELTA:
            return {
                ...state,
                delta: action.payload
            };
        default:
            return state;
    }
};

export default deltaReducer;
