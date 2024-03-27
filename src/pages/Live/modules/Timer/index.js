import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'

import { gameType, matchStatus } from 'constant/config'

import { convertTime } from 'helpers/convertTime'
import { getDifferent } from 'helpers/getDifferent'
import { getDifferentPeriod } from 'helpers/getDifferentPeriod'

import { setModal } from 'store/actions/modalAction'
import { setTv } from 'store/LIVE/actions/tvAction'
import { setProgress } from 'store/LIVE/actions/progressAction'
import { setLiveTimer } from 'store/HOME/actions/liveTimerAction'

import MatchTimer from './MatchTimer'
import StartTimer from './StartTimer'
import ResultTimer from './ResultTimer'

import style from './index.module.scss'

const checkType = (start, end, delta, type) => {
  if (type === gameType.FOOTBALL_LEAGUE || type === gameType.FOOTBALL) {
    return getDifferentPeriod(start, end, delta)
  } else {
    return getDifferent(end, delta)
  }
}

const Timer = ({ timer, initTime }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { game } = useSelector(state => state.game)
  const { progress } = useSelector(state => state.progress)
  const { delta } = useSelector(state => state.delta)
  const { tv } = useSelector(state => state.tv)
  const [isRequesting, setIsRequesting] = useState(false)

  useEffect(() => {
    if (!isRequesting) {
      if (progress === 1) {
        const time = timer.time.split(':')
        if (Number(time[0]) === 0 && Number(time[1]) < 4 && Number(time[1]) > 0) {
          dispatch(setModal(1))
        }
      }

      if (new Date().getTime() + delta > tv.event.nextUpdate) {
        setIsRequesting(true)

        dispatch(setTv(`${game.type}/${game.id}`))
          .then(json => {
            if (progress === 1 && json.event.status === matchStatus.PROGRESS) {
              initTime(json.event)
              dispatch(setProgress(2))
              dispatch(setModal(0))
            }
            if (progress === 2 && json.event.status === matchStatus.RESULTS) {
              initTime(json.event)
              dispatch(setProgress(3))
              dispatch(setLiveTimer(0))
            }
            if (progress === 3 && json.event.status === matchStatus.ANNOUNCEMENT) {
              initTime(json.event)
              dispatch(setProgress(1))
            }
            setIsRequesting(false)
          })
          .catch(error => {
            setIsRequesting(false)
            console.error('Error:', error)
          })
      }
    }
  }, [dispatch, progress, game, tv, delta, timer])

  useEffect(() => {
    let r = checkType(tv.event.start, tv.event.nextUpdate, delta, game.type)
    dispatch(setLiveTimer(r))
  }, [dispatch, delta, game, timer, tv])

  if (!progress) {
    return false
  }

  return (
    <div className={style.block}>
      <div className={style.top}>
        {progress === 1 && <StartTimer timer={timer} />}
        {progress === 2 && t('interface.live')}
      </div>
      <div className={style.bottom}>
        {progress === 1 && <div>{convertTime(tv.event.start, delta)}</div>}
        {progress === 2 && <MatchTimer />}
        {progress === 3 && <ResultTimer timer={timer} />}
        {progress === 4 && <div>{t('interface.results')}</div>}
      </div>
    </div>
  )
}

export default Timer
