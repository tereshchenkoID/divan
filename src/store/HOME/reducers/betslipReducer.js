import { types } from "store/actionTypes";

const initialState = {
    betslip: []
};

const betslipReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_BETSLIP:
            return {
                ...state
            };
        case types.SET_BETSLIP:
            return {
                betslip: [...state.betslip, action.payload]
            };
        case types.DELETE_BETSLIP:
            return {
                betslip: action.payload
            };
        default:
            return state;
    }
};

export default betslipReducer;
