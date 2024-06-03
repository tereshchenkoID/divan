import { useEffect, useState } from 'react'

import { getHostName } from 'helpers/getHostName'

import classNames from 'classnames'

import style from './index.module.scss'

const Match = ({ index, data, timer, period }) => {
  const [score, setScore] = useState([0, 0])
  const [active, setActive] = useState(false)
  const [init, setInit] = useState(false)

  const initScene = (scene, timer) => {
    if (!init) {
      // if (!scene.update || scene.update < timer) {
      //   setScore([scene.home, scene.away])
      // }

      // if (scene.update > timer) {
      //   setScore([data.scenes[Math.max(period - 1, 0)].home, data.scenes[Math.max(period - 1, 0)].away])
      // } else {
      setScore([scene.home, scene.away])
      // }

      setInit(true)
    }

    if (scene.update === timer) {
      setActive(true)
      setScore([scene.home, scene.away])

      setTimeout(() => {
        setActive(false)
      }, 1000)
    }
  }

  useEffect(() => {
    if (data?.scenes && timer !== 0) {
      initScene(data.scenes[period], timer)
    }
  }, [data.scenes, timer, period])

  return (
    <div className={classNames(style.block, active && style.active)}>
      <div className={style.cell}>{index + 1}.</div>
      <div className={style.cell}>
        <div className={style.logo}>
          <img src={`${getHostName('ASSETS')}/${data.teams.home.img}`} alt={data.teams.home.name} loading={'lazy'} />
        </div>
      </div>
      <div className={style.cell}>{data.teams.home.name}</div>
      <div className={style.cell}>
        <div className={classNames(style.score, score[0] > score[1] && style.win)}>{score[0]}</div>
      </div>
      <div className={style.cell}>-</div>
      <div className={style.cell}>
        <div className={classNames(style.score, score[1] > score[0] && style.win)}>{score[1]}</div>
      </div>
      <div className={style.cell}>{data.teams.away.name}</div>
      <div className={style.cell}>
        <div className={style.logo}>
          <img src={`${getHostName('ASSETS')}/${data.teams.away.img}`} alt={data.teams.away.name} loading={'lazy'} />
        </div>
      </div>
    </div>
  )
}

export default Match
