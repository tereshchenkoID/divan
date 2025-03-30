import React, { useEffect, useState } from 'react'

import { colorType } from 'constant/config'

import Label from 'components/Label'
import Button from 'components/Button'

import style from '../index.module.scss'

const Matched = ({ numbers, type, setType, t }) => {
  const [quantity, setQuantity] = useState([
    {
      id: 1,
      disabled: true,
    },
    {
      id: 2,
      disabled: true,
    },
    {
      id: 3,
      disabled: true,
    },
    {
      id: 4,
      disabled: true,
    },
    {
      id: 5,
      disabled: true,
    },
  ])

  const unlockStake = () => {
    const a = quantity.slice(0)

    for (let i = 0; i < a.length; i++) {
      a[i].disabled = !numbers[i]
    }

    setQuantity(a)
  }

  const clearStake = () => {
    const a = quantity.slice(0)

    for (let i = 0; i < a.length; i++) {
      quantity[i].disabled = true
    }

    setQuantity(a)
  }

  useEffect(() => {
    if (numbers.length > 0 && numbers.length < 11) {
      unlockStake()
    } else {
      clearStake()
    }
  }, [numbers])

  const addMatches = id => {
    const f = type.indexOf(id) !== -1

    if (type !== colorType.ANACONDA && type !== colorType.BET_ZERO) {
      if (f) {
        const s = type.slice(0)
        s.splice(type.indexOf(id), 1)
        setType(s)
      } else {
        setType([...type, id])
      }
    } else {
      setType([id])
    }
  }

  return (
    <div>
      <div className={style.content}>
        <Label text={'MATCHED NUMBERS'} size={'sm'} />
      </div>
      <div className={style.panel}>
        <div className={style.subtitle}>{t('games.COLOR_COLOR.numbers_description')}</div>
        <div className={style.quantity}>
          {quantity.map((el, idx) => (
            <Button
              key={idx}
              text={el.id}
              initial={[style.button]}
              classes={['green', el.disabled && 'disabled', type.indexOf(el.id) !== -1 && 'active']}
              action={() => {
                addMatches(el.id)
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Matched
