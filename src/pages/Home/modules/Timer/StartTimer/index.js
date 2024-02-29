import { matchStatus } from 'constant/config'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import useSocket from 'hooks/useSocket'

import { setModal } from 'store/actions/modalAction'
import { setLive } from 'store/HOME/actions/liveAction'

import { getDifferent } from 'helpers/getDifferent'

import { setData } from 'store/HOME/actions/dataAction'

const StartTimer = ({ data, delta }) => {
  const dispatch = useDispatch()
  const { sendMessage } = useSocket()
  const { isConnected } = useSelector(state => state.socket)
  const { game } = useSelector(state => state.game)
  const [timer, setTimer] = useState('')

  useEffect(() => {
    setTimer(getDifferent(data.start, delta))
  }, [data, delta])

  useEffect(() => {
    const a = setInterval(() => {
      let r = getDifferent(data.start, delta)
      const diff = (data.start - (new Date().getTime() + delta)) / 1000

      if (new Date().getTime() + delta >= data.nextUpdate) {
        if (isConnected) {
          sendMessage({
            cmd: `feed/${sessionStorage.getItem('authToken')}/EVENT/${data.id}`,
          })
        } else {
          dispatch(setData(game)).then(json => {
            if (json && json.events[0].status === matchStatus.PROGRESS) {
              dispatch(setLive(2))
              clearInterval(a)
            }
          })
        }
      } else {
        setTimer(r)
      }

      if (diff < 6) {
        dispatch(setModal(1))
      }
    }, 1000)

    return () => {
      setTimer('')
      clearInterval(a)
    }
  }, [data.start, delta])

  return <div>{timer === '0' ? '00:00' : timer}</div>
}

export default StartTimer
