import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { getHostName } from 'helpers/getHostName'

import Icon from 'components/Icon'
import Goal from 'pages/Live/modules/Modal/Goal'

import classNames from 'classnames'

import style from './index.module.scss'

const Scoreboard = ({ data, timer, period, setVideo }) => {
  const { t } = useTranslation()
  const [score, setScore] = useState([0, 0])
  const [init, setInit] = useState(false)
  const [attack, setAttack] = useState(null)
  const [goal, setGoal] = useState(null)

  const initScene = (scene, timer) => {
    if (!init) {
      // if (!scene.update || scene.update < timer) {
      // }

      // if (scene.update > timer) {
      //   setScore([data.scenes[period - 1].home, data.scenes[period - 1].away])
      // } else {
      // setScore([scene.home, scene.away])
      // }

      setScore([scene.home, scene.away])
      setInit(true)
      setVideo(scene.video)
    }

    if(timer % 15) {
      setVideo(scene.video)
    }

    if (scene.update === timer) {
      setGoal(scene.home > score[0] ? data.teams.home.name : data.teams.away.name)
      setScore([scene.home, scene.away])

      setTimeout(() => {
        setGoal(null)
      }, 3000)
    }
  }

  useEffect(() => {
    if (data?.scenes && timer !== 0) {
      initScene(data.scenes[period], timer)
      setAttack(data.scenes[period]?.team)
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
