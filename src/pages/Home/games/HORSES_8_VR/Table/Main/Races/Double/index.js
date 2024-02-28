import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { deleteBetslip } from 'store/HOME/actions/betslipAction'
import { generateCircles } from 'helpers/generateCircles'

import classNames from 'classnames'

import { gameType, horseColor } from 'constant/config'

import Number from '../../../Number'

import style from './index.module.scss'

const generateBets = numbers => {
  const bets = []
  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < numbers.length; j++) {
      if (i !== j) {
        bets.push(`${numbers[i]},${numbers[j]}`)
      }
    }
  }
  return bets
}

const addStake = (id, select, setSelect) => {
  const a = select.slice(0)

  if (select.indexOf(id) === -1) {
    a.push(id)
  } else {
    a.splice(a.indexOf(id), 1)
  }

  a.sort((a, b) => a - b)
  setSelect(a)
}

const findBet = (data, id) => {
  return data.find(el => {
    return el.id === id
  })
}

const Double = ({ data }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { betslip } = useSelector(state => state.betslip)
  const [select, setSelect] = useState([])

  const placeBets = () => {
    const r = []
    const f = generateBets(select)
    const b = betslip.slice(0)

    data.race.odds.markets[6].outcomes.map(el => {
      if (f.indexOf(el.a) !== -1) {
        const m = data.race.odds.markets[6].printname
        const p = `${m}: ${el.a}`
        const f = findBet(b, el.id)

        if (!f) {
          r.push({
            id: el.id,
            roundId: data.race.roundId,
            start: data.start,
            b: el.b,
            market: m,
            print: p,
            m_old: m,
            o_old: el.a,
            stake: 100,
            circles: generateCircles(el.a, horseColor),
            type: gameType.HORSES_8_VR,
          })
        }
      }

      return true
    })

    dispatch(deleteBetslip(b.concat(r)))
    setSelect([])
  }

  return (
    <div className={style.block}>
      <div className={style.row}>
        {data.race.odds.markets[0].outcomes.map((el, idx) => (
          <div key={idx} className={style.cell}>
            <button
              className={classNames(style.odd, select.indexOf(idx + 1) !== -1 && style.active)}
              onClick={() => {
                addStake(idx + 1, select, setSelect)
              }}
            >
              <Number color={idx} data={idx + 1} size={'lg'} />
            </button>
          </div>
        ))}
      </div>
      <button
        className={classNames(style.button, select.length < 2 && style.disabled)}
        onClick={() => {
          placeBets()
        }}
      >
        {t('games.HORSES_8_VR.place_bets')}
      </button>
    </div>
  )
}

export default Double
