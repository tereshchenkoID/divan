import React from 'react'
import { useTranslation } from 'react-i18next'

import Button from 'components/Button'

import style from './index.module.scss'

const SkipModal = ({ action }) => {
  const { t } = useTranslation()

  return (
    <div className={style.block}>
      <Button
        text={t('interface.skip_next_game')}
        initial={[style.button]}
        classes={['green']}
        action={() => {
          action()
        }}
      />
    </div>
  )
}

export default SkipModal
