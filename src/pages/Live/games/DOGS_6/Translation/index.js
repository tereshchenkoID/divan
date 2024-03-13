import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

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
  const videoRef = useRef(null)

  useEffect(() => {
    const { current: videoElement } = videoRef

    if (videoElement) {
      videoElement.currentTime = getDifferent(data.event.start, data.event.nextUpdate, delta)
      videoElement.play()
    }
  }, [videoRef])

  if (!video) return false

  return (
    <div className={style.block}>
      <video className={style.video} src={video} ref={videoRef} muted />
    </div>
  )
}

export default Translation
