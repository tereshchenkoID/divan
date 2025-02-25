import React from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import style from './index.module.scss'

const Jackpot = () => {
  const { t } = useTranslation()
  const { jackpot } = useSelector(state => state.jackpot)

  return (
    <div className={classNames(style.block, style[jackpot.type.toLowerCase()])}>
      <div className={style.decor}>
        <img src={`/img/decor/LIVE/JACKPOT/${jackpot.type.toLowerCase()}.webp`} alt="Jackpot" loading="lazy" />
      </div>
      <div className={style.title}>{t('interface.jackpot_winner')}!</div>
      <div className={style.jackpot}>
        {jackpot.amount}
        <span>{jackpot.currency}</span>
      </div>
      <div className={style.id}>#{jackpot.ticket}</div>
    </div>
  )
}

export default Jackpot
