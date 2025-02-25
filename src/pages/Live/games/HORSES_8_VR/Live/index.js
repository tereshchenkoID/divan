import React from 'react'
import { useTranslation } from 'react-i18next'

import style from './index.module.scss'

const Live = () => {
  const { t } = useTranslation()

  return (
    <div className={style.block}>
      <div>{t('interface.live')}</div>
    </div>
  )
}

export default Live
