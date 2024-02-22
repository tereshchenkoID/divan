import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useSocket from 'hooks/useSocket'

import i18n from 'i18next'

import { checkCmd } from 'helpers/checkCmd'

import { setSettings } from 'store/actions/settingsAction'
import { setAuth } from 'store/actions/authAction'

import Loader from 'components/Loader'
import Nav from 'components/Nav'
import Betslip from 'pages/Home/modules/Betslip'
import Notification from 'pages/Home/modules/Notification'
import JackPot from 'pages/Home/modules/JackPot'
import Decor from 'pages/Home/modules/Decor'
import Skeleton from './modules/Skeleton'

import style from './index.module.scss'

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
              <Skeleton />
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
