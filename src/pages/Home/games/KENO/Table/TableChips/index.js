import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { gameType } from 'constant/config'

import { deleteBetslip } from 'store/HOME/actions/betslipAction'

import { checkTime } from 'helpers/checkTime'

import Button from 'components/Button'
import Numbers from '../Numbers'

import style from './index.module.scss'

const findExists = (data, betslip) => {
  const r = []

  data.map(el => {
    const d = betslip.find(f => `${f.market} ${f.o_old}` === `${el.market} ${el.o_old}` && f.roundId === el.roundId)

    if (!d) {
      r.push(el)
    }

    return true
  })

  return r
}

const TableChips = ({ events, repeat, random, data, setRepeat }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { settings } = useSelector(state => state.settings)
  const { betslip } = useSelector(state => state.betslip)
  const { delta } = useSelector(state => state.delta)

  const [disabled, setDisabled] = useState(true)
  const [numbers, setNumbers] = useState([])
  const [event, setEvent] = useState(repeat === 1 ? [data] : events)

  useEffect(() => {
    if (numbers.length > 0 && numbers.length < 9) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [numbers])

  useEffect(() => {
    setNumbers(random.sort((a, b) => a - b))
  }, [random])

  useEffect(() => {
    setEvent(repeat === 1 ? [data] : events)
  }, [repeat, data])

  const MATCHED = () => {
    let r = []

    event.map((round, idx) => {
      if (idx <= repeat && checkTime(round.start, delta)) {
        const f = round.round.odds.markets[0].outcomes.filter(el => el.a.indexOf(`${numbers.length}_`) !== -1)
        const s = f.sort((a, b) => b.b - a.b)[0]

        r.push({
          id: s.id,
          roundId: round.round.id,
          start: round.start,
          b: s.b || 0,
          m_old: round.round.odds.markets[0].name,
          o_old: numbers.join(', '),
          market: round.round.odds.markets[0].name,
          circles: numbers,
          print: round.round.odds.markets[0].printname,
          stake: settings.betslip.single.min,
          type: gameType.KENO,
        })
      }
    })

    return r
  }

  const addStake = () => {
    const a = betslip.slice(0)
    let r = MATCHED()

    dispatch(deleteBetslip(a.concat(betslip.length > 0 ? findExists(r, betslip) : r)))
    setDisabled(true)
    setNumbers([])
    setRepeat(1)
  }

  return (
    <div className={style.block}>
      <div className={style.header}>
        <Button
          text={t('games.KENO.reset_numbers')}
          initial={[style.button]}
          classes={['green', numbers.length === 0 && 'disabled']}
          action={() => {
            setNumbers([])
          }}
        />
        <Button
          text={t('games.KENO.place_bets')}
          initial={[style.button]}
          classes={['green', disabled && 'disabled']}
          action={() => {
            addStake()
          }}
        />
      </div>
      <div className={style.wrapper}>
        <Numbers numbers={numbers} setNumbers={setNumbers} random={random} />
      </div>
    </div>
  )
}

export default TableChips
