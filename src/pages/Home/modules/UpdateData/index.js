import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useSocket from 'hooks/useSocket'

import { matchStatus } from 'constant/config'

import { setData } from 'store/HOME/actions/dataAction'
import { setLive } from 'store/HOME/actions/liveAction'
import { getDifferent } from 'helpers/getDifferent'
import { getToken } from 'helpers/getToken'

const UpdateData = ({ find, setActive, setFind, setDisabled }) => {
  const dispatch = useDispatch()
  const { sendMessage } = useSocket()

  const { delta } = useSelector(state => state.delta)
  const { game } = useSelector(state => state.game)
  const { isConnected } = useSelector(state => state.socket)
  let a = useRef()

  useEffect(() => {
    a.current = setInterval(() => {
      console.log(getDifferent(find.nextUpdate, delta, 1))
      if (getDifferent(find.nextUpdate, delta, 1) < 6 && find.status === matchStatus.ANNOUNCEMENT) {
        setDisabled(true)
      } else {
        setDisabled(false)
      }

      if (new Date().getTime() + delta >= find.nextUpdate) {
        if (find.status === matchStatus.COMPLETED || find.status === matchStatus.RESULTS) {
          if (isConnected) {
            sendMessage({
              cmd: `feed/${getToken()}/${game.type}/${game.id}`,
            })
            setFind(null)
            dispatch(setLive(1))
          } else {
            dispatch(setData(game)).then(json => {
              if (json) {
                setFind(null)
                dispatch(setLive(1))
                setActive(json.events[0])
              }
            })
          }
        } else {
          if (isConnected) {
            sendMessage({
              cmd: `feed/${getToken()}/${game.type}/${game.id}`,
            })
          } else {
            dispatch(setData(game)).then(json => {
              if (json) {
                setFind(json.events[0])
              }
            })
          }
        }

        clearInterval(a.current)
      }
    }, 1000)

    return () => {
      clearInterval(a.current)
    }
  }, [find])
}

export default UpdateData
