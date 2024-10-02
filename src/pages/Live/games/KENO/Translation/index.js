import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import classNames from 'classnames'

import { getDifferent } from 'helpers/getDifferent'

import Numbers from '../Numbers'
import Odd from '../Odd'

import style from './index.module.scss'

const getDuration = (start, next) => {
  const c = new Date(start).getTime()
  const r = new Date(next - c)
  return r.getMinutes() * 60 + r.getSeconds()
}

const Translation = ({ data }) => {
  const { delta } = useSelector(state => state.delta)
  const { liveTimer } = useSelector(state => state.liveTimer)
  const { progress } = useSelector(state => state.progress)
  const [numbers, setNumbers] = useState([
    { value: 1, active: false, transform: -40 },
    { value: 2, active: false, transform: 5 },
    { value: 3, active: false, transform: -20 },
    { value: 4, active: false, transform: 10 },
    { value: 5, active: false, transform: 35 },
    { value: 6, active: false, transform: -55 },
    { value: 7, active: false, transform: 45 },
    { value: 8, active: false, transform: 0 },
    { value: 9, active: false, transform: -30 },
    { value: 10, active: false, transform: 60 },
    { value: 11, active: false, transform: 25 },
    { value: 12, active: false, transform: -15 },
    { value: 13, active: false, transform: 50 },
    { value: 14, active: false, transform: -10 },
    { value: 15, active: false, transform: -25 },
    { value: 16, active: false, transform: 5 },
    { value: 17, active: false, transform: -5 },
    { value: 18, active: false, transform: -45 },
    { value: 19, active: false, transform: 20 },
    { value: 20, active: false, transform: 15 },
    { value: 21, active: false, transform: -50 },
    { value: 22, active: false, transform: 40 },
    { value: 23, active: false, transform: -35 },
    { value: 24, active: false, transform: -23 },
    { value: 25, active: false, transform: -10 },
    { value: 26, active: false, transform: 30 },
    { value: 27, active: false, transform: -70 },
    { value: 28, active: false, transform: -45 },
    { value: 29, active: false, transform: 75 },
    { value: 30, active: false, transform: -10 },
    { value: 31, active: false, transform: -25 },
    { value: 32, active: false, transform: 50 },
    { value: 33, active: false, transform: -15 },
    { value: 34, active: false, transform: 20 },
    { value: 35, active: false, transform: -5 },
    { value: 36, active: false, transform: 40 },
    { value: 37, active: false, transform: -30 },
    { value: 38, active: false, transform: 10 },
    { value: 39, active: false, transform: -35 },
    { value: 40, active: false, transform: 65 },
    { value: 41, active: false, transform: 25 },
    { value: 42, active: false, transform: -50 },
    { value: 43, active: false, transform: -20 },
    { value: 44, active: false, transform: 15 },
    { value: 45, active: false, transform: -40 },
    { value: 46, active: false, transform: 35 },
    { value: 47, active: false, transform: -10 },
    { value: 48, active: false, transform: 5 },
    { value: 49, active: false, transform: -30 },
    { value: 50, active: false, transform: 45 },
    { value: 51, active: false, transform: 20 },
    { value: 52, active: false, transform: -60 },
    { value: 53, active: false, transform: -5 },
    { value: 54, active: false, transform: 55 },
    { value: 55, active: false, transform: -25 },
    { value: 56, active: false, transform: 30 },
    { value: 57, active: false, transform: -45 },
    { value: 58, active: false, transform: 35 },
    { value: 59, active: false, transform: 0 },
    { value: 60, active: false, transform: -70 },
    { value: 61, active: false, transform: 10 },
    { value: 62, active: false, transform: 45 },
    { value: 63, active: false, transform: -20 },
    { value: 64, active: false, transform: 20 },
    { value: 65, active: false, transform: -35 },
    { value: 66, active: false, transform: 52 },
    { value: 67, active: false, transform: -15 },
    { value: 68, active: false, transform: -40 },
    { value: 69, active: false, transform: 35 },
    { value: 70, active: false, transform: -5 },
    { value: 71, active: false, transform: 50 },
    { value: 72, active: false, transform: -10 },
    { value: 73, active: false, transform: 25 },
    { value: 74, active: false, transform: -45 },
    { value: 75, active: false, transform: 40 },
    { value: 76, active: false, transform: 15 },
    { value: 77, active: false, transform: -30 },
    { value: 78, active: false, transform: 5 },
    { value: 79, active: false, transform: -20 },
    { value: 80, active: false, transform: 50 },
  ])
  const [current, setCurrent] = useState(0)
  const [columns, setColumn] = useState([[], [], [], []])
  const scenes = data.round.scenes

  const setActive = index => {
    const newData = [...numbers]
    newData[index.value - 1] = {
      ...numbers[index.value - 1],
      active: true,
    }
    setNumbers(newData)

    const newColumns = [...columns]
    newColumns[scenes.indexOf(index) % 4].push(newData[index.value - 1])
    setColumn(newColumns)
  }

  const initActive = init => {
    const newData = [...numbers]
    init.forEach(el => {
      newData[el.value - 1].active = true
      el.transform = numbers[el.value - 1].transform
    })

    setNumbers(newData)

    const newColumns = Array.from({ length: 4 }, (_, columnIndex) =>
      init.filter((_, index) => index % 4 === columnIndex).map(el => el),
    )

    setColumn(newColumns)
  }

  const getIndex = () => {
    const timeDuration = getDuration(data.start, data.nextUpdate)
    const timeCurrent = getDifferent(data.nextUpdate, delta, 1)
    return timeDuration - timeCurrent
  }

  useEffect(() => {
    const init = scenes ? scenes.filter(el => el.update <= getIndex()) : []

    initActive((scenes || []).slice(0, init.length))
    setCurrent(init.length)

    if (scenes && current < scenes.length && getIndex() === scenes[current].update) {
      const next = current + 1
      setCurrent(next)
      setActive(scenes[Number(current)])
    }
  }, [liveTimer])

  return (
    <div className={style.block}>
      <div className={style.row}>
        {numbers.map((el, idx) => (
          <div key={idx} className={classNames(style.cell, el.active && style.active)}>
            <Odd data={el.value} />
          </div>
        ))}
      </div>
      {progress === 2 && (
        <div className={style.grid}>
          {columns.map((c_el, c_idx) => (
            <div key={c_idx} className={style.column}>
              {c_el.map((el, idx) => (
                <div key={idx} className={style.odd}>
                  <Odd data={el.value} size={'xxl'} transform={el.transform} />
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
      {progress === 3 && (
        <div className={style.grid}>
          {Array.from({ length: 8 }, (_, idx) => (
            <Numbers key={idx} tip={8 - idx} data={data} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Translation
