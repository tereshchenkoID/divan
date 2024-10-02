import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Button from 'components/Button'
import Odd from './Odd'

import style from './index.module.scss'

const getNumbers = () => {
  const a = 49
  const s = []

  for (let i = 1; i <= a; i++) {
    if (i === a) {
      s.push({
        id: i,
        color: 'DRAW',
      })
    } else if (i % 3 === 1) {
      s.push({
        id: i,
        color: 'RED',
      })
    } else if (i % 3 === 2) {
      s.push({
        id: i,
        color: 'YELLOW',
      })
    } else {
      s.push({
        id: i,
        color: 'BLUE',
      })
    }
  }

  return s
}

const Numbers = ({ numbers, setNumbers, random, setType }) => {
  const { t } = useTranslation()
  const odds = getNumbers()
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    let s = []
    for (let i = 0; i < odds.length; i++) {
      if (random.indexOf(odds[i].id) !== -1) {
        s.push({
          id: odds[i].id,
          color: odds[i].color,
        })
      }
    }

    setNumbers(s.sort((a, b) => a.id - b.id))
  }, [random])

  useEffect(() => {
    setDisabled(numbers.length > 0)
  }, [numbers])

  return (
    <div className={style.block}>
      {odds.map((el, idx) => (
        <div key={idx} className={style.cell}>
          <Odd data={el} color={el.color.toLowerCase()} date={numbers} action={setNumbers} random={random} />
        </div>
      ))}
      <div className={style.cell}>
        <Button
          props={'button'}
          text={t('games.COLOR_COLOR.reset_numbers')}
          initial={[style.button]}
          classes={['green', !disabled && 'disabled']}
          action={() => {
            setNumbers([])
            setType('')
          }}
        />
      </div>
    </div>
  )
}

export default Numbers
