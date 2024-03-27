import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import useSocket from 'hooks/useSocket'

import { matchStatus } from 'constant/config'

import { setLive } from 'store/HOME/actions/liveAction'
import { setData } from 'store/HOME/actions/dataAction'
import { setModal } from 'store/actions/modalAction'
import { getToken } from 'helpers/getToken'

const StartTimer = ({ active, setActive, timer, setDisabled, isActive, initTime }) => {
  const dispatch = useDispatch()
  const { sendMessage } = useSocket()
  const { game } = useSelector(state => state.game)
  const { live } = useSelector(state => state.live)
  const { delta } = useSelector(state => state.delta)
  const { isConnected } = useSelector(state => state.socket)
  const [isRequesting, setIsRequesting] = useState(false)

  useEffect(() => {
    if (isActive) {
      const time = timer.time.split(':')
      if (Number(time[0]) === 0 && Number(time[1]) < 7 && Number(time[1]) > 0) {
        dispatch(setModal(1))
        setDisabled(true)
      }
    }
  }, [dispatch, isActive, timer, setDisabled])

  useEffect(() => {
    if (live === 1 && isActive && new Date().getTime() + delta > active.nextUpdate) {
      if (isConnected) {
        sendMessage({
          cmd: `feed/${getToken()}/${game.type}/${game.id}`,
        })
      } else {
        if (!isRequesting) {
          setIsRequesting(true)
          dispatch(setData(game))
            .then(json => {
              if (json.events[0].status === matchStatus.PROGRESS) {
                initTime(json.events[1])
                dispatch(setLive(1))
                setActive(json.events[1])
                setDisabled(false)
                dispatch(setModal(0))
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
  }, [dispatch, game, delta, timer])

  return <div>{timer.next}</div>
}

export default StartTimer
