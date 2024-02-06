import { matchStatus } from 'constant/config'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import useSocket from 'hooks/useSocket'

import { setLive } from 'store/HOME/actions/liveAction'
import { setModal } from 'store/HOME/actions/modalAction'
import { setUpdate } from 'store/HOME/actions/updateAction'

import { getDifferent } from 'helpers/getDifferent'

const StartTimer = ({ data, delta }) => {
  const dispatch = useDispatch()
  const { sendMessage } = useSocket()
  const { isConnected } = useSelector(state => state.socket)
  const [timer, setTimer] = useState('')

  useEffect(() => {
    setTimer(getDifferent(data.start, delta))
  }, [data.start, delta])

  useEffect(() => {
    const a = setInterval(() => {
      let r = getDifferent(data.start, delta)
      const diff = (data.start - (new Date().getTime() + delta)) / 1000

      if (r === '0') {
        if (isConnected) {
          sendMessage({
            cmd: `feed/${sessionStorage.getItem('authToken')}/EVENT/${data.id}`,
          })
        } else {
          dispatch(setUpdate(data.id, null)).then(json => {
            if (json.event.status === matchStatus.PROGRESS) {
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
