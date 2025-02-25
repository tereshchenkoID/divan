import React from 'react'
import { useTranslation } from 'react-i18next'

import style from './index.module.scss'

const Timer = ({ timer }) => {
  const { t } = useTranslation()

  return (
    <div className={style.block}>
      <div className={style.top}>{t('interface.live')}</div>
      <div className={style.bottom}>{timer}&apos;</div>
    </div>
  )
}

export default Timer
