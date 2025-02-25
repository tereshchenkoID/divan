import React from 'react'

import { data } from 'data/ROULETTE'

import Label from 'components/Label'
import Odd from '../Odd'

import style from './index.module.scss'

const Numbers = ({ history }) => {
  return (
    <div>
      <Label text={'Numbers'} />
      <div className={style.row}>
        {history.statistics.numbers.map((el, idx) => (
          <div key={idx} className={style.cell}>
            <Odd type={data.chips[el.num].color} number={el.num} />
            <div>{el.count}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Numbers
