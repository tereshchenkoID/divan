import { useEffect } from 'react'
import { gameType } from 'constant/config'
import { useDispatch, useSelector } from 'react-redux'

import { getDifferentPeriod } from 'helpers/getDifferentPeriod'
import { getDifferent } from 'helpers/getDifferent'

import { setLiveTimer } from 'store/HOME/actions/liveTimerAction'

const checkType = (start, end, delta, type) => {
  if (type === gameType.FOOTBALL_LEAGUE || type === gameType.FOOTBALL) {
    return getDifferentPeriod(start, end, delta)
  } else {
    return getDifferent(end, delta)
  }
}

const MatchTimer = ({ active, timer }) => {
  const dispatch = useDispatch()
  const { delta } = useSelector(state => state.delta)
  const { game } = useSelector(state => state.game)
  const { liveTimer } = useSelector(state => state.liveTimer)

  useEffect(() => {
    let r = checkType(active.start, active.nextUpdate, delta, game.type)
    dispatch(setLiveTimer(r))
  }, [dispatch, delta, game, timer, active])

  return <div>{liveTimer === '0' ? '00:00' : `${liveTimer}${game.type === gameType.FOOTBALL_LEAGUE ? `'` : ''}`}</div>
}

export default MatchTimer
