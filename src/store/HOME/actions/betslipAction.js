import { types } from "store/actionTypes";

const setBetslip = (data) => {
    return {
        type: types.SET_BETSLIP,
        payload: data
    };
};

const deleteBetslip = (data) => {
    return {
        type: types.DELETE_BETSLIP,
        payload: data
    };
};

export { setBetslip, deleteBetslip };
