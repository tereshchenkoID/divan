import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useSocket from 'hooks/useSocket'

import classNames from 'classnames'

import i18n from 'i18next'
import { status } from 'constant/config'

import { checkCmd } from 'helpers/checkCmd'
import { getToken } from 'helpers/getToken'

import { setNotification } from 'store/HOME/actions/notificationAction'
import { setSettings } from 'store/actions/settingsAction'
import { setData } from 'store/HOME/actions/dataAction'
import { setAuth } from 'store/actions/authAction'

import Connection from 'components/Connection'
import Loader from 'components/Loader'
import Nav from 'components/Nav'
import Betslip from 'pages/Home/modules/Betslip'
import JackPot from 'pages/Home/modules/JackPot'
import Decor from 'pages/Home/modules/Decor'
import Skeleton from './modules/Skeleton'
import Tickets from './modules/Tickets'

import style from './index.module.scss'

const Home = () => {
  const { sendMessage } = useSocket()
  const dispatch = useDispatch()
  const { data } = useSelector(state => state.data)
  const { game } = useSelector(state => state.game)
  const { ticket } = useSelector(state => state.ticket)
  const { isConnected, receivedMessage } = useSelector(state => state.socket)
  const [loading, setLoading] = useState(true)
  const [isBetslip, setIsBetslip] = useState(false)
  const [theme, setTheme] = useState(false)

  const handleRedirect = () => {
    dispatch(setAuth(null))
    localStorage.removeItem('authToken')
  }

  useEffect(() => {
    if (isConnected) {
      sendMessage({
        cmd: `account/${getToken()}/settings`,
      })
    } else {
      dispatch(setSettings()).then(json => {
        if (json === -1) {
          handleRedirect()
        } else {
          i18n.changeLanguage(json.account.language || 'en')
          setTheme(json.theme)
          setLoading(false)
          dispatch(setNotification({ text: json.account.notification, type: status.info }))
        }
      })
    }
  }, [isConnected])

  useEffect(() => {
    if (receivedMessage !== '' && checkCmd('settings', receivedMessage.cmd)) {
      if (receivedMessage.hasOwnProperty('code')) {
        handleRedirect()
      } else {
        dispatch(setSettings(receivedMessage))
        i18n.changeLanguage(receivedMessage.account.language || 'en')
        setLoading(false)
      }
    }
  }, [receivedMessage])

  if (data.hasOwnProperty('error'))
    return (
      <Connection
        action={() => {
          dispatch(setData(game))
        }}
      />
    )

  return (
    <div className={style.block}>
      {
        loading 
          ?
            <Loader />
          :
            <div 
              className={style.container}
              style={theme}
            >
              <Decor type={game?.decor} />
              <Nav isBetslip={isBetslip} setIsBetslip={setIsBetslip} />
              <div className={style.content}>
                <div className={style.column}>
                  <div className={style.banners}>
                    <JackPot />
                  </div>
                  <Skeleton />
                </div>

                <div className={classNames(style.column, isBetslip && style.active)}>
                  <Betslip />
                </div>
                {ticket !== 0 && <Tickets />}
              </div>
            </div>
      }
    </div>
  )
}

export default Home
