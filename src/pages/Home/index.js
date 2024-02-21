import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import i18n from 'i18next'

import useSocket from 'hooks/useSocket'

import { gameType } from 'constant/config'

import { checkCmd } from 'helpers/checkCmd'

import { setSettings } from 'store/actions/settingsAction'
import { setAuth } from 'store/actions/authAction'

import FOOTBALL from './games/FOOTBALL/Table'
import FOOTBALL_LEAGUE from 'pages/Home/games/FOOTBALL_LEAGUE/Table'
import COLOR_COLOR from 'pages/Home/games/COLOR_COLOR/Table'
import ROULETTE from 'pages/Home/games/ROULETTE/Table'
import KENO from 'pages/Home/games/KENO/Table'
import DOGS_6 from 'pages/Home/games/DOGS_6/Table'
import HORSES_8_VR from 'pages/Home/games/HORSES_8_VR/Table'

import Loader from 'components/Loader'
import Nav from 'components/Nav'
import Betslip from 'pages/Home/modules/Betslip'
import Notification from 'pages/Home/modules/Notification'
import JackPot from 'pages/Home/modules/JackPot'
import Decor from 'pages/Home/modules/Decor'

import style from './index.module.scss'

const setGame = id => {
  switch (id) {
    case gameType.FOOTBALL:
      return <FOOTBALL />
    case gameType.FOOTBALL_LEAGUE:
      return <FOOTBALL_LEAGUE />
    case gameType.ROULETTE:
      return <ROULETTE />
    case gameType.COLOR_COLOR:
      return <COLOR_COLOR />
    case gameType.KENO:
      return <KENO />
    case gameType.DOGS_6:
      return <DOGS_6 />
    case gameType.HORSES_8_VR:
      return <HORSES_8_VR />
    default:
      return <FOOTBALL_LEAGUE />
  }
}

const Home = () => {
  const { sendMessage } = useSocket()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const { notification } = useSelector(state => state.notification)
  const { game } = useSelector(state => state.game)
  const { settings } = useSelector(state => state.settings)
  const { isConnected, receivedMessage } = useSelector(state => state.socket)

  useEffect(() => {
    if (isConnected) {
      sendMessage({
        cmd: `account/${sessionStorage.getItem('authToken')}/settings`,
      })
    } else {
      if (Object.keys(settings).length === 0) {
        dispatch(setSettings()).then(json => {
          if (json.hasOwnProperty('data')) {
            dispatch(setAuth(null))
            sessionStorage.clear()
          } else {
            i18n.changeLanguage(json.account.language || 'en')
            setLoading(false)
          }
        })
      } else {
        setLoading(false)
      }
    }
  }, [isConnected])

  useEffect(() => {
    if (receivedMessage !== '' && checkCmd('settings', receivedMessage.cmd)) {
      if (receivedMessage.hasOwnProperty('code')) {
        dispatch(setAuth(null))
        sessionStorage.clear()
        navigate(0)
      } else {
        if (Object.keys(settings).length === 0) {
          dispatch(setSettings(receivedMessage))
          i18n.changeLanguage(receivedMessage.account.language || 'en')
          setLoading(false)
        } else {
          setLoading(false)
        }
      }
    }
  }, [receivedMessage])

  return (
    <div className={style.block}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Decor type={game?.decor} />
          <Nav />
          <div className={style.content}>
            <div className={style.column}>
              <div className={style.banners}>
                <JackPot />
              </div>
              <div className={style.table}>{game && setGame(game.type)}</div>
            </div>
            <div className={style.column}>
              <Betslip />
            </div>
          </div>
          {notification && <Notification data={notification} />}
        </>
      )}
    </div>
  )
}

export default Home
