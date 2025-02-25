import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import useSocket from 'hooks/useSocket'

import { gameType, matchStatus } from 'constant/config'

import { getDateTime } from 'helpers/getDateTime'
import { conditionStatus } from 'helpers/conditionStatus'
import { getDifferent } from 'helpers/getDifferent'
import { checkCmd } from 'helpers/checkCmd'
import { getToken } from 'helpers/getToken'

import { setData } from 'store/HOME/actions/dataAction'
import { setLive } from 'store/HOME/actions/liveAction'
import { setModal } from 'store/actions/modalAction'

import Loader from 'components/Loader'
import Alert from 'components/Alert'
import Button from 'components/Button'
import SkipModal from '../SkipModal'
import Timer from '../Timer'

import style from './index.module.scss'

import FOOTBALL_LEAGUE from 'pages/Home/games/FOOTBALL_LEAGUE/Table'
import FOOTBALL from 'pages/Home/games/FOOTBALL/Table'
import COLOR_COLOR from 'pages/Home/games/COLOR_COLOR/Table'
import ROULETTE from 'pages/Home/games/ROULETTE/Table'
import ROULETTE_DELUXE from 'pages/Home/games/ROULETTE_DELUXE/Table'
import KENO from 'pages/Home/games/KENO/Table'
import DOGS_6 from 'pages/Home/games/DOGS_6/Table'
import HORSES_8_VR from 'pages/Home/games/HORSES_8_VR/Table'
import SPORT_PR from 'pages/Home/games/SPORT_PR/Table'

const setGame = (id, active) => {
  switch (id) {
    case gameType.FOOTBALL:
      return <FOOTBALL active={active} />
    case gameType.FOOTBALL_LEAGUE:
      return <FOOTBALL_LEAGUE active={active} />
    case gameType.ROULETTE:
      return <ROULETTE active={active} />
    case gameType.ROULETTE_DELUXE:
      return <ROULETTE_DELUXE active={active} />  
    case gameType.COLOR_COLOR:
      return <COLOR_COLOR active={active} />
    case gameType.KENO:
      return <KENO active={active} />
    case gameType.DOGS_6:
      return <DOGS_6 active={active} />
    case gameType.HORSES_8_VR:
      return <HORSES_8_VR active={active} />
    case gameType.SPORT_PR:
      return <SPORT_PR active={active} />
    default:
      return <FOOTBALL_LEAGUE active={active} />
  }
}

const Skeleton = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { sendMessage } = useSocket()

  const { data } = useSelector(state => state.data)
  const { delta } = useSelector(state => state.delta)
  const { live } = useSelector(state => state.live)
  const { modal } = useSelector(state => state.modal)
  const { game } = useSelector(state => state.game)
  const { resize } = useSelector(state => state.resize)
  const { isConnected, receivedMessage } = useSelector(state => state.socket)

  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState(0)
  const [disabled, setDisabled] = useState(false)

  const [timer, setTimer] = useState({
    time: '00:00:00:00',
    next: null,
    game: null,
    currentId: null,
    nextId: null,
    update: null,
  })
  const worker = useMemo(() => new Worker('./sw.js'), [])

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('sw.js')
          .then(() => {
            console.log('[SW] registered:')
          })
          .catch(() => {
            console.error('[SW] registration failed:')
          })
      })
    }
  }, [worker])

  useEffect(() => {
    if ('Worker' in window) {
      worker.addEventListener('message', event => {
        setTimer(event.data)
      })

      worker.postMessage({
        type: 'start',
        currentTime: data?.events?.[0]?.nextUpdate,
        currentId: data?.events?.[0]?.id,
        nextTime: active?.nextUpdate,
        nextId: active?.id,
        game: game?.type,
        delta: delta,
      })

      return () => {
        worker.postMessage('stop')
      }
    } else {
      console.log('SW not supported')
    }
  }, [data, active, delta, worker])

  const initTime = value => {
    setTimer(prevState => ({
      ...prevState,
      next: getDifferent(value.nextUpdate, delta, 2),
      nextId: value.id,
    }))
  }

  const handleNext = () => {
    initTime(data.events[1])
    setDisabled(true)
    setActive(data.events[1])
    dispatch(setLive(1))
    dispatch(setModal(0))
  }

  useEffect(() => {
    setLoading(true)

    if (game !== null) {
      if (isConnected) {
        setLoading(true)
        sendMessage({
          cmd: `feed/${getToken()}/${game.type}/${game.id}`,
        })
      } else {
        dispatch(setData(game)).then(json => {
          if (json && json.events.length > 0) {
            let find = null
            if (json.events[0].status !== matchStatus.ANNOUNCEMENT) {
              find = json.events[1]
              dispatch(setLive(conditionStatus(json.events[1])))
            } else {
              find = json.events[0]
              dispatch(setLive(1))
            }

            initTime(find)
            setActive(find)
          }

          !resize && setDisabled(false)
          setLoading(false)
        })
      }
    }
  }, [game])

  useEffect(() => {
    if (data?.events?.[0]?.status !== matchStatus.ANNOUNCEMENT) {
      setDisabled(true)
      setActive(data?.events?.[1])
    } else {
      setDisabled(false)
      setActive(data?.events?.[0])
    }
  }, [data])

  useEffect(() => {
    if (loading && receivedMessage !== '' && checkCmd('feed', receivedMessage.cmd)) {
      dispatch(setData(game, receivedMessage)).then(() => {
        let find = null
        if (receivedMessage && receivedMessage.events[0].status !== matchStatus.ANNOUNCEMENT) {
          find = receivedMessage.events[1]
          dispatch(setLive(conditionStatus(receivedMessage.events[1])))
        } else {
          find = receivedMessage.events[0]
          dispatch(setLive(1))
        }

        setActive(find)
        initTime(find)

        !resize && setDisabled(false)
        setLoading(false)
      })
    }
  }, [receivedMessage])

  const getEventsName = data => {
    if (data.league?.week) return `${t('interface.week')} ${data.league.week}`
    else if (data.league?.round) return `${t('interface.round')} ${data.league.round}`
    else return getDateTime(data.start, 3)
  }

  return (
    <div className={style.block}>
      {loading ? (
        <Loader type={'block'} />
      ) : (
        <>
          {data && data.events && data.events.length > 0 ? (
            <>
              <div className={style.info}>
                <div className={style.league}>
                  <img src={game.logo} alt={game.name} width={135} height={70} loading={'lazy'} />
                </div>
                <Timer active={active} setActive={setActive} timer={timer} setDisabled={setDisabled} initTime={initTime} />
              </div>
              <div className={style.tab}>
                {data.events.map((el, idx) => (
                  <Button
                    key={idx}
                    props={'button'}
                    text={getEventsName(el)}
                    initial={[style.link]}
                    classes={['green', el.id === active.id && 'active', disabled && idx === 0 && 'disabled']}
                    action={() => {
                      initTime(el)
                      dispatch(setLive(conditionStatus(el.status)))
                      setActive(el)
                    }}
                  />
                ))}
              </div>
              {live !== 0 && (
                <>
                  <div className={style.body}>{setGame(game.type, active)}</div>
                  {!resize && modal === 1 && <SkipModal action={handleNext} />}
                </>
              )}
            </>
          ) : (
            <Alert text={t('notification.events_not_found')} type={'default'} />
          )}
        </>
      )}
    </div>
  )
}

export default Skeleton
