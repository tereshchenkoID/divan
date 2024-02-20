import { types } from 'store/actionTypes'

const setLiveTimer = data => {
  return {
    type: types.SET_LIVE_TIMER,
    payload: data,
  }
}

export { setLiveTimer }
