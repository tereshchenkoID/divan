import { useEffect, useState } from 'react'
import { gameType, matchStatus } from 'constant/config'
import { useDispatch, useSelector } from 'react-redux'
import useSocket from 'hooks/useSocket'

import { getDifferentPeriod } from 'helpers/getDifferentPeriod'
import { getDifferent } from 'helpers/getDifferent'
import { getToken } from 'helpers/getToken'

import { setData } from 'store/HOME/actions/dataAction'
import { setLive } from 'store/HOME/actions/liveAction'
import { setLiveTimer } from 'store/HOME/actions/liveTimerAction'

const checkType = (start, end, delta, type) => {
  if (type === gameType.FOOTBALL_LEAGUE || type === gameType.FOOTBALL) {
    return getDifferentPeriod(start, end, delta)
  } else {
    return getDifferent(end, delta)
  }
}

const MatchTimer = ({ active, setActive, timer, isActive, initTime }) => {
  const dispatch = useDispatch()
  const { sendMessage } = useSocket()
  const { delta } = useSelector(state => state.delta)
  const { game } = useSelector(state => state.game)
  const { live } = useSelector(state => state.live)
  const { liveTimer } = useSelector(state => state.liveTimer)
  const { isConnected } = useSelector(state => state.socket)
  const [isRequesting, setIsRequesting] = useState(false)

  useEffect(() => {
    if (live === 2 && isActive && new Date().getTime() + delta > active.nextUpdate) {
      if (isConnected) {
        sendMessage({
          cmd: `feed/${getToken()}/${game.type}/${game.id}`,
        })
      } else {
        if (!isRequesting) {
          setIsRequesting(true)
          dispatch(setData(game))
            .then(json => {
              if (json.events[0].status === matchStatus.RESULTS) {
                setActive(json.events[0])
                initTime(json.events[0])
                dispatch(setLive(3))
                dispatch(setLiveTimer(0))
              }
              setIsRequesting(false)
            })
            .catch(error => {
              setIsRequesting(false)
              console.error('Error:', error)
            })
        }
      }
    }
  }, [dispatch, live, game, delta, timer])

  useEffect(() => {
    let r = checkType(active.start, active.nextUpdate, delta, game.type)
    dispatch(setLiveTimer(r))
  }, [dispatch, delta, game, timer, active])

  return <div>{liveTimer === '0' ? '00:00' : `${liveTimer}${game.type === gameType.FOOTBALL_LEAGUE ? `'` : ''}`}</div>
}

export default MatchTimer
