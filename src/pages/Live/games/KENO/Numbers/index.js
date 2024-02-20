import React from 'react'

import Label from '../../../modules/Label'

import style from './index.module.scss'

const Numbers = ({ tip, data }) => {
  const tips = data.round.odds.markets[0].outcomes.filter(market => Number(market.a[0]) === tip)

  return (
    <div>
      <Label text={`${tip} tips`} />
      <div className={style.row}>
        <div className={style.cell}>Hits</div>
        <div className={style.cell}>Quotes</div>
        {tips
          .sort((a, b) => b.b - a.b)
          .map(
            (el, idx) =>
              el.b !== 0 && (
                <React.Fragment key={idx}>
                  <div className={style.cell}>{el.a[2]}</div>
                  <div className={style.cell}>{el.b}</div>
                </React.Fragment>
              ),
          )}
      </div>
    </div>
  )
}

export default Numbers
