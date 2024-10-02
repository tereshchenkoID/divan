import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import useSocket from 'hooks/useSocket'

import { matchStatus } from 'constant/config'

import { setData } from 'store/HOME/actions/dataAction'
import { getToken } from 'helpers/getToken'

const UpdateTimer = ({ active, timer, setDisabled }) => {
  const dispatch = useDispatch()
  const { sendMessage } = useSocket()
  const { game } = useSelector(state => state.game)
  const { delta } = useSelector(state => state.delta)
  const { resize } = useSelector(state => state.resize)
  const { isConnected } = useSelector(state => state.socket)
  const [isRequesting, setIsRequesting] = useState(false)

  useEffect(() => {
    const time = timer.time.split(':')
    if (active.status === matchStatus.ANNOUNCEMENT && Number(time[2]) === 0 && Number(time[3]) < 7 && Number(time[3]) > 0) {
      !resize && setDisabled(true)
    }
  }, [dispatch, timer, setDisabled])

  useEffect(() => {
    if (new Date().getTime() + delta > active.nextUpdate) {
      if (isConnected) {
        sendMessage({
          cmd: `feed/${getToken()}/${game.type}/${game.id}`,
        })
      } else {
        if (!isRequesting) {
          setIsRequesting(true)
          dispatch(setData(game))
            .then(() => {
              !resize && setDisabled(false)
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
}

export default UpdateTimer
