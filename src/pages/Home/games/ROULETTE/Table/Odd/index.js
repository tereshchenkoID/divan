import { useDispatch, useSelector } from 'react-redux'

import { gameType } from 'constant/config'
import { deleteBetslip, setBetslip } from 'store/HOME/actions/betslipAction'

import Amount from '../Amount'

import style from './index.module.scss'

const findBet = (data, id, outcome) => {
  return data.find(el => {
    return el.id === id && el.market === outcome && el.type === gameType.ROULETTE
  })
}

const Odd = ({ data, step, steps, active }) => {
  const dispatch = useDispatch()
  const { betslip } = useSelector(state => state.betslip)
  const outcome = data.stake

  const addBetslip = date => {
    const a = betslip.slice(0)
    const f = findBet(betslip, active.id, outcome)

    if (f) {
      f.stake = Number(f.stake) + Number(step.amount)
      dispatch(deleteBetslip(a))
    } else {
      dispatch(
        setBetslip({
          roundId: active.round.id,
          start: active.start,
          id: active.id,
          b: date.odd,
          market: date.stake,
          print: date.print || date.stake,
          m_old: date.stake.split(':')[0],
          o_old: date.stake.split(':')[1].slice(1),
          stake: step.amount,
          type: gameType.ROULETTE,
        }),
      )
    }
  }

  return (
    <div
      className={style.block}
      onClick={() => {
        addBetslip(data)
      }}
    >
      {betslip.length > 0 && findBet(betslip, active.id, outcome) && (
        <Amount data={findBet(betslip, active.id, outcome)} step={step} steps={steps} />
      )}
      {
        (data.name === 'red' || data.name === 'black')
          ?
            <div className={style.diamond}>
              <svg viewBox="0 0 75 34" xmlns="http://www.w3.org/2000/svg">
                <polygon points="10,17 37.5,2 65,17 37.5,32" fill={data.name} stroke="var(--color-white)" strokeWidth="2" strokeLinejoin="round"/>
              </svg>
            </div>
          :
            data.name
      }
    </div>
  )
}

export default Odd
