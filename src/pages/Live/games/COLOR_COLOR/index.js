import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import Alert from '../../modules/Alert'
import Table from './Table'

import style from './index.module.scss'

const Page = () => {
  const { t } = useTranslation()
  const { tv } = useSelector(state => state.tv)

  return (
    <div className={style.block}>{tv.event ? <Table data={tv.event} /> : <Alert text={t('notification.events_not_found')} type={'default'} />}</div>
  )
}

export default Page
