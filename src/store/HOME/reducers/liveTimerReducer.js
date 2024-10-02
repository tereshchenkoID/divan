import { types } from 'store/actionTypes'

const initialState = {
  liveTimer: 0,
}

const liveTimerReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_LIVE_TIMER:
      return {
        ...state,
      }
    case types.SET_LIVE_TIMER:
      return {
        ...state,
        liveTimer: action.payload,
      }
    default:
      return state
  }
}

export default liveTimerReducer
