import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import Scoreboard from './Scoreboard'
import Timer from './Timer'
import Match from './Match'

import style from './index.module.scss'

const Translation = () => {
  const { tv } = useSelector(state => state.tv)
  // const { settings } = useSelector(state => state.settings)
  const { liveTimer } = useSelector(state => state.liveTimer)
  const [video, setVideo] = useState()
  const stingerRef = useRef(null)

  //settings.account.gif

  return (
    <div className={style.block}>
      {video && <video className={style.video} src={video} autoPlay />}
      <video
        className={style.decor}
        src="https://digital-events.weplay.tv/digital/2023_10_06__09:42:38-cc_mixer.webm"
        ref={stingerRef}
      />
      <div>
        <div className={style.info}>
          <Scoreboard data={tv.event.league.matches[0]} timer={liveTimer} setVideo={setVideo} stingerRef={stingerRef} />
          <Timer timer={liveTimer} />
        </div>
      </div>
      <div className={style.table}>
        {tv.event.league.matches.map((item, index) => (
          <Match key={index} index={index} data={item} timer={liveTimer} />
        ))}
      </div>
    </div>
  )
}

export default Translation
