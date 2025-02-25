import React from 'react'

import Odd from './Odd'

import style from './index.module.scss'

const Colors = ({ data, colors, setColors }) => {
  return (
    <div className={style.block}>
      <div>
        {data.round.odds.markets[3].outcomes.map((el, idx) => (
          <div key={idx} className={style.cell}>
            <Odd
              data={el}
              color={el.a.toLowerCase()}
              size={'lg'}
              date={colors}
              action={setColors}
              market={data.round.odds.markets[3].name}
              print={data.round.odds.markets[3].printname}
            />
          </div>
        ))}
      </div>
      <div>
        <div>
          {data.round.odds.markets[4].outcomes.map((el, idx) => (
            <div key={idx} className={style.cell}>
              <Odd
                data={el}
                color={'blue'}
                date={colors}
                action={setColors}
                market={data.round.odds.markets[4].name}
                print={data.round.odds.markets[4].printname}
              />
            </div>
          ))}
        </div>
        <div>
          {data.round.odds.markets[5].outcomes.map((el, idx) => (
            <div key={idx} className={style.cell}>
              <Odd
                data={el}
                color={'red'}
                date={colors}
                action={setColors}
                market={data.round.odds.markets[5].name}
                print={data.round.odds.markets[5].printname}
              />
            </div>
          ))}
        </div>
        <div>
          {data.round.odds.markets[6].outcomes.map((el, idx) => (
            <div key={idx} className={style.cell}>
              <Odd
                data={el}
                color={'yellow'}
                date={colors}
                action={setColors}
                market={data.round.odds.markets[6].name}
                print={data.round.odds.markets[6].printname}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Colors
