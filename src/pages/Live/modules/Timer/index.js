import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { setProgress } from 'store/LIVE/actions/progressAction'
import { setTv } from 'store/LIVE/actions/tvAction'

import { convertTime } from 'helpers/convertTime'

import MatchTimer from './MatchTimer'
import StartTimer from './StartTimer'
import ResultTimer from './ResultTimer'

import style from './index.module.scss'

const Timer = ({ data, type }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { progress } = useSelector(state => state.progress)
  const { delta } = useSelector(state => state.delta)
  const { game } = useSelector(state => state.game)

  useEffect(() => {}, [delta])

  useEffect(() => {
    return () => {
      dispatch(setTv(`${type}/${game.id}`))
      dispatch(setProgress(1))
    }
  }, [])

  return (
    <div className={style.block}>
      <div className={style.top}>
        {progress === 1 && <StartTimer data={data} delta={delta} type={type} />}
        {progress === 2 && t('interface.live')}
      </div>
      <div className={style.bottom}>
        {progress === 1 && <div>{convertTime(data.start, delta)}</div>}
        {progress === 2 && <MatchTimer data={data} delta={delta} type={type} />}
        {progress === 3 && (
          <ResultTimer data={data} delta={delta} type={type} />
        )}
        {progress === 4 && <div>{t('interface.results')}</div>}
      </div>
    </div>
  )
}

export default Timer
