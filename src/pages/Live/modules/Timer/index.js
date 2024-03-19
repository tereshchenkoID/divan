import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { convertTime } from 'helpers/convertTime'

import MatchTimer from './MatchTimer'
import StartTimer from './StartTimer'
import ResultTimer from './ResultTimer'

import style from './index.module.scss'

const Timer = ({ timer }) => {
  const { t } = useTranslation()
  const { progress } = useSelector(state => state.progress)
  const { delta } = useSelector(state => state.delta)
  const { tv } = useSelector(state => state.tv)

  if (!progress) {
    return false
  }

  return (
    <div className={style.block}>
      <div className={style.top}>
        {progress === 1 && <StartTimer delta={delta} timer={timer} />}
        {progress === 2 && t('interface.live')}
      </div>
      <div className={style.bottom}>
        {progress === 1 && <div>{convertTime(tv.event.start, delta)}</div>}
        {progress === 2 && <MatchTimer delta={delta} timer={timer} />}
        {progress === 3 && <ResultTimer delta={delta} timer={timer} />}
        {progress === 4 && <div>{t('interface.results')}</div>}
      </div>
    </div>
  )
}

export default Timer
