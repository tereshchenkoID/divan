import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { getDifferent } from 'helpers/getDifferent'

import Odd from '../Odd'

import style from './index.module.scss'
import classNames from 'classnames'

const colorCounter = ({ results }) => {
  return results.reduce((counts, { color }) => {
    counts[color] = (counts[color] || 0) + 1
    return counts
  }, {})
}

const findMostCommonColor = data => {
  const maxCount = Math.max(...Object.values(data))
  const maxCounts = Object.entries(data).filter(([, count]) => {
    return count >= 3
  })

  return maxCounts.length > 1 || maxCount < 3 ? 'draw' : Object.keys(data).find(color => data[color] === maxCount)
}

const getDuration = (start, next) => {
  const c = new Date(start).getTime()
  const r = new Date(next - c)
  return r.getMinutes() * 60 + r.getSeconds()
}

const Translation = ({ data }) => {
  const { delta } = useSelector(state => state.delta)
  const { live } = useSelector(state => state.live)
  const { liveTimer } = useSelector(state => state.liveTimer)
  const [current, setCurrent] = useState(0)
  const [columns, setColumn] = useState([])
  const scenes = data.round.scenes

  const getIndex = () => {
    const timeDuration = getDuration(data.start, data.nextUpdate)
    const timeCurrent = getDifferent(data.nextUpdate, delta, 1)
    return timeDuration - timeCurrent
  }

  useEffect(() => {
    if (live === 2) {
      setCurrent(0)
      setColumn([])
    }
  }, [live])

  useEffect(() => {
    if (live === 1 || live === 3) {
      setCurrent(0)
      setColumn(data.history[0].results)
    } else {
      const init = scenes ? scenes.filter(el => el.update <= getIndex()) : []
      setCurrent(init.length)
      setColumn(scenes.slice(0, init.length))
    }
  }, [data])

  useEffect(() => {
    const init = scenes ? scenes.filter(el => el.update <= getIndex()) : []

    setCurrent(init.length)

    if (scenes && current < scenes.length && getIndex() === scenes[current].update) {
      const next = current + 1
      setCurrent(next)
      setColumn(scenes.slice(0, next))
    }
  }, [liveTimer])

  return (
    <div className={style.block}>
      <div className={classNames(style.row, live === 2 && style.active)}>
        {columns.map((el, idx) => (
          <div key={idx} className={style.odd}>
            <Odd key={idx} size={'xxl'} color={el.color} data={el.num} />
          </div>
        ))}
      </div>
      {(live === 1 || live === 3) && (
        <div>
          <div className={style.grid}>
            {Object.entries(colorCounter(data.history[0])).map(([color, count]) => (
              <div key={color}>
                <Odd color={color} size={'md'} data={count} />
              </div>
            ))}
          </div>
          <div>{findMostCommonColor(colorCounter(data.history[0]))}</div>
        </div>
      )}
    </div>
  )
}

export default Translation
