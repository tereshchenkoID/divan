import React from 'react'

import Label from 'components/Label'
import Odd from '../Odd'

import style from './index.module.scss'

const Dozens = ({ data }) => {
  return (
    <div className={style.block}>
      <Label text={'Dozens'} />
      <div className={style.row}>
        {data.statistics.dozens.map((el, idx) => (
          <div key={idx} className={style.cell}>
            {el.num}

            <Odd number={el.count} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dozens
