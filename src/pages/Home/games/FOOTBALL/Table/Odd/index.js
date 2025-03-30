import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import classNames from 'classnames'

import { deleteBetslip, setBetslip } from 'store/HOME/actions/betslipAction'
import { setTicket } from 'store/HOME/actions/ticketAction'

import style from './index.module.scss'

const Odd = ({ data, label = false }) => {
  const dispatch = useDispatch()
  const { betslip } = useSelector(state => state.betslip)
  const { settings } = useSelector(state => state.settings)

  const handleClick = data => {
    const a = betslip.slice(0)
    const find = a.find(el => {
      return el.id === data.id
    })

    if (find) {
      a.splice(a.indexOf(find), 1)
      dispatch(deleteBetslip(a))
    } else {
      dispatch(
        setBetslip({
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
        }),
      )
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
