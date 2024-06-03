import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import style from './index.module.scss'

const Video = ({ data, preloadedVideos, period, time }) => {
  const { progress } = useSelector(state => state.progress)
  const [isLoading, setIsLoading] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => {
    return () => {
      console.log('Clean')
      preloadedVideos.forEach(url => {
        URL.revokeObjectURL(url)
      })
    }
  }, [data.event.id])

  useEffect(() => {
    if (progress === 2 && preloadedVideos.length > 0 && videoRef.current) {
      videoRef.current.src = preloadedVideos[period]
      videoRef.current.load()

      if (!isLoading) {
        videoRef.current.currentTime = time
        setIsLoading(true)
      }

      videoRef.current.play().catch(error => {
        console.error('Error playing video:', error)
      })
    }
  }, [progress, preloadedVideos, period])

  return (
    progress === 2 && (
      <div className={style.block}>
        <video ref={videoRef} muted />
      </div>
    )
  )
}

export default Video
