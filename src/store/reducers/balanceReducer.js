import { types } from "store/actionTypes";

const initialState = {
    balance: {}
};

const balanceReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_BALANCE:
            return {
                ...state
            };
        case types.SET_BALANCE:
            return {
                ...state,
                balance: action.payload
            };
        default:
            return state;
    }
};

export default balanceReducer;
