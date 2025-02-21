import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'

import { gameType, rouletteColor } from 'constant/config'
import { deleteBetslip } from 'store/HOME/actions/betslipAction'
import { setStake } from 'store/HOME/actions/stakeAction'

import { data } from './data'

import Button from 'components/Button'
import Label from 'components/Label'
import Odd from '../Odd'
import Arrow from '../Arrow'

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

const generateFinals = (el) => {
  return Array.from({ length: 37 }, (_, i) => i).filter(num => num % 10 === el)
}

const generateFromString = (el) => {
  return el.split(' | ')
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
    case 'final':
      b = generateFinals(el.name)
      break  
    case 'color':
      b = getRouletteValues(el.name)
      break
    case 'string':
      b = generateFromString(el.name)
      break    
    case 'sector-a':
      b = [2, 4, 15, 19, 21, 32]
      break
    case 'sector-b':
      b = [6, 13, 17, 25, 27, 34]
      break
    case 'sector-c':
      b = [8, 10, 11, 23, 30, 36]
      break
    case 'sector-d':
      b = [1, 5, 16, 20, 24, 33]
      break
    case 'sector-e':
      b = [9, 14, 18, 22, 29, 31]
      break
    case 'sector-f':
      b = [3, 7, 12, 26, 28, 35]
      break
    case 'high-red':
      b = getRouletteValues('red').slice(9)
      break
    case 'low-red':
      b = getRouletteValues('red').slice(0, 9)
      break
    case 'high-black':
      b = getRouletteValues('black').slice(9)
      break
    case 'low-black':
      b = getRouletteValues('black').slice(0, 9)
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
        type: gameType.ROULETTE_DELUXE,
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
      <div className={style.wrapper}>
        <div className={style.column}>
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

          <div className={style.stakes}>
            <div>
              <Label 
                text={'Twins'} 
                size={'sm'}
              />
              <div className={style.container}>
                {
                  data.twins.map((el, idx) =>
                    <button 
                      key={idx}
                      className={style.odd}
                      type={'button'}
                      aria-label={`Twins ${idx}`}
                      onMouseEnter={() => {
                        onHoverChips(el, 0, numbers, 'string')
                      }}
                      onMouseLeave={() => {
                        onHoverChips(el, 1, numbers, 'string')
                      }}
                    >
                      <Odd 
                        data={el} 
                        step={buttonStepGet()} 
                        steps={steps} 
                        active={active} 
                      />
                    </button>
                  )
                }
              </div>
            </div>

            <div>
              <Label 
                text={'Mirror'} 
                size={'sm'}
              />
              <div className={style.container}>
                {
                  data.mirror.map((el, idx) =>
                    <button 
                      key={idx}
                      className={style.odd}
                      type={'button'}
                      aria-label={`Twins ${idx}`}
                      onMouseEnter={() => {
                        onHoverChips(el, 0, numbers, 'string')
                      }}
                      onMouseLeave={() => {
                        onHoverChips(el, 1, numbers, 'string')
                      }}
                    >
                      <Odd 
                        data={el} 
                        step={buttonStepGet()} 
                        steps={steps} 
                        active={active} 
                      />
                    </button>
                  )
                }
              </div>
            </div>

            <div>
              <Label 
                text={'Finals'}
                size={'sm'}
              />
              <div className={style.container}>
                {
                  data.finals.map((el, idx) =>
                    <button 
                      key={idx}
                      className={style.odd}
                      type={'button'}
                      aria-label={`Final ${idx}`}
                      onMouseEnter={() => {
                        onHoverChips(el, 0, numbers, 'final')
                      }}
                      onMouseLeave={() => {
                        onHoverChips(el, 1, numbers, 'final')
                      }}
                    >
                      <Odd 
                        data={el} 
                        step={buttonStepGet()} 
                        steps={steps} 
                        active={active} 
                      />
                    </button>
                  )
                }
              </div>
            </div>
          </div>
        </div>
        <div className={style.column}>
          <div className={style.sectors}>
            <div className={style.subtitle}>Sectors</div>
            <svg viewBox="0 0 330 330">
              <path d="M242,113.9l61-35.2c-6.4-10.3-14.1-19.9-22.9-28.7C250.8,20.5,212.1,3.9,170.8,2.4v70.4 C200.5,74.6,226.5,90.4,242,113.9z" />
              <path d="M308.8,88.6l-61,35.3c6.2,12.4,9.6,26.3,9.6,41.1c0,14.7-3.5,28.7-9.6,41.1l61,35.2 c12.4-23.2,18.9-49.3,18.9-76.3C327.8,137.9,321.1,111.9,308.8,88.6z" />
              <path d="M170.8,257.2v70.4c41.3-1.4,79.9-18.2,109.2-47.6c8.8-8.8,16.4-18.4,22.9-28.7l-61-35.2 C226.3,239.4,200.5,255.3,170.8,257.2z" />
              <path d="M88,216.1l-61,35.2c6.5,10.3,14.1,19.9,22.9,28.7c29.4,29.4,68,46.1,109.2,47.6v-70.4 C129.5,255.4,103.5,239.5,88,216.1z" />
              <path d="M72.5,164.9c0-14.7,3.5-28.7,9.6-41.1l-61-35.2C8.8,111.9,2.3,137.9,2.3,164.9s6.6,53.1,18.9,76.3l61-35.2 C76,193.6,72.5,179.7,72.5,164.9z" />
              <path d="M27,78.6l61,35.2c15.6-23.3,41.5-39.2,71.1-41.1V2.4C117.8,3.9,79.3,20.5,49.9,49.9 C41.1,58.7,33.5,68.4,27,78.6z" />
            </svg>
            {
              data.sectors.map((el, idx) => 
                <div 
                  key={idx}
                  className={
                    classNames(
                      style.sector,
                      style[el.name]
                    )
                  }
                  onMouseEnter={() => {
                    onHoverChips(el, 0, numbers, `sector-${el.name}`)
                  }}
                  onMouseLeave={() => {
                    onHoverChips(el, 1, numbers, `sector-${el.name}`)
                  }}
                >
                  <span className={style.label}>{el.name}</span>
                  <Odd 
                    data={el} 
                    step={buttonStepGet()} 
                    steps={steps} 
                    active={active} 
                  />
                </div>
              )
            }
          </div>

          <div className={style.arrows}>
            {
              data.low_high_color.map((el, idx) =>
                <Arrow 
                  key={idx}
                  data={el}
                  buttonStepGet={buttonStepGet()}
                  steps={steps}
                  active={active}
                  onMouseEnter={() => {
                    onHoverChips(el, 0, numbers, `${el.name}-${el.color}`)
                  }}
                  onMouseLeave={() => {
                    onHoverChips(el, 1, numbers, `${el.name}-${el.color}`)
                  }}
                />
              )
            }
            <Label 
              text={'Low / High Color'} 
              size={'sm'}
            />
          </div>
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
            props={'button'}
            text={'2x'}
            initial={[style.action]}
            classes={['blue']}
            action={() => {
              doubleChips(active.id)
            }}
          />
          <Button
            props={'button'}
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
