import { matchStatus } from 'constant/config'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import useSocket from 'hooks/useSocket'

import { setLive } from 'store/HOME/actions/liveAction'
import { setData } from 'store/HOME/actions/dataAction'

import { getDifferent } from 'helpers/getDifferent'

const ResultTimer = ({ data, game, delta }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { sendMessage } = useSocket()
  const { isConnected } = useSelector(state => state.socket)
  const [timer, setTimer] = useState('')

  useEffect(() => {
    let r = getDifferent(data.event.nextUpdate, delta)
    setTimer(r)
  }, [data.event.nextUpdate, delta])

  useEffect(() => {
    const a = setInterval(() => {
      let r = getDifferent(data.event.nextUpdate, delta)
      setTimer(r)

      if (new Date().getTime() + delta >= data.event.nextUpdate) {
        // if (r === '0') {
        if (isConnected) {
          sendMessage({
            cmd: `feed/${sessionStorage.getItem('authToken')}/${game.type}/${game.id}`,
          })
        } else {
          dispatch(setData(game)).then(json => {
            if (json.events[0].status === matchStatus.ANNOUNCEMENT) {
              dispatch(setLive(4))
              clearInterval(a)
            }
          })
        }
      }
    }, 1000)

    return () => {
      setTimer('')
      clearInterval(a)
    }
  }, [data.event.nextUpdate, delta])

  return (
    <>
      <div>{t('interface.results')}</div>
      <div>{timer === '0' ? '00:00' : timer}</div>
    </>
  )
}

export default ResultTimer
