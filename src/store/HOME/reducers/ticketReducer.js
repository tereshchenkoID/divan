import { types } from 'store/actionTypes'

const initialState = {
  ticket: 0,
}

const ticketReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_TICKET:
      return {
        ...state,
      }
    case types.SET_TICKET:
      return {
        ...state,
        ticket: action.payload,
      }
    default:
      return state
  }
}

export default ticketReducer
