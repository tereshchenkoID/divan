import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'

import { gameType, rouletteColor } from 'constant/config'
import { deleteBetslip } from 'store/HOME/actions/betslipAction'
import { setStake } from 'store/HOME/actions/stakeAction'

import { data } from 'data/ROULETTE'

import Button from 'components/Button'
import Odd from '../Odd'

import style from './index.module.scss'

const setStepsValue = data => {
  const a = []

  // eslint-disable-next-line array-callback-return
  data.map((el, idx) =>
    a.push({
      id: idx,
      amount: el,
      color: rouletteColor[idx],
      active: idx === 0,
    }),
  )

  return a
}

const generateArrayFromRange = (range, filter) => {
  const [start, end] = range.split('-').map(num => parseInt(num))
  const arr = []

  for (let i = start; i <= end; i++) {
    arr.push(i)
  }

  if (filter === 'even') {
    return arr.filter(num => num !== 0 && num % 2 === 0)
  } else if (filter === 'odd') {
    return arr.filter(num => num % 2 !== 0)
  } else {
    return arr
  }
}

const generateIncreasingArray = (startNum, length) => {
  const arr = [startNum]

  for (let i = 1; i < length; i++) {
    arr.push(arr[i - 1] + 3)
  }

  return arr
}

const getRouletteValues = color => {
  const redValues = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]
  const blackValues = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35]

  if (color === 'red') {
    return redValues
  } else {
    return blackValues
  }
}

const onHoverChips = (el, type, data, value) => {
  const a = el.stake
  let b

  switch (value) {
    case 'range':
      b = generateArrayFromRange(el.name)
      break
    case 'even':
      b = generateArrayFromRange('0-36', value)
      break
    case 'odd':
      b = generateArrayFromRange('0-36', value)
      break
    case 'counts':
      b = a.slice(a.indexOf(':') + 1, a.length).replaceAll(' ', '').split(',')
      break
    case 'line':
      b = generateIncreasingArray(el.name, 12)
      break
    case 'color':
      b = getRouletteValues(el.name)
      break
    default:
      b = []
      break
  }

  if (type === 0) {
    b.map(el => data.current[el].classList.add(style.hover))
  } else {
    b.map(el => data.current[el].classList.remove(style.hover))
  }
}

