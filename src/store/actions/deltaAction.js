import { types } from 'store/actionTypes'

const getDelta = s => {
  const c = new Date().getTime()
  return s - c
}

const setDelta = data => {
  return {
    type: types.SET_DELTA,
    payload: getDelta(data),
  }
}

export { setDelta }
