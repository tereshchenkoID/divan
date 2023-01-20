import { createStore, combineReducers } from "redux";

import categoryReducer from "./reducers/categoryReducer";
import sportReducer from "./reducers/sportReducer";
import urlReducer from "./reducers/urlReducer";
import leagueReducer from "./reducers/leagueReducer";

const allReducer = combineReducers({
    category: categoryReducer,
    sport: sportReducer,
    league: leagueReducer,
    url: urlReducer
});


const store = createStore(allReducer)

export default store;
