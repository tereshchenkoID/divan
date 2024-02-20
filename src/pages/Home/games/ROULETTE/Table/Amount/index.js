import { useEffect, useState } from 'react'

import classNames from 'classnames'

import style from './index.module.scss'

const getFixed = data => {
  if (data) {
    let a = data.split('.')
    if (parseInt(a[1], 10) === 0) {
      return 0
    } else {
      return 2
    }
  } else {
    return 0
  }
}

const currentStakeColor = (value, steps) => {
  let previous = null

  for (let i = 0; i < steps.length; i++) {
    if (value < steps[0].amount) {
      previous = steps[0].color
    }
    if (value > steps[steps.length - 1].amount) {
      previous = steps[steps.length - 1].color
    }
    if (value < steps[i].amount) {
      return previous
    }
    previous = steps[i].color
  }

  return previous || steps[0].color
}

const Amount = ({ data, step, steps }) => {
  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    if (parseInt(data.stake, 10) > 0) {
      setToggle(true)

      setTimeout(() => {
        setToggle(false)
      }, 1000)
    }
  }, [data.stake])

  return (
    <div className={style.block}>
      {steps.length && (data.stake || data.stake === 0) && (
        <div className={classNames(style.amount, toggle && style.active)}>
          <img src={`/img/ROULETTE/chips/${(data.stake > 0 ? currentStakeColor(data.stake, steps) : 'violet') || 'red'}.png`} alt={'Chips'} />
          <p>{parseFloat(data.stake).toFixed(getFixed(data.stake))}</p>
          <div className={classNames(style.animation, toggle && style.active)}>+{step.amount}</div>
        </div>
      )}
    </div>
  )
}

export default Amount
