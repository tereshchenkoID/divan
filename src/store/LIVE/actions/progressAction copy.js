import { types } from '../actionTypes'

const setProgress = data => {
  return {
    type: types.SET_LIVE_PROGRESS,
    payload: data,
  }
}

export { setProgress }
