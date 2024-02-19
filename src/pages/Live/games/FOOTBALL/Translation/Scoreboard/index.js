import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { hostnames } from 'constant/config'

import classNames from 'classnames'

import style from './index.module.scss'

const Scoreboard = ({ data, timer, setVideo, videoRef }) => {
  const { t } = useTranslation()
  const [score, setScore] = useState([0, 0])

  const initScene = (scenes, timer) => {
    const TIME = 90
    const DELAY = Math.ceil(TIME / scenes.length)
    const i = timer > DELAY ? Math.ceil(Number(timer) / DELAY) - 1 : 0
    const f = scenes[i]

    if (f.update === timer) {
      setScore([f.home, f.away])
    }
    setVideo(f.video)
  }

  useEffect(() => {
    if (data && data.scenes && timer !== 0) {
      initScene(data.scenes, timer)
    }

    // console.log(timer)

    if (timer === 90) {
      // if (videoRef.current) {
      //     videoRef.current.pause()
      // }
      setVideo(null)
    }
  }, [timer])

  return (
    <div className={style.block}>
      <div className={style.top}>
        <div className={style.cell}>
          <img
            src={`${hostnames.ASSETS}/${data.teams.home.img}`}
            alt={data.teams.home.name}
            loading={'lazy'}
          />
        </div>
        <div className={style.cell}>
          <div className={style.scoreboard}>
            <div>{data.teams.home.name}</div>
            <div
              className={classNames(
                style.score,
                score[0] > score[1] && style.win,
              )}
            >
              {score[0]}
            </div>
            <div>-</div>
            <div
              className={classNames(
                style.score,
                score[1] > score[0] && style.win,
              )}
            >
              {score[1]}
            </div>
            <div>{data.teams.away.name}</div>
          </div>
        </div>
        <div className={style.cell}>
          <img
            src={`${hostnames.ASSETS}/${data.teams.away.img}`}
            alt={data.teams.away.name}
            loading={'lazy'}
          />
        </div>
      </div>
      <div className={style.bottom}>
        <div className={style.cell}>
          {timer < 45 ? `1 ${t('interface.half')}` : `2 ${t('interface.half')}`}
        </div>
      </div>
    </div>
  )
}

export default Scoreboard
