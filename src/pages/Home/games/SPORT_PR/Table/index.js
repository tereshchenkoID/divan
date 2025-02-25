import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import { getHostName } from 'helpers/getHostName'
import { getDateTime } from 'helpers/getDateTime'

import { setForecast } from 'store/HOME/actions/forecatsAction'
import { deleteBetslip } from 'store/HOME/actions/betslipAction'

import Subtitle from 'components/Subtitle'
import Button from 'components/Button'
import Checkbox from 'components/Checkbox'

import classNames from 'classnames'

import style from './index.module.scss'

const SORT = ['interface.random', 'interface.on_trend', 'interface.against_trend', 'interface.reset_numbers']
const BLOCKS = {
  1: [3, 1],
  2: [5, 9],
  3: [7, 19],
  4: [9, 33],
  5: [11, 51],
  6: [13, 73],
  7: [15, 99],
  8: [17, 129],
  9: [19, 163],
  10: [21, 201],
  11: [23, 243],
  12: [25, 289],
}

const Table = ({ active }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { forecast } = useSelector(state => state.forecast)
  const { betslip } = useSelector(state => state.betslip)
  const [init, setInit] = useState(false)
  const [data, setData] = useState([])
  const [sort, setSort] = useState(-1)

  useEffect(() => {
    setData(active.league.matches)

    return () => {
      setSort(-1)
      setData([])
    }
  }, [active])

  useEffect(() => {
    if (!Object.prototype.hasOwnProperty.call(forecast, 'id') && init) {
      setData(prevMatches => {
        return prevMatches.map(match => {
          return {
            ...match,
            b_1: null,
            b_2: null,
            outcomes: match.outcomes.map(outcome => ({ ...outcome, s: null })),
          }
        })
      })
      setSort(-1)
    }
  }, [forecast])

  useEffect(() => {
    return () => {
      setInit(false)
    }
  }, [])

  const calculateBetFromOutcomes = d => {
    let betAmount = 5
    const allOutcomesSelected = d?.every(match => match.outcomes.some(outcome => outcome.s))

    if (!allOutcomesSelected) {
      betAmount = 0
    } else {
      d?.forEach(match => {
        const selectedOutcomes = match.outcomes.filter(outcome => outcome.s).length
        if (selectedOutcomes === 2) {
          betAmount *= 2
        } else if (selectedOutcomes === 3) {
          betAmount *= 3
        }
      })

      const selectedBlockCounts = {
        b_1: d?.filter(match => match.b_1).length,
        b_2: d?.filter(match => match.b_2).length,
      }

      Object.keys(selectedBlockCounts).forEach(blockType => {
        const selectedCount = selectedBlockCounts[blockType]
        if (selectedCount > 0) {
          const multiplier = BLOCKS[selectedCount][blockType === 'b_1' ? 0 : 1]
          betAmount *= multiplier
        }
      })
    }

    return betAmount
  }

  const setStake = d => {
    if (betslip.length) {
      dispatch(deleteBetslip([]))
    }

    if (d) {
      dispatch(
        setForecast({
          id: active?.id,
          market: active?.league?.market,
          data: d,
          stake: calculateBetFromOutcomes(d),
        }),
      )
    } else {
      dispatch(setForecast({}))
    }
    setInit(true)
  }

  const handleActive = (matchId, outcomeId) => {
    setData(prevMatches => {
      const updatedMatches = prevMatches.map(match => {
        if (match.id === matchId) {
          const updatedOutcomes = match.outcomes.map(outcome =>
            outcome.id === outcomeId ? { ...outcome, s: !outcome.s } : outcome,
          )
          const max = updatedOutcomes.filter(outcome => outcome.s).length > 1

          return {
            ...match,
            b_1: max ? null : match.b_1,
            b_2: max ? null : match.b_2,
            outcomes: updatedOutcomes,
          }
        } else {
          return match
        }
      })

      setStake(updatedMatches)

      return updatedMatches
    })
  }

  const handleBlock = (matchId, activeBlock, disabledBlock) => {
    setData(prevMatches => {
      const updatedMatches = prevMatches.map(match => {
        if (match.id === matchId) {
          const max = match.outcomes.filter(outcome => outcome.s)
          const id = max.length > 0 ? max[0].id : match.outcomes[0].id

          const updatedOutcomes = match.outcomes.map(outcome => {
            return { ...outcome, s: outcome.id === id }
          })

          return {
            ...match,
            outcomes: updatedOutcomes,
            [activeBlock]: !match[activeBlock],
            [disabledBlock]: null,
          }
        } else {
          return match
        }
      })

      setStake(updatedMatches)

      return updatedMatches
    })
  }

  const toggleOutcomeStatus = type => {
    setData(prevMatches => {
      const updatedMatches = prevMatches.map(match => {
        let updatedOutcomes
        if (type === 0) {
          const randomIndex = Math.floor(Math.random() * match.outcomes.length)
          updatedOutcomes = match.outcomes.map((outcome, index) => ({
            ...outcome,
            s: index === randomIndex,
          }))
        } else if (type === 1) {
          const maxD = Math.max(...match.outcomes.map(outcome => Number(outcome.d)))
          let foundMax = false
          updatedOutcomes = match.outcomes.map(outcome => {
            if (!foundMax && Number(outcome.d) === maxD) {
              foundMax = true
              return { ...outcome, s: true }
            } else {
              return { ...outcome, s: false }
            }
          })
        } else if (type === 2) {
          const minD = Math.min(...match.outcomes.map(outcome => Number(outcome.d)))
          let foundMin = false
          updatedOutcomes = match.outcomes.map(outcome => {
            if (!foundMin && Number(outcome.d) === minD) {
              foundMin = true
              return { ...outcome, s: true }
            } else {
              return { ...outcome, s: false }
            }
          })
        } else {
          updatedOutcomes = match.outcomes.map(outcome => ({ ...outcome, s: null }))
        }
        return {
          ...match,
          b_1: null,
          b_2: null,
          outcomes: updatedOutcomes,
        }
      })
      setStake(type !== 3 ? updatedMatches : null)

      return updatedMatches
    })

    setSort(type)
  }

  return (
    <div className={style.block}>
      <div className={style.sort}>
        {SORT.map((el, idx) => (
          <Button
            key={idx}
            props={'button'}
            text={t(el)}
            initial={[style.market]}
            classes={['green', sort === idx && sort !== 3 && 'active']}
            action={() => toggleOutcomeStatus(idx)}
          />
        ))}
      </div>
      <div className={classNames(style.row, style.head)}>
        {active.league.market.headers.map((el, idx) => (
          <div key={idx} className={style.label}>
            {el}
          </div>
        ))}
        <div className={style.label}>B 1</div>
        <div className={style.label}>B 2</div>
        <div className={style.legend}>
          <Subtitle data={active.league.market.name.replaceAll('_', ' ')} size={'sm'} />
        </div>
      </div>
      <div className={style.wrapper}>
        {data?.map((el_m, idx_m) => (
          <div key={idx_m} className={classNames(style.row, style.default)}>
            <div className={style.cell}>
              <div className={style.id}>{el_m.pos}.</div>
              <div className={style.date}>{getDateTime(el_m.start, 5)}</div>
              <div className={style.meta}>
                <div className={style.logo}>
                  <img src={`${getHostName('ASSETS')}/${el_m.teams.home.img}`} alt={el_m.teams.home.name} loading={'lazy'} />
                </div>
                <div>{el_m.teams.home.name}</div>
                <div>vs</div>
                <div>{el_m.teams.away.name}</div>
                <div className={style.logo}>
                  <img src={`${getHostName('ASSETS')}/${el_m.teams.away.img}`} alt={el_m.teams.away.name} loading={'lazy'} />
                </div>
              </div>
            </div>
            <div className={style.cell}>
              <div className={style.odds}>
                {el_m.outcomes.map((el, idx) => (
                  <button
                    key={idx}
                    className={classNames(style.odd, el.s && style.active)}
                    onClick={() => handleActive(el_m.id, el.id)}
                  >
                    <p className={style.outcome}>
                      <span>{el.b}</span>
                      <span>%</span>
                    </p>

                    {(sort === 1 || sort === 2) && (
                      <p className={style.outcome}>
                        <span>{el.d}</span>
                        <span>%</span>
                      </p>
                    )}
                  </button>
                ))}
              </div>
            </div>
            <div className={style.cell}>
              <Checkbox data={el_m.b_1} action={() => handleBlock(el_m.id, 'b_1', 'b_2')} />
            </div>
            <div className={style.cell}>
              <Checkbox data={el_m.b_2} action={() => handleBlock(el_m.id, 'b_2', 'b_1')} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Table
