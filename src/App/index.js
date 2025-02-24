import { Suspense, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import useSocket from 'hooks/useSocket'

import classNames from 'classnames'

import { router } from 'router'
import { setResize } from 'store/actions/resizeAction'
import { getToken } from 'helpers/getToken'
import { getHostName } from 'helpers/getHostName'

import Notification from 'pages/Home/modules/Notification'
import Login from 'pages/Login'
import Loader from 'components/Loader'

import style from './index.module.scss'

const App = () => {
  const dispatch = useDispatch()
  const { auth } = useSelector(state => state.auth)
  const { resize } = useSelector(state => state.resize)
  const { isConnected } = useSelector(state => state.socket)
  const { notification } = useSelector(state => state.notification)
  const { connectSocket } = useSocket()

  useEffect(() => {
    fetch('/config.json')
      .then(response => response.json())
      .then(config => {
        localStorage.setItem('config', JSON.stringify(config.hostnames))
        if (config.hostnames.WSS_PROD) connectSocket()
      })
  }, [dispatch])

  useEffect(() => {
    if (getHostName('WSS_PROD') && !isConnected) {
      const intervalId = setInterval(
        () => {
          console.log('%cSOCKET_RECONNECT', 'color: #157b15')
          connectSocket()
        },
        2 * 60 * 1000,
      )

      return () => {
        clearInterval(intervalId)
      }
    }
  }, [isConnected])

  const WINDOW_SIZE = {
    w: 1366,
    h: 768,
  }
  const [windowSize, setWindowSize] = useState({
    x: window.innerWidth / WINDOW_SIZE.w,
    y: window.innerHeight / WINDOW_SIZE.h,
  })

  const handleResize = () => {
    const isMobile = window.innerWidth < 1200
    // const isMobile = false

    if (isMobile) {
      setWindowSize({
        x: 1,
        y: 1,
      })
    } else {
      setWindowSize({
        x: window.innerWidth / WINDOW_SIZE.w,
        y: window.innerHeight / WINDOW_SIZE.h,
      })
    }
    dispatch(setResize(isMobile))
  }

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div
      className={classNames(style.root, !resize && style.fixed)}
      style={{
        transform: resize ? 'none' : `scale(${windowSize.x}, ${windowSize.y})`
      }}
    >
      <main className={style.main}>
        {
          (auth || getToken())
            ? 
              <Suspense fallback={<Loader />}>
                <Routes>
                  {router.map(item => (
                    <Route key={new Date().getTime()} path={item.path} element={item.element} />
                  ))}
                </Routes>
              </Suspense>
            :
              <Login />
        }
        {notification && <Notification data={notification} />}
      </main>
    </div>
  )
}

export default App
