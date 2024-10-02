import { types } from 'store/actionTypes'

import { getToken } from 'helpers/getToken'

const initialState = {
  auth: getToken() || false,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_AUTH:
      return {
        ...state,
      }
    case types.SET_AUTH:
      return {
        ...state,
        auth: action.payload,
      }
    default:
      return state
  }
}

export default authReducer
