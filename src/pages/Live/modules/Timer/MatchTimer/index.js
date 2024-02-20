import { gameType, matchStatus } from 'constant/config'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setTv } from 'store/LIVE/actions/tvAction'
import { setProgress } from 'store/LIVE/actions/progressAction'
import { setLiveTimer } from 'store/HOME/actions/liveTimerAction'

import { getDifferent } from 'helpers/getDifferent'

const getDifferentPeriod = (start, end, delta) => {
  const MAX = 90
  const c = new Date().getTime() + delta

  let r = 0,
    result = '0'

  if (end > c) {
    r = new Date(end - c)
    result = MAX - (r.getSeconds() + r.getMinutes() * 60)
  }

  return result
}

const checkType = (start, end, delta, type) => {
  if (type === gameType.FOOTBALL_LEAGUE) {
    return getDifferentPeriod(start, end, delta)
  } else {
    return getDifferent(end, delta)
  }
}

const MatchTimer = ({ data, delta, type }) => {
  const dispatch = useDispatch()
  const [timer, setTimer] = useState('')
  const { game } = useSelector(state => state.game)

  useEffect(() => {
    let r = checkType(data.start, data.nextUpdate, delta, type)
    dispatch(setLiveTimer(r))
    setTimer(r)
  }, [data.start, delta])

  useEffect(() => {
    const a = setInterval(() => {
      let r = checkType(data.start, data.nextUpdate, delta, type)

      if (new Date().getTime() + delta >= data.nextUpdate) {
        // if (r === '0') {
        dispatch(setTv(`${type}/${game.id}`)).then(json => {
          dispatch(setLiveTimer(0))

          if (json.event.status === matchStatus.RESULTS) {
            dispatch(setProgress(3))
            dispatch(setLiveTimer(0))
            clearInterval(a)
          }
        })
      } else {
        dispatch(setLiveTimer(r))
        setTimer(r)
      }
    }, 1000)

    return () => {
      setTimer('')
      clearInterval(a)
    }
  }, [data.start, delta])

  return <div>{timer === '0' ? '00:00' : `${timer}${type === gameType.FOOTBALL_LEAGUE ? `'` : ''}`}</div>
}

export default MatchTimer
