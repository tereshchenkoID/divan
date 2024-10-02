import { types } from '../actionTypes'

const setVideo = data => {
  return {
    type: types.SET_VIDEO,
    payload: data,
  }
}

export { setVideo }
