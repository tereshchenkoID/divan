import { getData } from 'hooks/useRequest'

import { setDelta } from 'store/actions/deltaAction'

import { types } from 'store/actionTypes'

export const setData = (el, value) => async dispatch => {
  try {
    const data = value || (await getData(`/${el.type}/${el.id}`, {}, 'feed'))

    dispatch(setDelta(data.timer))
    dispatch({
      type: types.SET_DATA,
      payload: data,
    })
    return data
  } catch (e) {
    dispatch({
      type: types.SET_DATA,
      payload: {
        error: true,
      },
    })

    return null
  }
}
