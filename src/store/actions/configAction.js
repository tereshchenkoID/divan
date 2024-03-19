import { types } from 'store/actionTypes'

const setConfig = data => {
  return {
    type: types.SET_CONFIG,
    payload: data,
  }
}

export { setConfig }
