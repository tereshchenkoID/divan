import React from 'react'
import { useTranslation } from 'react-i18next'

import Label from '../../../modules/Label'
import Odd from '../Odd'

import style from './index.module.scss'
const Statistics = ({ data }) => {
  const { t } = useTranslation()

  return (
    <>
      <Label text={t('interface.late_numbers')} />
      <div className={style.row}>
        {data.statistics.late.map((el, idx) => (
          <div key={idx} className={style.cell}>
            <Odd color={el.color} data={el.num} size={'md'} />
            <div>{el.count}</div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Statistics
