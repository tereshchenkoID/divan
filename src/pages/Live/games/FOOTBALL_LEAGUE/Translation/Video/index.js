import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import style from './index.module.scss'

const preloadVideos = async urls => {
  const videoPromises = urls.map(async url => {
    const response = await fetch(url, { mode: 'cors' })
    const videoBlob = await response.blob()
    return URL.createObjectURL(videoBlob)
  })
  return Promise.all(videoPromises)
}

const Video = ({ data, period, time }) => {
  const { progress } = useSelector(state => state.progress)
  const { video } = useSelector(state => state.video)
  const [isLoading, setIsLoading] = useState(false)
  const [preloadedVideos, setPreloadedVideos] = useState([])

  const videoRef = useRef(null)

  const loadVideos = async () => {
    const preloadedUrls = await preloadVideos(video)
    const preloadedCounts = data.event.league.matches[0].scenes.length - preloadedUrls.length
    const nullArray = Array(preloadedCounts).fill(null)

    setPreloadedVideos(nullArray.fill(null).concat(preloadedUrls))
  }

  useEffect(() => {
    if(video.length) {
      loadVideos()
    }
  }, [video])


  useEffect(() => {
    return () => {
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
