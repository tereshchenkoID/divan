import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useSocket from 'hooks/useSocket'

import { matchStatus } from 'constant/config'

import { setUpdate } from 'store/HOME/actions/updateAction'
import { setData } from 'store/HOME/actions/dataAction'
import { setLive } from 'store/HOME/actions/liveAction'

import { checkCmd } from 'helpers/checkCmd'
import { getDifferent } from 'helpers/getDifferent'

const UpdateData = ({ find, setActive, setFind }) => {
  const dispatch = useDispatch()
  const { sendMessage } = useSocket()

  const { delta } = useSelector(state => state.delta)
  const { game } = useSelector(state => state.game)
  const { isConnected, receivedMessage } = useSelector(state => state.socket)
  let a = useRef()

  useEffect(() => {
    if (isConnected) {
      sendMessage({
        cmd: `feed/${sessionStorage.getItem('authToken')}/EVENT/${find.id}`,
      })
    }
  }, [])

  useEffect(() => {
    if (!isConnected) {
      a.current = setInterval(() => {
        console.log(getDifferent(find.nextUpdate, delta))

        if (new Date().getTime() + delta >= find.nextUpdate) {
          // if (t === '0') {
          if (find.status === matchStatus.COMPLETED || find.status === matchStatus.RESULTS) {
            dispatch(setData(game, null)).then(json => {
              setFind(null)
              dispatch(setLive(1))
              setActive(json.events[0])
            })
          } else {
            dispatch(setUpdate(find.id)).then(json => {
              setFind(json.event)
            })
          }

          clearInterval(a.current)
        }
      }, 1000)
    }

    return () => {
      clearInterval(a.current)
    }
  }, [find])

  useEffect(() => {
    if (receivedMessage !== '' && checkCmd('event', receivedMessage.cmd)) {
      clearInterval(a.current)

      dispatch(setUpdate(null, receivedMessage))

      a.current = setInterval(() => {
        console.log(getDifferent(receivedMessage.event.nextUpdate, delta))

        if (new Date().getTime() + delta >= receivedMessage.event.nextUpdate) {
          // if (t === '0') {
          if (receivedMessage.event.status === matchStatus.COMPLETED || receivedMessage.event.status === matchStatus.RESULTS) {
            sendMessage({
              cmd: `feed/${sessionStorage.getItem('authToken')}/${game.type}/${game.id}`,
            })
          } else {
            sendMessage({
              cmd: `feed/${sessionStorage.getItem('authToken')}/EVENT/${find.id}`,
            })
          }

          clearInterval(a.current)
        }
      }, 1000)
    }
  }, [receivedMessage])
}

export default UpdateData
