import { useRequest } from 'hooks/useRequest'

import { types } from 'store/actionTypes'

export const setBalance = value => async dispatch => {
  const { get } = useRequest()

  try {
    const data = value || (await get('/balance'))

    dispatch({
      type: types.SET_BALANCE,
      payload: data,
    })
  } catch (e) {
    console.log(e)
  }
}
