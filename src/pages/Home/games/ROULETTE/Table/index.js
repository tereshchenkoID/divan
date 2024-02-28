import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { hostnames } from 'constant/config'

import { checkTime } from 'helpers/checkTime'

import Label from 'components/Label'
import TableChips from './TableChips'

import style from './index.module.scss'

const SORT = [1, 2, 3, 5, 7, 10]

const Table = ({ active }) => {
  const { t } = useTranslation()
  const { live } = useSelector(state => state.live)
  const { delta } = useSelector(state => state.delta)
  const [params, setParams] = useState('')
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
    setParams(`status=${live !== 2 ? 'init' : 'start'}&number=${active.round.result}&time=${active.start}&delta=${delta}`)
  }, [live])

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
            <div />
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
            <div />
          </>
        )}
      </div>
      <div className={style.wrapper}>
        {live === 1 ? (
          <TableChips random={random} active={active} />
        ) : (
          <div className={style.live}>
            <div className={style.wheel}>
              <iframe title={'Wheel'} src={`${hostnames.PROD}/iframe/wheel/#/${params}`} />
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Table
