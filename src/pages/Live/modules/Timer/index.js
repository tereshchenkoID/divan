import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { convertTime } from 'helpers/convertTime'

import MatchTimer from './MatchTimer'
import StartTimer from './StartTimer'
import ResultTimer from './ResultTimer'

import style from './index.module.scss'

const Timer = ({ data, type }) => {
  const { t } = useTranslation()
  const { progress } = useSelector(state => state.progress)
  const { delta } = useSelector(state => state.delta)

  useEffect(() => {}, [delta])

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
