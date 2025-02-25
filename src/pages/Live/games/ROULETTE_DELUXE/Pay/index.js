import React from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import Label from 'components/Label'
import Odd from '../Odd'

import style from './index.module.scss'

const Pay = () => {
  const { t } = useTranslation()

  return (
    <div className={style.block}>
      <Label 
        text={t('interface.pay_table')} 
        size={'xs'}
      />
      <div className={style.row}>
        <div className={style.cell}>Color</div>
        <div className={classNames(style.cell, style.center)}>
          <Odd type={'black'} number={2} />
          <Odd type={'red'} number={2} />
        </div>
        <div className={style.cell}>Dozens</div>
        <div className={classNames(style.cell, style.center)}>3</div>
        <div className={style.cell}>Sectors</div>
        <div className={classNames(style.cell, style.center)}>6</div>
        <div className={style.cell}>Even/Odd</div>
        <div className={classNames(style.cell, style.center)}>2</div>
        <div className={style.cell}>Number</div>
        <div className={classNames(style.cell, style.center)}>36</div>
      </div>
    </div>
  )
}

export default Pay
