import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { matchStatus } from 'constant/config'

import { getDifferentPeriod } from 'helpers/getDifferentPeriod'
import { calculatePeriod } from 'helpers/calculatePeriod'

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
  const { delta } = useSelector(state => state.delta)
  const [isLoading, setIsLoading] = useState(false)
  const [preloadedVideos, setPreloadedVideos] = useState([])

  const videoRef = useRef(null)

  const loadVideos = async () => {
    const countFrom =
      data.event.status === matchStatus.PROGRESS ? getDifferentPeriod(data.event.start, data.event.nextUpdate, delta) : 0
    const preloadedUrls = await preloadVideos(video.slice(calculatePeriod(countFrom, 15), video.length))
    const preloadedCounts = data.event.league.matches[0].scenes.length - preloadedUrls.length
    const nullArray = Array(preloadedCounts).fill(null)
    setPreloadedVideos(nullArray.fill(null).concat(preloadedUrls))
  }

  useEffect(() => {
    video && loadVideos()
  }, [data.event.id])

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
