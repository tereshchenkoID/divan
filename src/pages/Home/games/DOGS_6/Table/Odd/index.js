import { useDispatch, useSelector } from 'react-redux'

import classNames from 'classnames'

import { dogsColor, gameType } from 'constant/config'

import { generateCircles } from 'helpers/generateCircles'
import { deleteBetslip, setBetslip } from 'store/HOME/actions/betslipAction'

import Number from '../Number'

import style from './index.module.scss'

const findBet = (data, id) => {
  return data.find(el => {
    return el.id === id
  })
}

const Odd = ({ market, start, data, view, text, roundId }) => {
  const dispatch = useDispatch()
  const { betslip } = useSelector(state => state.betslip)

  const addStake = () => {
    const a = betslip.slice(0)

    if (findBet(a, data.id)) {
      a.splice(a.indexOf(findBet(a, data.id)), 1)
      dispatch(deleteBetslip(a))
    } else {
      dispatch(
        setBetslip({
          id: data.id,
          roundId: roundId,
          start: start,
          b: data.b,
          market: market,
          print: text ? `${market}: ${data.a}` : market,
          m_old: market,
          o_old: data.a,
          stake: 100,
          circles: text ? [] : generateCircles(data.a, dogsColor),
          type: gameType.DOGS_6,
        }),
      )
    }
  }

  return (
    <button
      className={classNames(
        style.block,
        style[view],
        findBet(betslip, data.id) && style.active,
        (!data.b || data.b === 1.0) && style.disabled,
      )}
      onClick={() => {
        addStake()
      }}
    >
      {view && (
        <span className={style.numbers}>
          {data.a.split(',').map((el, idx) => (
            <Number key={idx} color={el - 1} data={el} />
          ))}
        </span>
      )}
      {text && <span className={style.market}>{text}</span>}
      <span>{data.b.toFixed(1)}</span>
    </button>
  )
}

export default Odd
