import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import style from './index.module.scss'

import { preloadVideo } from 'helpers/preloadVideo'

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

  const loadVideo = async () => {
    setVideo(await preloadVideo(data.event.race.scenes[0].video))
  }

  useEffect(() => {
    loadVideo()
  }, [])

  useEffect(() => {
    if (video && videoRef.current) {
      console.log(video)
      videoRef.current.src = video
      videoRef.current.load()
      videoRef.current.currentTime = getDifferent(data.event.start, data.event.nextUpdate, delta)

      videoRef.current.play().catch(error => {
        console.error('Error playing video:', error)
      })
    }
  }, [video])

  return (
    <div className={style.block}>
      <video className={style.video} ref={videoRef} muted />
    </div>
  )
}

export default Translation
