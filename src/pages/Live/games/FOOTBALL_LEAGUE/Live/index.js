import React from 'react'
import { useSelector } from 'react-redux'

import { matchMarkets } from 'constant/config'

import Item from './Item'

import style from './index.module.scss'

const MARKETS = [
  {
    name: 'WINNER',
    value: matchMarkets.WINNER,
  },
  {
    name: 'DOUBLE CHANCE',
    value: matchMarkets.DOUBLE_CHANCE,
  },
  {
    name: 'GOAL/NO GOAL',
    value: matchMarkets.GOAL_NO_GOAL,
  },
  {
    name: 'OV/UN 2.5',
    value: matchMarkets.OVER_UNDER,
  },
  {
    name: 'TOTAL GOALS',
    value: matchMarkets.GOALS,
  },
  {
    name: 'CORRECT SCORE',
    value: matchMarkets.SCORE,
  },
]

const Live = ({ data }) => {
  const { liveTimer } = useSelector(state => state.liveTimer)

  return (
    <div className={style.block}>
      <div className={style.head}>
        <div className={style.cell} />
        <div className={style.cell} />
        <div className={style.cell}>
          <div className={style.odds}>
            {MARKETS.map((el, idx) => (
              <div key={idx} className={style.column}>
                <div>{el.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={style.wrapper}>
        {data.league.matches.map((el, idx) => (
          <Item key={idx} data={el} timer={liveTimer} />
        ))}
      </div>
    </div>
  )
}

export default Live
