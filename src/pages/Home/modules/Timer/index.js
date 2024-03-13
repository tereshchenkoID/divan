import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { setLive } from 'store/HOME/actions/liveAction'
import { setLiveTimer } from 'store/HOME/actions/liveTimerAction'

import { convertTime } from 'helpers/convertTime'

import MatchTimer from './MatchTimer'
import StartTimer from './StartTimer'
import ResultTimer from './ResultTimer'

import style from './index.module.scss'

const Timer = ({ data, type }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { live } = useSelector(state => state.live)
  const { delta } = useSelector(state => state.delta)

  useEffect(() => {}, [delta])

  useEffect(() => {
    return () => {
      dispatch(setLiveTimer(0))
      dispatch(setLive(1))
    }
  }, [])

  if (!live) {
    return false
  }

  return (
    <div className={style.block}>
      <div className={style.top}>
        {live === 1 && <StartTimer data={data} delta={delta} />}
        {live === 2 && t('interface.live')}
      </div>
      <div className={style.bottom}>
        {live === 1 && <div>{convertTime(data.start, delta)}</div>}
        {live === 2 && <MatchTimer delta={delta} type={type} />}
        {live === 3 && <ResultTimer delta={delta} />}
        {live === 4 && <div>{t('interface.results')}</div>}
      </div>
    </div>
  )
}

export default Timer
