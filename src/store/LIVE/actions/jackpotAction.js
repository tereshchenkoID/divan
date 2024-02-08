import { types } from 'store/actionTypes'

const setJackpot = data => {
  return {
    type: types.SET_JACKPOT,
    payload: data,
  }
}

export { setJackpot }
