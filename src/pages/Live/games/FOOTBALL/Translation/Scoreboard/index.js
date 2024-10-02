import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import Icon from 'components/Icon'
import Goal from 'pages/Live/modules/Modal/Goal'

import { getHostName } from 'helpers/getHostName'

import style from './index.module.scss'

const Scoreboard = ({ data, timer, setVideo, stingerRef }) => {
  const { t } = useTranslation()
  const [score, setScore] = useState([0, 0])
  const [attack, setAttack] = useState(null)
  const [goal, setGoal] = useState(null)

  const initScene = (scenes, timer) => {
    const TIME = 90
    const DELAY = Math.ceil(TIME / scenes.length)
    const i = timer > DELAY ? Math.ceil(Number(timer) / DELAY) - 1 : 0
    const f = scenes[i]
    const period = (i + 1) * DELAY

    setAttack(f.team)

    if (f.update === timer) {
      setGoal(f.home > score[0] ? data.teams.home.name : data.teams.away.name)
      setScore([f.home, f.away])

      setTimeout(() => {
        setGoal(null)
      }, 3000)
    }
    
    setVideo(f.video)

    if (timer === period && timer !== 0 && timer !== 90) {
      stingerRef.current.play()
    }
  }

  useEffect(() => {
    if (data && data.scenes && timer !== 0) {
      initScene(data.scenes, timer)
    }

    if (timer === 90) {
      setVideo(null)
      setAttack(null)
    }
  }, [timer])

  return (
    <div className={style.block}>
      <div className={style.top}>
        <div className={style.cell}>
          <img src={`${getHostName('ASSETS')}/${data.teams.home.img}`} alt={data.teams.home.name} loading={'lazy'} />
        </div>
        <div className={style.cell}>
          <div className={style.scoreboard}>
            <div>
              <div className={classNames(style.name, attack === 0 && style.active)}>
                {data.teams.home.name}
              </div>
              {
                attack === 0 &&
                <div className={style.icon}>
                  <Icon id={'angle-left'} />
                </div>
              }
            </div>
            <div className={classNames(style.score, score[0] > score[1] && style.win)}>{score[0]}</div>
            <div>-</div>
            <div className={classNames(style.score, score[1] > score[0] && style.win)}>{score[1]}</div>
            <div>
              <div className={classNames(style.name, attack === 1 && style.active)}>
                {data.teams.away.name}
              </div>
              {
                attack === 1 &&
                <div className={classNames(style.icon, style.reverse)}>
                  <Icon id={'angle-left'} />
                </div>
              }
            </div>
          </div>
        </div>
        <div className={style.cell}>
          <img src={`${getHostName('ASSETS')}/${data.teams.away.img}`} alt={data.teams.away.name} loading={'lazy'} />
        </div>
      </div>
      <div className={style.bottom}>
        <div className={style.cell}>{timer < 45 ? `1 ${t('interface.half')}` : `2 ${t('interface.half')}`}</div>
      </div>
      <Goal team={goal}/>
    </div>
  )
}

export default Scoreboard
