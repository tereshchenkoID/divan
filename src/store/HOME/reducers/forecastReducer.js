import { types } from 'store/actionTypes'

const initialState = {
  forecast: {},
}

const forecastReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_FORECAST:
      return {
        ...state,
      }
    case types.SET_FORECAST:
      return {
        forecast: action.payload,
      }
    default:
      return state
  }
}

export default forecastReducer
