import { types } from 'store/actionTypes'

const setStake = data => {
  return {
    type: types.SET_STAKE,
    payload: data,
  }
}

export { setStake }
