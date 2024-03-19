import { gameType, matchStatus } from 'constant/config'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setTv } from 'store/LIVE/actions/tvAction'
import { setProgress } from 'store/LIVE/actions/progressAction'
import { setLiveTimer } from 'store/HOME/actions/liveTimerAction'

import { getDifferent } from 'helpers/getDifferent'

const getDifferentPeriod = (start, end, delta) => {
  const MAX = 90
  const c = new Date().getTime() + delta

  let r = 0,
    result = '90'

  if (end > c) {
    r = new Date(end - c)
    result = MAX - (r.getSeconds() + r.getMinutes() * 60)
  }

  return result
}

const checkType = (start, end, delta, type) => {
  if (type === gameType.FOOTBALL_LEAGUE || type === gameType.FOOTBALL) {
    return getDifferentPeriod(start, end, delta)
  } else {
    return getDifferent(end, delta)
  }
}

const MatchTimer = ({ delta, timer }) => {
  const dispatch = useDispatch()
  const { tv } = useSelector(state => state.tv)
  const { game } = useSelector(state => state.game)
  const { liveTimer } = useSelector(state => state.liveTimer)

  useEffect(() => {
    if (new Date().getTime() + delta > tv.event.nextUpdate) {
      dispatch(setTv(`${game.type}/${game.id}`)).then(json => {
        if (json && json.event.status === matchStatus.RESULTS) {
          dispatch(setProgress(3))
          dispatch(setLiveTimer(0))
        }
      })
    }
  }, [dispatch, game, tv, delta, timer])

  useEffect(() => {
    let r = checkType(tv.event.start, tv.event.nextUpdate, delta, game.type)
    dispatch(setLiveTimer(r))
  }, [dispatch, delta, game, timer, tv])

  return <div>{liveTimer === '0' ? '00:00' : `${liveTimer}${game.type === gameType.FOOTBALL_LEAGUE ? `'` : ''}`}</div>
}

export default MatchTimer
