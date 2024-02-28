import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import gameReducer from './reducers/gameReducer'
import settingsReducer from './reducers/settingsReducer'
import deltaReducer from './reducers/deltaReducer'
import authReducer from './reducers/authReducer'
import modalReducer from './reducers/modalReducer'

/* HOME REDUCERS */
import betslipReducer from './HOME/reducers/betslipReducer'
import stakeReducer from './HOME/reducers/stakeReducer'
import liveReducer from './HOME/reducers/liveReducer'
import dataReducer from './HOME/reducers/dataReducer'
import liveTimerReducer from './HOME/reducers/liveTimerReducer'
import ticketReducer from './HOME/reducers/ticketReducer'
import balanceReducer from './HOME/reducers/balanceReducer'
import notificationReducer from './HOME/reducers/notificationReducer'
import socketReducer from './HOME/reducers/socketReducer'

/* LIVE REDUCERS */
import progressReducer from './LIVE/reducers/progressReducer'
import tvReducer from './LIVE/reducers/tvReducer'
import historyReducer from './LIVE/reducers/historyReducer'
import jackpotReducer from './LIVE/reducers/jackpotReducer'

const allReducer = combineReducers({
  auth: authReducer,
  game: gameReducer,
  delta: deltaReducer,
  modal: modalReducer,

  /* HOME REDUCERS */
  data: dataReducer,
  settings: settingsReducer,
  live: liveReducer,
  liveTimer: liveTimerReducer,
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
  jackpot: jackpotReducer,
})

const composeEnhancers =
  process.env.NODE_ENV !== 'production' && typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose
const middleware = applyMiddleware(thunk)
const store = createStore(allReducer, composeEnhancers(middleware))

export default store
