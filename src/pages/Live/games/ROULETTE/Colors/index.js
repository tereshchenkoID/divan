import React from 'react'

import Label from 'components/Label'
import Odd from '../Odd'

import style from './index.module.scss'

const Colors = ({ data }) => {
  return (
    <div>
      <Label text={'Colors'} />
      <div className={style.row}>
        {data.statistics.colors.map((el, idx) => (
          <div key={idx} className={style.cell}>
            <Odd type={el.num} number={el.count} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Colors
