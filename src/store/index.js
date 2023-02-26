import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from 'redux-thunk';

import gameReducer from "./reducers/gameReducer";
import settingsReducer from "./reducers/settingsReducer";
import betslipReducer from "./reducers/betslipReducer";
import liveReducer from "./reducers/liveReducer";
import dataReducer from "./reducers/dataReducer";
import modalReducer from "./reducers/modalReducer";

const allReducer = combineReducers({
    data: dataReducer,
    game: gameReducer,
    settings: settingsReducer,
    live: liveReducer,
    modal: modalReducer,
    betslip: betslipReducer
});

const composeEnhancers = process.env.NODE_ENV !== 'production' && typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
const middleware = applyMiddleware(thunk);
const store = createStore(allReducer, composeEnhancers(middleware))

export default store;
