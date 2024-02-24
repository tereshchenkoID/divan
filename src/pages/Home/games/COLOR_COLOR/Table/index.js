import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import TableChips from './TableChips'
import Live from '../Live'

import style from './index.module.scss'

const SORT = [5, 6, 7, 8, 9, 10]

const Table = ({ active, find }) => {
  const { t } = useTranslation()
  const { data } = useSelector(state => state.data)
  const { live } = useSelector(state => state.live)
  const [repeat, setRepeat] = useState(1)
  const [random, setRandom] = useState([])

  const generateRandomArray = length => {
    let array = []

    while (array.length < length) {
      let randomNumber = Math.floor(Math.random() * 49)
      if (!array.includes(randomNumber)) {
        array.push(randomNumber)
      }
    }

    setRandom(array)
  }

  useEffect(() => {
    return () => {
      setRepeat(1)
      setRandom([])
    }
  }, [active])

  return (
    <>
      <div className={style.header}>
        {live === 1 && (
          <>
            <div className={style.label}>{t('games.COLOR_COLOR.random')}</div>
            <div className={style.label}>{t('games.COLOR_COLOR.repeat')}</div>
            <div className={style.sort}>
              {SORT.map((el, idx) => (
                <button
                  key={idx}
                  className={style.market}
                  onClick={() => {
                    generateRandomArray(el)
                  }}
                >
                  {el}
                </button>
              ))}
            </div>
            <div className={style.sort}>
              {data.events.map((el, idx) => (
                <button
                  key={idx}
                  className={classNames(
                    style.market,
                    find && idx === data.events.length - 1 && style.disabled,
                    idx + 1 === repeat && style.active,
                  )}
                  onClick={() => {
                    setRepeat(idx + 1)
                  }}
                >
                  {idx + 1}x
                </button>
              ))}
            </div>
          </>
        )}
      </div>
      <div className={style.wrapper}>
        {live === 1 ? (
          <TableChips events={data.events} repeat={repeat} random={random} data={active} setRepeat={setRepeat} />
        ) : (
          <div className={style.live}>
            <Live />
          </div>
        )}
      </div>
    </>
  )
}

export default Table
