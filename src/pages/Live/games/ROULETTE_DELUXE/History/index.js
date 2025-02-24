import React from 'react'
import { useTranslation } from 'react-i18next'

import { data } from 'data/ROULETTE'

import classNames from 'classnames'

import Label from 'components/Label'
import Odd from '../Odd'

import style from './index.module.scss'

const History = ({ history }) => {
  const { t } = useTranslation()

  return (
    <div>
      <Label 
        text={t('interface.history')} 
        size={'xs'}
      />
      <div className={style.row}>
        {history.history.map((el, idx) => (
          <React.Fragment key={idx}>
            <div className={style.cell}>#{el.id}</div>
            <div className={classNames(style.cell, style.center)}>
              <Odd type={data.chips[el.results].color} number={el.results} />
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default History
