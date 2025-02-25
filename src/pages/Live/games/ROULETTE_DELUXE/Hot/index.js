import React from 'react'

import { data } from 'data/ROULETTE'

import Label from 'components/Label'
import Odd from '../Odd'

import style from './index.module.scss'

const Hot = ({ history }) => {
  return (
    <div className={style.block}>
      <Label 
        text={'Hot & Cold'} 
        size={'xs'}
      />
      <div className={style.row}>
        <div className={style.cell}>Hot</div>
        {history.statistics.hot.map((el, idx) => (
          <div key={idx} className={style.cell}>
            <Odd type={data.chips[el.num].color} number={el.num} />
          </div>
        ))}
        <div className={style.cell}>Cold</div>
        {history.statistics.cold.map((el, idx) => (
          <div key={idx} className={style.cell}>
            <Odd type={data.chips[el.num].color} number={el.num} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Hot
