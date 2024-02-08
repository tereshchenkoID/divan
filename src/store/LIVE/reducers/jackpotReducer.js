import { types } from 'store/actionTypes'

const initialState = {
  jackpot: null,
}

const jackpotReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_JACKPOT:
      return {
        ...state,
      }
    case types.SET_JACKPOT:
      return {
        ...state,
        jackpot: action.payload,
      }
    default:
      return state
  }
}

export default jackpotReducer
