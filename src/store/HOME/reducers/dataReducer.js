import { types } from "store/actionTypes";

const initialState = {
    data: {}
};

const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_DATA:
            return {
                ...state
            };
        case types.SET_DATA:
            return {
                ...state,
                data: action.payload
            };
        default:
            return state;
    }
};

export default dataReducer;
