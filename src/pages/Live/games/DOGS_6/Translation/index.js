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
  const { delta } = useSelector(state => state.delta)
  const [video, setVideo] = useState(null)
  const videoRef = useRef(null)

  useEffect(() => {
    if (!video && videoRef.current) {
      setVideo(data.event.race.scenes[0].video)
      videoRef.current.currentTime = getDifferent(data.event.start, data.event.nextUpdate, delta)

      setTimeout(() => {
        videoRef.current.play()
      }, 500)
    }
  }, [videoRef])

  return (
    <div className={style.block}>
      <video className={style.video} src={video} ref={videoRef} />
    </div>
  )
}

export default Translation
