import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import classNames from 'classnames'

import { hostnames, matchMarkets, matchOutcomes } from 'constant/config'

import style from './index.module.scss'

const WINNER = (score, data) => {
  if (score.home > score.away) {
    return data.find(el => {
      return el.a === matchOutcomes.HOME
    })
  } else if (score.home < score.away) {
    return data.find(el => {
      return el.a === matchOutcomes.AWAY
    })
  } else {
    return data.find(el => {
      return el.a === matchOutcomes.DRAW
    })
  }
}

const GOAL_NO_GOAL = (score, data) => {
  let a

  if (score.home > 0 && score.away > 0) {
    a = data.find(el => {
      return el.a === matchOutcomes.GOAL
    })

    a.active = true
  } else {
    a = data.find(el => {
      return el.a === matchOutcomes.NO_GOAL
    })
  }

  return a
}

const GOALS = (score, data) => {
  const r = score.home + score.away
  const f = data.find(el => {
    return parseInt(el.a, 10) === r
  })

  if (f) {
    return f
  } else {
    return data[0]
  }
}

const SCORE = (score, data) => {
  const r = `${score.home}-${score.away}`
  const f = data.find(el => {
    return el.a === r
  })

  if (f) {
    return f
  } else {
    return data.find(el => {
      return el.a === '0-0'
    })
  }
}

const OVER_UNDER = (score, data) => {
  const r = score.home + score.away
  let a

  if (r <= 2) {
    a = data.find(el => {
      return el.a === matchOutcomes.UNDER
    })
  } else {
    a = data.find(el => {
      return el.a === matchOutcomes.OVER
    })

    a.active = true
  }

  return a
}

const DOUBLE_CHANCE = (score, data) => {
  let r = []

  // eslint-disable-next-line array-callback-return
  data.map(el => {
    if (score.home === score.away) {
      if (el.c === matchOutcomes['1X'] || el.c === matchOutcomes['X2']) {
        r.push(el)
      }
    } else if (score.home > score.away) {
      if (el.c === matchOutcomes['1X'] || el.c === matchOutcomes['12']) {
        r.push(el)
      }
    } else if (score.home < score.away) {
      if (el.c === matchOutcomes['12'] || el.c === matchOutcomes['X2']) {
        r.push(el)
      }
    }
  })

  return r
}

const getOdds = (type, data, score) => {
  let a
  switch (type) {
    case matchMarkets.WINNER:
      a = WINNER(score, data)
      break
    case matchMarkets.DOUBLE_CHANCE:
      a = DOUBLE_CHANCE(score, data)
      break
    case matchMarkets.GOAL_NO_GOAL:
      a = GOAL_NO_GOAL(score, data)
      break
    case matchMarkets.OVER_UNDER:
      a = OVER_UNDER(score, data)
      break
    case matchMarkets.GOALS:
      a = GOALS(score, data)
      break
    case matchMarkets.SCORE:
      a = SCORE(score, data)
      break
    default:
      return ''
  }

  return a
}

const goalsMarket = data => {
  const r = {
    headers: [],
    outcomes: [],
  }

  // eslint-disable-next-line array-callback-return
  data.markets.map((el_m, idx_m) => {
    if (idx_m === 0) {
      r.name = el_m.name
      r.printname = el_m.printname
    }
    r.headers.push(el_m.headers[0])

    // eslint-disable-next-line array-callback-return
    el_m.outcomes.map(el_o => {
      r.outcomes.push(el_o)
    })
  })

  return r
}

const Item = ({ data, timer }) => {
  const { live } = useSelector(state => state.live)

  const [init, setInit] = useState(true)
  const [active, setActive] = useState(false)
  const [score, setScore] = useState([0, 0])
  const [odds, setOdds] = useState([])
  const [markets, setMarkets] = useState([])

  const filterOdds = (score, a) => {
    const s = []
    const e = a || markets
    // eslint-disable-next-line array-callback-return
    e.map(el_m => {
      s.push(getOdds(el_m.name, el_m.outcomes, score))
    })
    setOdds(s)
  }

  const filterMarket = score => {
    const a = []

    a.push(...data.odds[0].groups[0].markets, ...data.odds[0].groups[6].markets, goalsMarket(data.odds[0].groups[7]))

    setMarkets(a)
    setScore([score[0], score[1]])
    filterOdds(
      {
        home: score[0],
        away: score[1],
      },
      a,
    )
  }

  const updateScene = (scenes, timer) => {
    // eslint-disable-next-line array-callback-return
    scenes.map(el => {
      if (el.update === Number(timer)) {
        filterOdds(el, markets)

        filterMarket([el.home, el.away])
        setScore([el.home, el.away])
        setActive(true)

        setTimeout(() => {
          setActive(false)
        }, 1000)

        return null
      }
    })
  }

  const initScene = (scenes, timer) => {
    const TIME = 90
    const DELAY = Math.ceil(TIME / scenes.length)
    const i = Math.ceil(Number(timer) / DELAY) - 1
    const f = scenes[i]

    setScore([f.home, f.away])
    filterMarket([f.home, f.away])

    setInit(false)
  }

  useEffect(() => {
    if (init) {
      if (live === 3 && timer === '0') {
        setScore([data.results[0].home, data.results[0].away])
        filterMarket([data.results[0].home, data.results[0].away])
        setInit(false)
      }

      if (live === 2 && timer !== '0') {
        initScene(data.scenes, timer)
        setInit(false)
      }
    }

    if (!init) {
      if (live === 2 && timer !== '0') {
        updateScene(data.scenes, timer)
      }

      if (live === 3 && timer === '0') {
        setScore([data.results[0].home, data.results[0].away])
        setInit(true)
      }
    }

    return () => {
      setMarkets([])
    }
  }, [timer])

  return (
    <div className={classNames(style.block, active && style.active)}>
      <div className={style.cell}>
        <div className={style.position}>{data.pos}</div>
      </div>
      <div className={style.cell}>
        <div className={style.meta}>
          <div>
            <div className={style.logo}>
              <img src={`${hostnames.ASSETS}/${data.teams.home.img}`} alt={data.teams.home.name} />
            </div>
          </div>
          <div>{data.teams.home.name}</div>
          <div className={style.score}>
            <div>{score[0]}</div>
            <div>-</div>
            <div>{score[1]}</div>
          </div>
          <div>{data.teams.away.name}</div>
          <div>
            <div className={style.logo}>
              <img src={`${hostnames.ASSETS}/${data.teams.away.img}`} alt={data.teams.away.name} />
            </div>
          </div>
        </div>
      </div>
      <div className={style.cell}>
        <div className={style.odds}>
          {odds.length > 0 &&
            odds.map((el, idx) => (
              <div key={idx} className={style.odd}>
                {el.a ? (
                  <div className={classNames(style.odd, live === 2 && el.active && style.active)}>
                    <div className={style.label}>{el.c || el.a}</div>
                    <div className={style.value}>{el.b || '1.00'}</div>
                  </div>
                ) : (
                  <div className={style.odds}>
                    {el.map((el_d, idx_d) => (
                      <div key={idx_d} className={classNames(style.odd, live === 2 && el.active && style.active)}>
                        <div className={style.label}>{el_d.c || el_d.a}</div>
                        <div className={style.value}>{el_d.b || 1}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Item
