import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import classNames from 'classnames'

import Number from '../Number'

import style from './index.module.scss'

const getDifferent = (start, end, delta) => {
  const s = end - start + delta
  const c = new Date().getTime() + delta
  let result = '0'

  if (end > c) {
    const r = new Date(s - (end - c))
    result = r.getSeconds() + r.getMinutes() * 60
  }

  return result
}

const Translation = ({ data }) => {
  const video = data.event.race.scenes[0].video
  const { delta } = useSelector(state => state.delta)
  const { liveTimer } = useSelector(state => state.liveTimer)
  const [active, setActive] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => {
    const { current: videoElement } = videoRef

    if (videoElement) {
      videoElement.currentTime = getDifferent(data.event.start, data.event.nextUpdate, delta)
      videoElement.muted = true
      videoElement.play()
    }
  }, [videoRef])

  useEffect(() => {
    const [minutes, seconds] = liveTimer?.split(':')
    const totalSeconds = parseInt(minutes, 10) * 60 + parseInt(seconds, 10)

    if (totalSeconds === 10) {
      setActive(true)
    }
  }, [liveTimer])

  if (!video) return false

  return (
    <div className={style.block}>
      <video className={style.video} src={video} ref={videoRef} />
      <div className={classNames(style.footer, active && style.active)}>
        {data.event.race.results?.map((el, idx) => (
          <Number key={idx} color={el - 1} data={el} size={'xl'} />
        ))}
      </div>
    </div>
  )
}

export default Translation
