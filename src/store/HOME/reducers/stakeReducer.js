import { types } from 'store/actionTypes'

const initialState = {
  stake: [],
}

const stakeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_STAKE:
      return {
        ...state,
      }
    case types.SET_STAKE:
      return {
        stake: action.payload,
      }
    default:
      return state
  }
}

export default stakeReducer
