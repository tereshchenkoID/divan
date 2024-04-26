import { useTranslation } from 'react-i18next'
import { getTimerFormat } from 'helpers/getTimerFormat'

const ResultTimer = ({ timer }) => {
  const { t } = useTranslation()

  return (
    <>
      <div>{t('interface.results')}</div>
      <div>{getTimerFormat(timer.next, 0)}</div>
    </>
  )
}

export default ResultTimer
