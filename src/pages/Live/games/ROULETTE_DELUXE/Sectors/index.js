import { useTranslation } from 'react-i18next'
import { Fragment } from 'react'

import classNames from 'classnames'

import Label from 'components/Label'

import style from './index.module.scss'

const Sectors = ({ data }) => {
  const { t } = useTranslation()

  return (
    <div className={style.block}>
      <Label 
        text={t('interface.sectors')} 
        size={'xs'}
      />
      <div className={style.row}>
        {data.statistics.sector.map((el, idx) => (
          <Fragment key={idx}>
            <div className={style.cell}>{el.num}</div>
            <div className={classNames(style.cell, style.center)}>{el.count}</div>
          </Fragment>
        ))}
      </div>
    </div>
  )
}

export default Sectors
