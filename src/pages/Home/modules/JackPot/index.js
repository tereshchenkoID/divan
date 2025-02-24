import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { getData } from 'hooks/useRequest'
import useSocket from 'hooks/useSocket'

import Slider from 'react-slick'

import classNames from 'classnames'

import { checkCmd } from 'helpers/checkCmd'
import { getDifferent } from 'helpers/getDifferent'
import { getToken } from 'helpers/getToken'

import Banner from './Banner'

import style from './index.module.scss'

const JackPot = ({ size = 'default' }) => {
  const { sendMessage } = useSocket()

  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const [timer, setTimer] = useState('')

  const { resize } = useSelector(state => state.resize)
  const { delta } = useSelector(state => state.delta)
  const { socket, isConnected, receivedMessage } = useSelector(state => state.socket)

  const init = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: resize ? 1 : 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
  }

  useEffect(() => {
    if (isConnected) {
      sendMessage({
        cmd: `account/${getToken()}/jackpots`,
      })
    } else {
      getData(`/jackpots`).then(json => {
        if (json) {
          setData(json)
          setLoading(false)
        }
      })
    }
  }, [isConnected])

  useEffect(() => {
    if (receivedMessage !== '' && checkCmd('jackpots', receivedMessage.cmd)) {
      setData(receivedMessage)
      setLoading(false)
    }
  }, [receivedMessage])

  useEffect(() => {
    if (isConnected) {
      const a = setInterval(() => {
        let r = getDifferent(data.nextUpdate, delta)
        setTimer(r)

        if (r === '0') {
          clearInterval(a)
          sendMessage({
            cmd: `account/${getToken()}/jackpots`,
          })
        }
      }, 1000)

      return () => {
        setTimer('')
        clearInterval(a)
      }
    } else {
      const a = setInterval(() => {
        let r = getDifferent(data.nextUpdate, delta)
        setTimer(r)

        if (r === '0') {
          clearInterval(a)
          getData(`/jackpots`).then(json => {
            if (json) {
              setData(json)
            }
          })
        }
      }, 1000)

      return () => {
        setTimer('')
        clearInterval(a)
      }
    }
  }, [socket, data])

  return (
    <div className={classNames(style.block, style[size])}>
      {!loading && (
        <Slider {...init}>
          {data?.jackpots.map((el, idx) => (
            <div key={idx} className={style.banner}>
              <Banner data={el} timer={timer} />
            </div>
          ))}
        </Slider>
      )}
    </div>
  )
}

export default JackPot
