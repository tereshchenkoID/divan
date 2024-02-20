import { useEffect, useState } from 'react'

import { hostnames } from 'constant/config'

import classNames from 'classnames'

import style from './index.module.scss'

const Match = ({ index, data, timer }) => {
  const [score, setScore] = useState([0, 0])
  const [active, setActive] = useState(false)

  const initScene = (scenes, timer) => {
    const TIME = 90
    const DELAY = Math.ceil(TIME / scenes.length)
    const i = timer > DELAY ? Math.ceil(Number(timer) / DELAY) - 1 : 0
    const f = scenes[i]

    if (f.update === timer) {
      setActive(true)
      setScore([f.home, f.away])

      setTimeout(() => {
        setActive(false)
      }, 1000)
    }
  }

  useEffect(() => {
    data && data.scenes && timer !== 0 && initScene(data.scenes, timer)
  }, [timer])

  return (
    <div className={classNames(style.block, active && style.active)}>
      <div className={style.cell}>{index + 1}.</div>
      <div className={style.cell}>
        <div className={style.logo}>
          <img src={`${hostnames.ASSETS}/${data.teams.home.img}`} alt={data.teams.home.name} loading={'lazy'} />
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
          <img src={`${hostnames.ASSETS}/${data.teams.away.img}`} alt={data.teams.away.name} loading={'lazy'} />
        </div>
      </div>
    </div>
  )
}

export default Match
