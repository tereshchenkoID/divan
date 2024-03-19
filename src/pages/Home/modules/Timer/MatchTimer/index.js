import { gameType, matchStatus } from 'constant/config'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import useSocket from 'hooks/useSocket'

import { setLive } from 'store/HOME/actions/liveAction'
import { setLiveTimer } from 'store/HOME/actions/liveTimerAction'
import { setData } from 'store/HOME/actions/dataAction'

import { checkCmd } from 'helpers/checkCmd'
import { getDifferent } from 'helpers/getDifferent'
import { getToken } from 'helpers/getToken'

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
  if (type === gameType.FOOTBALL_LEAGUE || type === gameType.FOOTBALL) {
    return getDifferentPeriod(start, end, delta)
  } else {
    return getDifferent(end, delta)
  }
}

const MatchTimer = ({ delta }) => {
  const dispatch = useDispatch()
  const { sendMessage } = useSocket()
  const { isConnected, receivedMessage } = useSelector(state => state.socket)
  const [timer, setTimer] = useState('')
  const { data } = useSelector(state => state.data)
  const { game } = useSelector(state => state.game)

  useEffect(() => {
    let r = checkType(data.events[0].start, data.events[0].nextUpdate, delta, game.type)
    dispatch(setLiveTimer(r))
    setTimer(r)
  }, [data, delta])

  useEffect(() => {
    const a = setInterval(() => {
      let r = checkType(data.events[0].start, data.events[0].nextUpdate, delta, game.type)

      if (new Date().getTime() + delta >= data.events[0].nextUpdate) {
        if (isConnected) {
          sendMessage({
            cmd: `feed/${getToken()}/${game.type}/${game.id}`,
          })
        } else {
          dispatch(setData(game)).then(json => {
            if (json && json.events[0].status === matchStatus.RESULTS) {
              dispatch(setLive(3))
              dispatch(setLiveTimer(0))
              clearInterval(a)
            }
          })
        }
      } else {
        dispatch(setLiveTimer(r))
        setTimer(r)
      }
    }, 1000)

    return () => {
      setTimer('')
      clearInterval(a)
    }
  }, [data, delta])

  useEffect(() => {
    if (receivedMessage !== '' && checkCmd('feed', receivedMessage.cmd)) {
      if (receivedMessage && receivedMessage.events[0].status === matchStatus.PROGRESS) {
        dispatch(setLive(2))
      }
    }
  }, [receivedMessage])

  return <div>{timer === '0' ? '00:00' : timer}</div>
}

export default MatchTimer
