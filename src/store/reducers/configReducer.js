import { types } from 'store/actionTypes'

const initialState = {
  config: {},
}

const configReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CONFIG:
      return {
        ...state,
      }
    case types.SET_CONFIG:
      return {
        ...state,
        config: action.payload,
      }
    default:
      return state
  }
}

export default configReducer
