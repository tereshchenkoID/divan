import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'

import { gameType, oddsType } from 'constant/config'

import { deleteBetslip, setBetslip, updateBetslip } from 'store/HOME/actions/betslipAction'
import { setTicket } from 'store/HOME/actions/ticketAction'

import style from './index.module.scss'

const Odd = ({ data, label = false }) => {
  const dispatch = useDispatch()
  const { betslip } = useSelector(state => state.betslip)
  const { settings } = useSelector(state => state.settings)
  const { stake } = useSelector(state => state.stake)
  const odd = {
    m_old: data.m_old, // Remove after
    o_old: data.o_old, // Remove after
    sid: data.sid,
    mid: data.mid,
    start: data.start,
    id: data.id,
    a: data.a,
    b: data.b || 1.0,
    pos: data.pos,
    market: data.market || 'OVER_UNDER',
    c: data.c,
    type: data.type,
    stake: settings.betslip.single.min,
    teams: {
      home: data.home,
      away: data.away,
    },
  }
  const STAKE_TYPE = settings.betting.type

  const getSingleStake = (stakes, c) => {
    const count = stakes.filter(item => item.type === gameType.FOOTBALL_LEAGUE).length;
    const s = (stake?.[0]?.stake || settings.betslip.single.min) / (count + c)
    return s.toFixed(2)
  }

  const updateStakes = (stakes) => {
    const a = STAKE_TYPE === oddsType.PER_GROUP ? stakes.map(item => ({ ...item, stake: getSingleStake(stakes, 0) })) : stakes;
    dispatch(deleteBetslip(a))
  }

  const addStakes = () => {
    const isOnlyFootball = betslip.every(item => item.type === gameType.FOOTBALL_LEAGUE)
    if (STAKE_TYPE === oddsType.PER_GROUP && isOnlyFootball) {
      const stakes = betslip.slice(0)
      const stake = getSingleStake(betslip, 1)
      stakes.push({
        ...odd,
        stake: stake,
      })

      const a = stakes.map(item => ({ ...item, stake: stake }));
      dispatch(updateBetslip(a))
    }
    else {
      dispatch(
        setBetslip({
          ...odd,
          stake: settings.betslip.single.min,
        }),
      )
    }
  }

  const handleClick = data => {
    const a = betslip.slice(0)
    const find = a.find(el => {
      return el.id === data.id
    })

    if (find) {
      a.splice(a.indexOf(find), 1)
      updateStakes(a)

      // dispatch(deleteBetslip(updateStakes(a)))
    } else {
      addStakes()

      // dispatch(
      //   setBetslip({
      //     m_old: data.m_old, // Remove after
      //     o_old: data.o_old, // Remove after
      //     sid: data.sid,
      //     mid: data.mid,
      //     start: data.start,
      //     id: data.id,
      //     a: data.a,
      //     b: data.b || 1.0,
      //     pos: data.pos,
      //     market: data.market || 'OVER_UNDER',
      //     c: data.c,
      //     type: data.type,
      //     stake: settings.betslip.single.min,
      //     teams: {
      //       home: data.home,
      //       away: data.away,
      //     },
      //   }),
      // )
    }

    dispatch(setTicket(0))
  }

  const activeClass = id => {
    return betslip.find(el => {
      return el.id === id
    })
  }

  return (
    <div
      className={classNames(
        style.block,
        label && style.sm,
        (!data.b || data.b === '1.00' || data.b === '1.0') && style.disabled,
        betslip.length > 0 && activeClass(data.id) && style.active,
      )}
      onClick={() => {
        handleClick(data)
      }}
    >
      {label && <div className={style.label}>{label}</div>}
      <div className={style.odd}>{data.b ? parseFloat(data.b).toFixed(2) : '1.00'}</div>
    </div>
  )
}

export default Odd
