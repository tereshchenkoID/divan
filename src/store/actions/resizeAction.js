import { types } from 'store/actionTypes'

const setResize = data => {
  return {
    type: types.SET_RESIZE,
    payload: data,
  }
}

export { setResize }
