import { gameType, matchStatus } from 'constant/config'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { setAuth } from 'store/actions/authAction'

import i18n from 'i18next'

import { setSettings } from 'store/actions/settingsAction'
import { setGame } from 'store/actions/gameAction'
import { setProgress } from 'store/LIVE/actions/progressAction'
import { setModal } from 'store/actions/modalAction'
import { setTv } from 'store/LIVE/actions/tvAction'
import { conditionStatus } from 'helpers/conditionStatus'

import Connection from 'components/Connection'
import Loader from 'components/Loader'
import Alert from 'components/Alert'
import Decor from 'pages/Home/modules/Decor'

import FOOTBALL from './games/FOOTBALL'
import FOOTBALL_LEAGUE from './games/FOOTBALL_LEAGUE'
import HORSES_8_VR from './games/HORSES_8_VR'
import COLOR_COLOR from './games/COLOR_COLOR'
import ROULETTE from './games/ROULETTE'
import DOGS_6 from './games/DOGS_6'
import KENO from './games/KENO'

import JackPotWinner from './modules/JackPot'
import Countdown from './modules/Modal/Countdown'
import Jackpot from './modules/Modal/Jackpot'
import Ticker from './modules/Ticker'
import Games from './modules/Games'
import Header from './modules/Header'

import style from './index.module.scss'

const getGame = id => {
  switch (id) {
    case gameType.FOOTBALL:
      return <FOOTBALL />
    case gameType.FOOTBALL_LEAGUE:
      return <FOOTBALL_LEAGUE />
    case gameType.DOGS_6:
      return <DOGS_6 />
    case gameType.ROULETTE:
      return <ROULETTE />
    case gameType.KENO:
      return <KENO />
    case gameType.COLOR_COLOR:
      return <COLOR_COLOR />
    case gameType.HORSES_8_VR:
      return <HORSES_8_VR />
    default:
      return <FOOTBALL />
  }
}

const Live = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { game } = useSelector(state => state.game)
  const { modal } = useSelector(state => state.modal)
  const { jackpot } = useSelector(state => state.jackpot)
  const { tv } = useSelector(state => state.tv)
  const [loading, setLoading] = useState(true)
  const [preloader, setPreloader] = useState(true)
  const [active, setActive] = useState(false)

  // const [time, setTime] = useState(0)
  //
  // useEffect(() => {
  //   const timerWorker = new Worker('./serviceWorker.js')
  //
  //   timerWorker.addEventListener('message', function (event) {
  //     setTime(new Date().getTime())
  //   })
  //
  //   timerWorker.postMessage('start')
  //
  //   return () => {
  //     timerWorker.postMessage('stop')
  //     timerWorker.terminate()
  //   }
  // }, [])

  useEffect(() => {
    dispatch(setSettings()).then(json => {
      if (json === -1) {
        localStorage.removeItem('authToken')
        dispatch(setAuth(null))
      } else {
        i18n.changeLanguage(json.account.language || 'en')
        dispatch(setGame(game || JSON.parse(localStorage.getItem('game'))) || json.games[0])
        setLoading(false)
      }
    })
  }, [])

  useEffect(() => {
    if (game) {
      dispatch(setTv(`${game.type}/${game.id}`)).then(json => {
        if (json.event.status === matchStatus.ANNOUNCEMENT) {
          dispatch(setProgress(1))
        } else if (json.event.status === matchStatus.PROGRESS) {
          dispatch(setProgress(2))
        } else if (json.event.status === matchStatus.RESULTS) {
          dispatch(setProgress(3))
        } else if (json.event.status === matchStatus.COMPLETED) {
          dispatch(setProgress(4))
        }

        setPreloader(false)
      })
    }
  }, [game])

  if (tv.hasOwnProperty('error'))
    return (
      <Connection
        action={() => {
          setPreloader(true)
          dispatch(setTv(`${game.type}/${game.id}`)).then(json => {
            if (json) {
              dispatch(setModal(0))
              dispatch(setProgress(conditionStatus(json.event.status)))
              setPreloader(false)
            }
          })
        }}
      />
    )

  return (
    <div className={style.block}>
      {loading ? (
        <Loader />
      ) : (
        <>
          {/*<p*/}
          {/*  style={{*/}
          {/*    color: '#fff',*/}
          {/*    fontSize: 50,*/}
          {/*  }}*/}
          {/*>*/}
          {/*  {time}*/}
          {/*</p>*/}
          <Decor type={game.decor} />
          <div
            className={style.wrapper}
            onClick={() => {
              setActive(true)
            }}
          >
            <div className={style.ticker}>
              <div className={style.winner}>
                <JackPotWinner />
              </div>
              {game.type === gameType.FOOTBALL_LEAGUE && <Ticker />}
            </div>
            {preloader && tv ? (
              <Loader type={'block'} background={'transparent'} />
            ) : (
              <div className={style.content}>
                {tv.event ? (
                  <>
                    <Header />
                    <div className={style.table}>{getGame(game.type)}</div>
                  </>
                ) : (
                  <Alert text={t('notification.events_not_found')} type={'default'} />
                )}
              </div>
            )}
            {modal === 1 && <Countdown />}
            {jackpot && <Jackpot />}
          </div>
          {active && <Games action={setActive} setPreloader={setPreloader} />}
        </>
      )}
    </div>
  )
}

export default Live
