import { odds } from '../data'

import Label from 'components/Label'
import Odd from '../Odd'

import style from './index.module.scss'

const Hot = ({ data }) => {
  return (
    <div className={style.block}>
      <Label 
        text={'Hot & Cold'} 
        size={'xs'}
      />
      <div className={style.row}>
        <div className={style.cell}>Hot</div>
        {data.statistics.hot.map((el, idx) => (
          <div key={idx} className={style.cell}>
            <Odd type={odds[el.num].color} number={el.num} />
          </div>
        ))}
        <div className={style.cell}>Cold</div>
        {data.statistics.cold.map((el, idx) => (
          <div key={idx} className={style.cell}>
            <Odd type={odds[el.num].color} number={el.num} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Hot
