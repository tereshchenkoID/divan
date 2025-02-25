import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getHostName } from 'helpers/getHostName'

import classNames from 'classnames'

import { setHistory } from 'store/LIVE/actions/historyAction'

import style from './index.module.scss'

const History = () => {
  const dispatch = useDispatch()
  const { game } = useSelector(state => state.game)
  const { progress } = useSelector(state => state.progress)
  const { history } = useSelector(state => state.history)
  const [loading, setLoading] = useState(true)

  const getHistory = () => {
    dispatch(setHistory(`${game.type}/${game.id}`)).then(json => {
      if (json.table) {
        setLoading(false)
      }
    })
  }

  useEffect(() => {
    getHistory()
  }, [progress, game])

  if (loading) {
    return false
  }

  return (
    <div className={style.block}>
      {history.table.map((item, index) => (
        <div key={index} className={style.row}>
          <div className={style.cell}>{item.pos}.</div>
          <div className={style.cell}>
            <div className={style.logo}>
              <img src={`${getHostName('ASSETS')}/${item.img}`} alt={item.team} loading={'lazy'} />
            </div>
          </div>
          <div className={style.cell}>{item.team}</div>
          <div className={style.cell}>{item.points}</div>
          <div className={style.cell}>
            <div className={style.states}>
              {item.last5.split('').map((char, index) => (
                <div key={index} className={classNames(style.state, style[char.toLowerCase()])}>
                  {char}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default History
