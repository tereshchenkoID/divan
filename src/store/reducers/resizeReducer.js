import { types } from 'store/actionTypes'

const initialState = {
  resize: window.screen.width < 1280 && window.screen.height < 720,
}

const resizeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_RESIZE:
      return {
        ...state,
      }
    case types.SET_RESIZE:
      return {
        ...state,
        resize: action.payload,
      }
    default:
      return state
  }
}

export default resizeReducer
