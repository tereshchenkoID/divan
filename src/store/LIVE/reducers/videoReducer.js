import { types } from '../actionTypes'

const initialState = {
  video: [],
}

const videoReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_VIDEO:
      return {
        ...state,
      }
    case types.SET_VIDEO:
      return {
        ...state,
        video: action.payload,
      }
    default:
      return state
  }
}

export default videoReducer
