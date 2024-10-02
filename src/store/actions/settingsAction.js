import { useRequest } from 'hooks/useRequest'

import { types } from 'store/actionTypes'

export const setSettings = value => async dispatch => {
  const { get } = useRequest()

  try {
    const data = value || (await get('/settings'))

    dispatch({
      type: types.SET_SETTINGS,
      payload: data,
    })

    return data
  } catch (e) {
    console.log(e)
  }
}
