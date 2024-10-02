import React from 'react'
import { useTranslation } from 'react-i18next'

import { odds } from '../data'

import classNames from 'classnames'

import Label from 'components/Label'
import Odd from '../Odd'

import style from './index.module.scss'

const History = ({ data }) => {
  const { t } = useTranslation()

  return (
    <div>
      <Label text={t('interface.history')} />
      <div className={style.row}>
        {data.history.map((el, idx) => (
          <React.Fragment key={idx}>
            <div className={style.cell}>#{el.id}</div>
            <div className={classNames(style.cell, style.center)}>
              <Odd type={odds[el.results].color} number={el.results} />
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default History
