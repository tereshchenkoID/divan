import Label from '../../../modules/Label'
import Odd from '../Odd'

import style from './index.module.scss'

const Quinella = ({ data }) => {
  return (
    <>
      <Label text={data.race.odds.markets[3].printname} />
      <div className={style.row}>
        {data.race.odds.markets[3].outcomes.map((el, idx) => (
          <div key={idx} className={style.cell}>
            <Odd data={el} view={'horizontal'} />
          </div>
        ))}
      </div>
    </>
  )
}

export default Quinella
