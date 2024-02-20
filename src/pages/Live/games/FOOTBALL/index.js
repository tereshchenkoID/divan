import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import Alert from '../../modules/Alert'
import Translation from './Translation'
import Table from './Table'
import Live from './Live'

import style from './index.module.scss'

const Page = () => {
  const { t } = useTranslation()
  const { tv } = useSelector(state => state.tv)
  const { game } = useSelector(state => state.game)
  const { progress } = useSelector(state => state.progress)
  const { liveTimer } = useSelector(state => state.liveTimer)
  const { settings } = useSelector(state => state.settings)

  return (
    <div className={style.block}>
      {tv.event ? (
        <div className={style.wrapper}>
          {settings.account.mode === '1' && progress === 2 && liveTimer !== 0 && <Translation game={game} />}
          {progress === 1 ? <Table data={tv.event} /> : <Live data={tv.event} />}
        </div>
      ) : (
        <Alert text={t('notification.events_not_found')} type={'default'} />
      )}
    </div>
  )
}

export default Page
