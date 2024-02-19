import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import Alert from '../../modules/Alert'
import Translation from './Translation'
import Results from './Results'
import Markets from './Markets'
import Live from './Live'

import style from './index.module.scss'

const Table = () => {
  const { t } = useTranslation()
  const { tv } = useSelector(state => state.tv)
  const { progress } = useSelector(state => state.progress)
  const { settings } = useSelector(state => state.settings)
  const { liveTimer } = useSelector(state => state.liveTimer)

  return (
    <div className={style.block}>
      {tv.event ? (
        <>
          {settings.account.mode === '1' &&
            progress === 2 &&
            liveTimer !== 0 && <Translation data={tv} />}
          {progress === 1 && <Markets data={tv.event} />}
          {progress === 2 && <Live />}
          {progress === 3 && <Results data={tv.event} />}
        </>
      ) : (
        <Alert text={t('notification.events_not_found')} type={'default'} />
      )}
    </div>
  )
}

export default Table
