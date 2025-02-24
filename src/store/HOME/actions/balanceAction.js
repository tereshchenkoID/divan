import { getData } from 'hooks/useRequest'

import { types } from 'store/actionTypes'

export const setBalance = value => async dispatch => {
  try {
    const data = value || (await getData('/balance'))

    dispatch({
      type: types.SET_BALANCE,
      payload: data,
    })
  } catch (e) {
    console.log(e)
  }
}
