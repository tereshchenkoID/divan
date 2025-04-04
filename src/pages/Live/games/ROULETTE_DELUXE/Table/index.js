import React, { useState, useEffect } from 'react'

import { useSelector } from 'react-redux'

import Pay from '../Pay'
import Numbers from '../Numbers'
import Colors from '../Colors'
import History from '../History'
import Dozens from '../Dozens'
import Hot from '../Hot'
import Sectors from '../Sectors'

import style from './index.module.scss'

const getStatus = id => {
  switch (id) {
    case 1:
      return 'init'
    case 2:
      return 'spin'
    case 3:
      return 'result'
    default:
      return 'wait'
  }
}

const Table = ({ data }) => {
  const { progress } = useSelector(state => state.progress)
  const { delta } = useSelector(state => state.delta)
  const { game } = useSelector(state => state.game)
  const [params, setParams] = useState('')

  useEffect(() => {
    setParams(
      `status=${getStatus(progress)}&number=${data.round.result || data.history[0].results}&time=${data.start}&delta=${delta}`,
    )
  }, [progress])

  return (
    <div className={style.block}>
      <div className={style.wrapper}>
        <div className={style.column}>
          <div className={style.wheel}>
            <iframe src={`${game.iframe}#/${params}`} title={'Wheel'} />
          </div>
        </div>
        <div className={style.column}>
          <div className={style.grid}>
            <div>
              <Hot history={data} />
            </div>
            <div>
              <Dozens data={data} />
            </div>
            <div>
              <Colors data={data} />
            </div>
            <div>
              <History history={data} />
            </div>
            <div>
              <Pay />
              <Sectors data={data} />
            </div>
            <div>
              <Numbers history={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Table
