import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { getHostName } from 'helpers/getHostName'

import classNames from 'classnames'

import style from './index.module.scss'

const Scoreboard = ({ data, timer, period }) => {
  const { t } = useTranslation()
  const [score, setScore] = useState([0, 0])
  const [init, setInit] = useState(false)

  const initScene = (scene, timer) => {
    if (!init) {
      // if (!scene.update || scene.update < timer) {
      // }

      // if (scene.update > timer) {
      //   setScore([data.scenes[period - 1].home, data.scenes[period - 1].away])
      // } else {
      setScore([scene.home, scene.away])
      // }

      setInit(true)
    }

    if (scene.update === timer) {
      setScore([scene.home, scene.away])
    }
  }

  useEffect(() => {
    if (data?.scenes && timer !== 0) {
      initScene(data.scenes[period], timer)
    }
  }, [data.scenes, timer, period])

  return (
    <div className={style.block}>
      <div className={style.top}>
        <div className={style.cell}>
          <img src={`${getHostName('ASSETS')}/${data.teams.home.img}`} alt={data.teams.home.name} loading={'lazy'} />
        </div>
        <div className={style.cell}>
          <div className={style.scoreboard}>
            <div>{data.teams.home.name}</div>
            <div className={classNames(style.score, score[0] > score[1] && style.win)}>{score[0]}</div>
            <div>-</div>
            <div className={classNames(style.score, score[1] > score[0] && style.win)}>{score[1]}</div>
            <div>{data.teams.away.name}</div>
          </div>
        </div>
        <div className={style.cell}>
          <img src={`${getHostName('ASSETS')}/${data.teams.away.img}`} alt={data.teams.away.name} loading={'lazy'} />
        </div>
      </div>
      <div className={style.bottom}>
        <div className={style.cell}>{timer < 45 ? `1 ${t('interface.half')}` : `2 ${t('interface.half')}`}</div>
      </div>
    </div>
  )
}

export default Scoreboard
