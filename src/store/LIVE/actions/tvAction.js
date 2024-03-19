import { useRequest } from 'hooks/useRequest'
import { setDelta } from 'store/actions/deltaAction'

import { types } from '../actionTypes'

export const setTv = url => async dispatch => {
  const { get } = useRequest('viewer/event')
  try {
    const data = await get(url)
    dispatch(setDelta(data.timer))
    dispatch({
      type: types.SET_LIVE_TV,
      payload: data,
    })
    return data
  } catch (e) {
    dispatch({
      type: types.SET_LIVE_TV,
      payload: {
        error: true,
      },
    })
    return null
  }
}
