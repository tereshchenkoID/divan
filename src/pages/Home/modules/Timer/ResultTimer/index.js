import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useSocket from 'hooks/useSocket'

import { matchStatus } from 'constant/config'

import { setLive } from 'store/HOME/actions/liveAction'
import { setData } from 'store/HOME/actions/dataAction'
import { getToken } from 'helpers/getToken'

const ResultTimer = ({ active, setActive, timer, isActive, initTime }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { sendMessage } = useSocket()
  const { game } = useSelector(state => state.game)
  const { live } = useSelector(state => state.live)
  const { delta } = useSelector(state => state.delta)
  const { isConnected } = useSelector(state => state.socket)
  const [isRequesting, setIsRequesting] = useState(false)

  useEffect(() => {
    if (live === 3 && isActive && new Date().getTime() + delta > active.nextUpdate) {
      if (isConnected) {
        sendMessage({
          cmd: `feed/${getToken()}/${game.type}/${game.id}`,
        })
      } else {
        if (!isRequesting) {
          setIsRequesting(true)
          dispatch(setData(game))
            .then(json => {
              if (json.events[0].status === matchStatus.ANNOUNCEMENT) {
                setActive(json.events[0])
                initTime(json.events[0])
                dispatch(setLive(1))
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

  return (
    <>
      <div>{t('interface.results')}</div>
      <div>{timer.next}</div>
    </>
  )
}

export default ResultTimer
