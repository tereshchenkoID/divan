import { types } from 'store/actionTypes'

const initialState = {
  update: {},
}

const updateReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_UPDATE:
      return {
        ...state,
      }
    case types.SET_UPDATE:
      return {
        ...state,
        update: action.payload,
      }
    default:
      return state
  }
}

export default updateReducer
