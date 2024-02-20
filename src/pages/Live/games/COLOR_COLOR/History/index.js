import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { getDifferent } from 'helpers/getDifferent'

import Label from '../../../modules/Label'
import Odd from '../Odd'

import style from './index.module.scss'

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

const History = ({ data }) => {
  const { t } = useTranslation()
  const { delta } = useSelector(state => state.delta)
  const { progress } = useSelector(state => state.progress)
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
    if (progress === 2) {
      setCurrent(0)
      setColumn([])
    }
  }, [progress])

  useEffect(() => {
    if (progress === 1 || progress === 3) {
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

      setTimeout(() => {
        setCurrent(next)
        setColumn(scenes.slice(0, next))
      }, 500)
    }
  }, [liveTimer])

  return (
    <div className={style.block}>
      <div className={style.row}>
        <Label text={t('interface.event')} />
        <Label text={t('interface.numbers')} />
        <Label text={t('interface.colors')} />
        <Label text={t('interface.winning')} />
      </div>
      <div className={classNames(style.row, style.alt)}>
        {progress === 2 && (
          <>
            <div className={style.cell}>#{data.round.id}</div>
            <div className={style.cell}>
              {columns.map((el, idx) => (
                <div key={idx} className={style.odd}>
                  <Odd key={idx} color={el.color} data={el.num} />
                </div>
              ))}
            </div>
            <div className={style.cell} />
            <div className={style.cell} />
          </>
        )}
        {data.history.map((el, idx) => (
          <React.Fragment key={idx}>
            <div className={style.cell}>#{el.id}</div>
            <div className={style.cell}>
              {el.results.map((o_el, o_idx) => (
                <Odd key={o_idx} color={o_el.color} data={o_el.num} />
              ))}
            </div>
            <div className={classNames(style.cell, style.left)}>
              {Object.entries(colorCounter(el)).map(([color, count]) => (
                <Odd key={color} color={color} data={count} />
              ))}
            </div>
            <div className={style.cell}>
              <Odd color={findMostCommonColor(colorCounter(el))} />
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default History
