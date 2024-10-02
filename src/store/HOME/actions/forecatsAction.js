import { types } from 'store/actionTypes'

export const setForecast = data => {
  return {
    type: types.SET_FORECAST,
    payload: data,
  }
}
