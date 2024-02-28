import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { dogsColor, gameType } from 'constant/config'

import { generateCircles } from 'helpers/generateCircles'
import { deleteBetslip, setBetslip } from 'store/HOME/actions/betslipAction'

import classNames from 'classnames'

import Number from '../../Number'

import style from './index.module.scss'

const findBet = (data, id, start) => {
  return data.find(el => {
    return el.id === id && el.start === start
  })
}

const findBets = (data, id) => {
  const r = data.filter(el => {
    return el.a.indexOf(id) === 0
  })

  if (id.length > 1) {
    if (id[0] < id[2]) {
      r.splice(id[0] - 1, 0, {})
      r.splice(id[2] - 1, 0, {})
    } else {
      r.splice(id[2] - 1, 0, {})
      r.splice(id[0] - 1, 0, {})
    }
  } else {
    r.splice(id - 1, 0, {})
  }

  return r
}

const defaultValue = (start, el, market, roundId) => {
  return {
    id: el.id,
    roundId: roundId,
    start: start,
    b: el.b,
    market: market,
    print: market,
    m_old: market,
    o_old: el.a,
    stake: 100,
    circles: generateCircles(el.a, dogsColor),
    type: gameType.DOGS_6,
  }
}

const ForecastTrincast = ({ data }) => {
  const dispatch = useDispatch()
  const { betslip } = useSelector(state => state.betslip)
  const [selectForecast, setForecastSelect] = useState(null)
  const [selectTrincast, setTrincastSelect] = useState(null)
  const [forecast, setForecast] = useState([])
  const [trincast, setTrincast] = useState([])

  const resetActive = () => {
    setForecast([])
    setForecastSelect(null)
    setTrincast([])
    setTrincastSelect(null)
  }

  useEffect(() => {
    resetActive()
  }, [data])

  const addStake = (market, el, step) => {
    const a = betslip.slice(0)

    if (step === 2) {
      if (!findBet(a, el.id, data.start)) {
        dispatch(setBetslip(defaultValue(data.start, el, market, data.race.id)))
      }
    }

    if (step === 3) {
      const f = a.find(e => {
        return e.type === gameType.DOGS_6 && el.a.indexOf(e.o_old) !== -1 && e.start === data.start
      })

      if (f) {
        f.id = el.id
        f.b = el.b
        f.roundId = data.race.id
        f.market = market
        f.print = market
        f.m_old = market
        f.o_old = el.a
        f.circles = generateCircles(el.a, dogsColor)

        dispatch(deleteBetslip(a))
      } else {
        dispatch(setBetslip(defaultValue(data.start, el, market)))
      }

      resetActive()
    }
  }

  const addForecastStake = el => {
    if (selectForecast && el.id === selectForecast.id) {
      resetActive()
    } else {
      setForecastSelect(el)
      setForecast(findBets(data.race.odds.markets[6].outcomes, el.a))
      setTrincast([])
      setTrincastSelect(null)
    }
  }

  const addTrincastStake = el => {
    if (selectTrincast && el.id === selectTrincast.id) {
      const a = betslip.slice(0)
      const f = findBet(a, el.id, data.start)

      if (f) {
        a.splice(a.indexOf(f), 1)
        dispatch(deleteBetslip(a))
        setTrincastSelect(null)
        setTrincast([])
      }
    } else {
      setTrincastSelect(el)
      setTrincast(findBets(data.race.odds.markets[7].outcomes, el.a))
      addStake(data.race.odds.markets[6].printname, el, 2)
    }
  }

  const addFullStake = el => {
    addStake(data.race.odds.markets[7].printname, el, 3)
  }

  return (
    <div className={style.block}>
      <div className={style.table}>
        <div className={style.row}>
          <div className={style.cell}>1</div>
          {data.race.odds.markets[0].outcomes.map((el, idx) => (
            <div
              key={idx}
              className={classNames(style.cell, (selectForecast && selectForecast.a) === el.a && style.active)}
              onClick={() => {
                addForecastStake(el)
              }}
            >
              <Number key={idx} color={idx} data={idx + 1} />
              {el.b}
            </div>
          ))}
        </div>
        <div className={style.row}>
          <div className={style.cell}>2</div>
          {forecast.map((el, idx) =>
            el.b ? (
              <div
                key={idx}
                className={classNames(style.cell, (selectTrincast && selectTrincast.a) === el.a && style.active)}
                onClick={() => {
                  addTrincastStake(el)
                }}
              >
                <Number key={idx} color={idx} data={idx + 1} />
                {el.b}
              </div>
            ) : (
              <div key={idx} className={classNames(style.cell, style.disabled)}>
                <Number key={idx} color={idx} data={idx + 1} />
              </div>
            ),
          )}
        </div>
        <div className={style.row}>
          <div className={style.cell}>3</div>
          {trincast.map((el, idx) =>
            el.b ? (
              <div
                key={idx}
                className={style.cell}
                onClick={() => {
                  addFullStake(el)
                }}
              >
                <Number key={idx} color={idx} data={idx + 1} />
                {el.b}
              </div>
            ) : (
              <div key={idx} className={classNames(style.cell, style.disabled)}>
                <Number key={idx} color={idx} data={idx + 1} />
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  )
}

export default ForecastTrincast
