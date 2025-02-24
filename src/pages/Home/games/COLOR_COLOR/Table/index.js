import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { matchStatus } from 'constant/config'

import Label from 'components/Label'
import Button from 'components/Button'
import TableChips from './TableChips'
import Live from '../Live'

import style from './index.module.scss'

const SORT = [5, 6, 7, 8, 9, 10]

const Table = ({ active }) => {
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
            <div>
              <Label text={t('games.COLOR_COLOR.random')} />
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
            </div>
            <div>
              <Label text={t('games.COLOR_COLOR.repeat')} />
              <div className={style.sort}>
                {data.events.map((_, idx) => (
                  <Button
                    key={idx}
                    props={'button'}
                    text={`${idx + 1}x`}
                    initial={[style.market]}
                    classes={[
                      'green',
                      data.events[0].status !== matchStatus.ANNOUNCEMENT && idx === data.events.length - 1 && 'disabled',
                      idx + 1 === repeat && 'active',
                    ]}
                    action={() => {
                      setRepeat(idx + 1)
                    }}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      <div className={style.wrapper}>
        {
          live === 1 
            ?
              <TableChips events={data.events} repeat={repeat} random={random} data={active} setRepeat={setRepeat} />
            :
              <Live />
        }
      </div>
    </>
  )
}

export default Table
