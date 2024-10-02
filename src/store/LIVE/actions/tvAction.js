import { useRequest } from 'hooks/useRequest'
import { setDelta } from 'store/actions/deltaAction'
import { setVideo } from './videoAction'

import { gameType, matchStatus } from 'constant/config'

import { types } from '../actionTypes'

export const setTv = url => async dispatch => {
  dispatch(setVideo(null))
  const { get } = useRequest('viewer/event')
  try {
    const data = await get(url)
    dispatch(setDelta(data.timer))
    dispatch({
      type: types.SET_LIVE_TV,
      payload: data,
    })

    if (data.event.type.indexOf(gameType.FOOTBALL) !== -1 && data.event.status !== matchStatus.RESULTS) {
      dispatch(setVideo(data.event.league.matches[0].scenes.map(el => el.video) || null))
    }
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
