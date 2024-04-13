import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { checkTime } from 'helpers/checkTime'

import Label from 'components/Label'
import Button from 'components/Button'
import TableChips from './TableChips'
import Live from '../Live'

import style from './index.module.scss'

const SORT = [1, 2, 3, 5, 7, 10]

const Table = ({ active }) => {
  const { t } = useTranslation()
  const { live } = useSelector(state => state.live)
  const { resize } = useSelector(state => state.resize)
  const { delta } = useSelector(state => state.delta)
  const [random, setRandom] = useState([])

  const generateRandomArray = length => {
    let array = []

    while (array.length < length) {
      let randomNumber = Math.floor(Math.random() * 36)
      if (!array.includes(randomNumber)) {
        array.push(randomNumber)
      }
    }

    setRandom(array)
  }

  useEffect(() => {
    return () => {
      setRandom([])
    }
  }, [active])

  return (
    <>
      <div className={style.header}>
        {checkTime(active.start, delta) && (
          <>
            <Label text={t('games.ROULETTE.random')} />
            <div className={style.sort}>
              {SORT.map((el, idx) => (
                <Button
                  key={idx}
                  props={'button'}
                  text={el}
                  initial={[style.market]}
                  classes={['green']}
                  action={() => {
                    generateRandomArray(el)
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <div className={style.wrapper}>
        {!resize && <Live active={active} />}
        {live === 1 && <TableChips random={random} active={active} />}
      </div>
    </>
  )
}

export default Table
