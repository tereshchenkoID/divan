import Label from 'components/Label'
import ForecastTrincast from './ForecastTrincast'
import Races from './Races'
import Odd from '../Odd'

import style from './index.module.scss'

const Numbers = ({ data }) => {
  return (
    <div className={style.block}>
      <div className={style.panel}>
        <Label text={'Winner'} />
        <div className={style.table}>
          <div className={style.row}>
            {data.race.odds.markets[0].outcomes.map((el, idx) => (
              <div key={idx} className={style.cell}>
                <Odd
                  market={data.race.odds.markets[0].printname}
                  start={data.start}
                  data={el}
                  view={'horizontal'}
                  roundId={data.race.id}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={style.panel}>
        <Label text={'Place'} size={'sm'} />
        <div className={style.table}>
          <div className={style.row}>
            {data.race.odds.markets[1].outcomes.map((el, idx) => (
              <div key={idx} className={style.cell}>
                <Odd
                  market={data.race.odds.markets[1].printname}
                  start={data.start}
                  data={el}
                  view={'horizontal'}
                  roundId={data.race.id}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={style.panel}>
        <Label text={'Show'} size={'sm'} />
        <div className={style.table}>
          <div className={style.row}>
            {data.race.odds.markets[2].outcomes.map((el, idx) => (
              <div key={idx} className={style.cell}>
                <Odd
                  market={data.race.odds.markets[2].printname}
                  start={data.start}
                  data={el}
                  view={'horizontal'}
                  roundId={data.race.id}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={style.panel}>
        <Label text={'Forecast/Trincast'} size={'sm'} />
        <ForecastTrincast data={data} />
      </div>

      <Races data={data} />
    </div>
  )
}

export default Numbers
