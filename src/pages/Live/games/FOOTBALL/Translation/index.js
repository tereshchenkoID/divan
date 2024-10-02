import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import Scoreboard from './Scoreboard'
import Timer from './Timer'
import Meta from './Meta'

import style from './index.module.scss'

const Translation = () => {
  const { tv } = useSelector(state => state.tv)
  const { settings } = useSelector(state => state.settings)
  const { liveTimer } = useSelector(state => state.liveTimer)
  const [video, setVideo] = useState()
  const videoRef = useRef(null)
  const stingerRef = useRef(null)

  useEffect(() => {
    const playPromise = videoRef.current?.play()

    if (playPromise !== undefined) {
      playPromise
        .then(_ => {})
        .catch(error => {
          console.log(error)
        })
    }
  }, [video])

  return (
    <div className={style.block}>
      <video className={style.video} src={video} ref={videoRef} muted />
      <video className={style.decor} src={settings.account.transition} ref={stingerRef} muted />
      <div>
        <div className={style.info}>
          <Scoreboard data={tv.event.league.matches[0]} timer={liveTimer} setVideo={setVideo} stingerRef={stingerRef} />
          <Timer timer={liveTimer} />
        </div>
      </div>
      <div className={style.meta}>
        <Meta data={tv} />
      </div>
    </div>
  )
}

export default Translation
