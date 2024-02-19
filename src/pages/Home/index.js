import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import i18n from 'i18next'

import useSocket from 'hooks/useSocket'

import { gameType } from 'constant/config'

import { checkCmd } from 'helpers/checkCmd'

import { setSettings } from 'store/actions/settingsAction'

import FOOTBALL from './games/FOOTBALL'
import FOOTBALL_LEAGUE from 'pages/Home/games/FOOTBALL_LEAGUE'
import COLOR_COLOR from 'pages/Home/games/COLOR_COLOR'
import ROULETTE from 'pages/Home/games/ROULETTE'
import KENO from 'pages/Home/games/KENO'
import DOGS_6 from 'pages/Home/games/DOGS_6'
import HORSES_8_VR from 'pages/Home/games/HORSES_8_VR'

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
  const { isConnected, receivedMessage } = useSelector(state => state.socket)

  useEffect(() => {
    if (isConnected) {
      sendMessage({
        cmd: `account/${sessionStorage.getItem('authToken')}/settings`,
      })
    } else {
      dispatch(setSettings()).then(json => {
        if (json.hasOwnProperty('data')) {
          sessionStorage.clear()
        } else {
          i18n.changeLanguage(json.account.language || 'en')
          setLoading(false)
        }
      })
    }
  }, [isConnected])

  useEffect(() => {
    if (receivedMessage !== '' && checkCmd('settings', receivedMessage.cmd)) {
      if (receivedMessage.hasOwnProperty('code')) {
        sessionStorage.clear()
        navigate(0)
      } else {
        dispatch(setSettings(receivedMessage))
        i18n.changeLanguage(receivedMessage.account.language || 'en')
        setLoading(false)
      }
    }
  }, [receivedMessage])

  return (
    <div className={style.block}>
      {loading ? (
        <Loader />
      ) : (
        <>
          {game && <Decor type={game.decor} />}
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
          {notification && <Notification text={notification} />}
        </>
      )}
    </div>
  )
}

export default Home
