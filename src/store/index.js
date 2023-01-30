import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from 'redux-thunk';

import categoryReducer from "./reducers/categoryReducer";
import sportReducer from "./reducers/sportReducer";
import urlReducer from "./reducers/urlReducer";
import leagueReducer from "./reducers/leagueReducer";
import eventMatchReducer from "./reducers/eventMatchReducer";
import breadcrumbsReducer from "./reducers/breadcrumbsReducer";

const allReducer = combineReducers({
    category: categoryReducer,
    sport: sportReducer,
    league: leagueReducer,
    url: urlReducer,
    breadcrumbs: breadcrumbsReducer,
    eventMatch: eventMatchReducer,
});

const composeEnhancers = process.env.NODE_ENV !== 'production' && typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
const middleware = applyMiddleware(thunk);
const store = createStore(allReducer, composeEnhancers(middleware))

export default store;
