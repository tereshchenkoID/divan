import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { convertTime } from 'helpers/convertTime'
import { setLiveTimer } from 'store/HOME/actions/liveTimerAction'
import { setProgress } from 'store/LIVE/actions/progressAction'

import MatchTimer from './MatchTimer'
import StartTimer from './StartTimer'
import ResultTimer from './ResultTimer'

import style from './index.module.scss'

const Timer = ({ data, type }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { progress } = useSelector(state => state.progress)
  const { delta } = useSelector(state => state.delta)

  useEffect(() => {}, [delta])

  useEffect(() => {
    return () => {
      dispatch(setLiveTimer(0))
      dispatch(setProgress(1))
    }
  }, [])

  if (!progress) {
    return false
  }

  return (
    <div className={style.block}>
      <div className={style.top}>
        {progress === 1 && <StartTimer data={data} delta={delta} type={type} />}
        {progress === 2 && t('interface.live')}
      </div>
      <div className={style.bottom}>
        {progress === 1 && <div>{convertTime(data.start, delta)}</div>}
        {progress === 2 && <MatchTimer data={data} delta={delta} type={type} />}
        {progress === 3 && <ResultTimer data={data} delta={delta} type={type} />}
        {progress === 4 && <div>{t('interface.results')}</div>}
      </div>
    </div>
  )
}

export default Timer
