import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from 'redux-thunk';

import gameReducer from "./reducers/gameReducer";
import settingsReducer from "./reducers/settingsReducer";
import betslipReducer from "./reducers/betslipReducer";
import stakeReducer from "./reducers/stakeReducer";
import liveReducer from "./reducers/liveReducer";
import dataReducer from "./reducers/dataReducer";
import modalReducer from "./reducers/modalReducer";
import updateReducer from "./reducers/updateReducer";
import liveTimerReducer from "./reducers/liveTimerReducer";
import deltaReducer from "./reducers/deltaReducer";
import ticketReducer from "./reducers/ticketReducer";
import balanceReducer from "./reducers/balanceReducer";
import notificationReducer from './reducers/notificationReducer'
import authReducer from "./reducers/authReducer";
import socketReducer from "./reducers/socketReducer";

/* LIVE REDUCERS */
import progressReducer from "./LIVE/reducers/progressReducer";
import tvReducer from "./LIVE/reducers/tvReducer"
import historyReducer from "./LIVE/reducers/historyReducer";

const allReducer = combineReducers({
    auth: authReducer,
    data: dataReducer,
    update: updateReducer,
    game: gameReducer,
    settings: settingsReducer,
    delta: deltaReducer,
    live: liveReducer,
    liveTimer: liveTimerReducer,
    modal: modalReducer,
    betslip: betslipReducer,
    stake: stakeReducer,
    ticket: ticketReducer,
    balance: balanceReducer,
    notification: notificationReducer,
    socket: socketReducer,
    
    /* LIVE REDUCERS */
    progress: progressReducer,
    history: historyReducer,
    tv: tvReducer,
});

const composeEnhancers = process.env.NODE_ENV !== 'production' && typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
const middleware = applyMiddleware(thunk);
const store = createStore(allReducer, composeEnhancers(middleware))

export default store;
