import { GET_LEAGUE, SET_LEAGUE } from "../actionTypes";

const initialState = {
    league: {}
};

const leagueReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_LEAGUE:
            return {
                ...state
            };
        case SET_LEAGUE:
            return {
                ...state,
                league: action.payload
            };
        default:
            return state;
    }
};

export default leagueReducer;
