import { types } from "store/actionTypes";

const initialState = {
    league: {}
};

const leagueReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_LEAGUE:
            return {
                ...state
            };
        case types.SET_LEAGUE:
            return {
                ...state,
                league: action.payload
            };
        default:
            return state;
    }
};

export default leagueReducer;
