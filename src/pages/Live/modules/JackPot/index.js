import { hostnames } from 'constant/config'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Slider from 'react-slick'

import { getData } from 'helpers/api'
import { setJackpot } from 'store/LIVE/actions/jackpotAction'

import Banner from './Banner'

import style from './index.module.scss'

const init = {
  fade: true,
  dots: false,
  arrows: false,
  autoplay: true,
  infinite: true,
  speed: 500,
  autoplaySpeed: 15000,
  slidesToShow: 1,
  slidesToScroll: 1,
}

const JackPotWinner = () => {
  const dispatch = useDispatch()
  const token = localStorage.getItem('authToken')
  const [data, setData] = useState(null)
  const [timer, setTimer] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const a = setInterval(() => {
      setTimer(timer + 1)

      if (timer === 15) {
        dispatch(setJackpot(null))
      }

      if (loading || timer === 30) {
        setLoading(false)
        getData(`${hostnames.PROD}/viewer/jackpots/${token}`).then(json => {
          if (json && json.jackpots) {
            setData(json)
          }
          if (json && json.winner) {
            dispatch(setJackpot(json.winner))
          }
        })
      }

      if (timer === 30) {
        clearInterval(a)
        setTimer(0)
      }
    }, 1000)

    return () => {
      clearInterval(a)
    }
  }, [timer])

  if (!data) {
    return false
  }

  return (
    <div className={style.block}>
      <Slider {...init}>
        {data.jackpots.map((el, idx) => (
          <Banner key={idx} data={el} />
        ))}
      </Slider>
    </div>
  )
}

export default JackPotWinner
