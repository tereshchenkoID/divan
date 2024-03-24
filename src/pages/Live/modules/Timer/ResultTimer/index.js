import { useTranslation } from 'react-i18next'

const ResultTimer = ({ timer }) => {
  const { t } = useTranslation()

  return (
    <>
      <div>{t('interface.results')}</div>
      <div>{timer.time}</div>
    </>
  )
}

export default ResultTimer