const TableChips = ({ random, active }) => {
  const dispatch = useDispatch()
  const { settings } = useSelector(state => state.settings)
  const { betslip } = useSelector(state => state.betslip)

  const [steps, setSteps] = useState([])
  const numbers = useRef([])

  useEffect(() => {
    setSteps(setStepsValue(settings.betslip.steps))
  }, [settings])

  useEffect(() => {
    if (random.length > 0) {
      addRandomChips()
    }
  }, [random])

  const setRefs = (date, i) => {
    numbers.current[date.value] = i
  }

  const buttonStepSet = id => {
    setSteps(prevState => prevState.map(item => (item.id === id ? { ...item, active: true } : { ...item, active: false })))
  }

  const buttonStepGet = () => {
    return steps.find(el => el.active === true)
  }

  const doubleChips = id => {
    const a = betslip.slice(0)

    for (let i = 0; i < a.length; i++) {
      if (a[i].id === id) {
        a[i].stake = (a[i].stake * 2)
        // a[i].stake = (a[i].stake * 2).toFixed(2)
      }
    }

    dispatch(deleteBetslip(a))
  }

  const addRandomChips = () => {
    const a = betslip.slice(0)
    const r = a.filter(el => el.id !== active.id)
    const s = buttonStepGet().amount

    for (let i = 0; i < random.length; i++) {
      r.push({
        start: active.start,
        roundId: active.round.id,
        id: active.id,
        b: data.chips[random[i]].odd,
        market: data.chips[random[i]].stake,
        print: data.chips[random[i]].stake,
        m_old: data.chips[random[i]].stake.split(':')[0],
        o_old: data.chips[random[i]].stake.split(':')[1].slice(1),
        stake: s,
        type: gameType.ROULETTE,
      })
    }

    dispatch(deleteBetslip(r))
  }

  const clearBets = id => {
    const r = betslip.filter(el => el.id !== id)
    dispatch(deleteBetslip(r))
    dispatch(setStake([]))
  }

  return (
    <div className={style.block}>
      <div className={style.body}>
        <div className={style.top}>
          <div />
          <div className={style.dozens}>
            {data.s_dozen.map((el, idx) => (
              <div
                key={idx}
                className={style.button}
                onMouseEnter={() => {
                  onHoverChips(el, 0, numbers, 'range')
                }}
                onMouseLeave={() => {
                  onHoverChips(el, 1, numbers, 'range')
                }}
              >
                <Odd data={el} step={buttonStepGet()} steps={steps} active={active} />
              </div>
            ))}
          </div>
          <div />
        </div>

        <div className={style.middle}>
          <div className={style['hidden-zero']}>
            {data.h_zero.map((el, idx) => (
              <div
                key={idx}
                className={style.button}
                onMouseEnter={() => {
                  onHoverChips(el, 0, numbers, 'counts')
                }}
                onMouseLeave={() => {
                  onHoverChips(el, 1, numbers, 'counts')
                }}
              >
                <Odd data={el} step={buttonStepGet()} steps={steps} active={active} />
              </div>
            ))}
          </div>
          <div className={style['hidden-chips']}>
            {data.h_chips.map((el_a, idx_a) => (
              <div key={idx_a} className={style['h-row']}>
                {el_a.map((el, idx) => (
                  <div
                    key={idx}
                    className={style.button}
                    onMouseEnter={() => {
                      onHoverChips(el, 0, numbers, 'counts')
                    }}
                    onMouseLeave={() => {
                      onHoverChips(el, 1, numbers, 'counts')
                    }}
                  >
                    <Odd data={el} step={buttonStepGet()} steps={steps} active={active} />
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className={style.zero}>
            <div
              className={style.button}
              ref={i => {
                numbers.current[data.chips[0].value] = i
              }}
            >
              <Odd data={data.chips[0]} step={buttonStepGet()} steps={steps} active={active} />
            </div>
          </div>
          <div className={style.numbers}>
            {data.chips.map(
              (el, idx) =>
                idx !== 0 && (
                  <div
                    key={idx}
                    ref={i => {
                      i && setRefs(el, i)
                    }}
                    className={classNames(style.button, style[el.color])}
                  >
                    {el.name}
                  </div>
                ),
            )}
          </div>
          <div className={style.rows}>
            {data.s_line.map((el, idx) => (
              <div
                key={idx}
                className={style.button}
                onMouseEnter={() => {
                  onHoverChips(el, 0, numbers, 'line')
                }}
                onMouseLeave={() => {
                  onHoverChips(el, 1, numbers, 'line')
                }}
              >
                <Odd data={el} step={buttonStepGet()} steps={steps} active={active} />
              </div>
            ))}
          </div>
        </div>

        <div className={style.bottom}>
          <div />
          <div className={style.extra}>
            <div
              className={style.button}
              onMouseEnter={() => {
                onHoverChips(data.s_low_high[0], 0, numbers, 'range')
              }}
              onMouseLeave={() => {
                onHoverChips(data.s_low_high[0], 1, numbers, 'range')
              }}
            >
              <Odd data={data.s_low_high[0]} step={buttonStepGet()} steps={steps} active={active} />
            </div>
            <div
              className={style.button}
              onMouseEnter={() => {
                onHoverChips(data.s_even_odd[0], 0, numbers, 'even')
              }}
              onMouseLeave={() => {
                onHoverChips(data.s_even_odd[0], 1, numbers, 'even')
              }}
            >
              <Odd data={data.s_even_odd[0]} step={buttonStepGet()} steps={steps} active={active} />
            </div>
            {data.s_color.map((el, idx) => (
              <button
                key={idx}
                className={style.button}
                onMouseEnter={() => {
                  onHoverChips(el, 0, numbers, 'color')
                }}
                onMouseLeave={() => {
                  onHoverChips(el, 1, numbers, 'color')
                }}
              >
                <Odd data={el} step={buttonStepGet()} steps={steps} active={active} />
              </button>
            ))}
            <div
              className={style.button}
              onMouseEnter={() => {
                onHoverChips(data.s_even_odd[1], 0, numbers, 'odd')
              }}
              onMouseLeave={() => {
                onHoverChips(data.s_even_odd[1], 1, numbers, 'odd')
              }}
            >
              <Odd data={data.s_even_odd[1]} step={buttonStepGet()} steps={steps} active={active} />
            </div>
            <div
              className={style.button}
              onMouseEnter={() => {
                onHoverChips(data.s_low_high[1], 0, numbers, 'range')
              }}
              onMouseLeave={() => {
                onHoverChips(data.s_low_high[1], 1, numbers, 'range')
              }}
            >
              <Odd data={data.s_low_high[1]} step={buttonStepGet()} steps={steps} active={active} />
            </div>
          </div>
          <div />
        </div>
      </div>

      <div className={style.footer}>
        <div className={style.coins}>
          {steps.map((el, idx) => (
            <button
              key={idx}
              className={classNames(style.coin, style[el.color], el.active && style.active)}
              onClick={() => {
                buttonStepSet(el.id)
              }}
            >
              <img src={`/img/ROULETTE/chips/${el.color}.webp`} alt={'Chips'} loading={'lazy'} />
              <p>{el.amount}</p>
            </button>
          ))}
        </div>

        <div className={style.actions}>
          <Button
            text={'2x'}
            initial={[style.action]}
            classes={['blue']}
            action={() => {
              doubleChips(active.id)
            }}
          />
          <Button
            icon={'close'}
            initial={[style.action]}
            classes={['red']}
            action={() => {
              clearBets(active.id)
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default TableChips
