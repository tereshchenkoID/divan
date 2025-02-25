import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

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

const Live = ({ active }) => {
  const { live } = useSelector(state => state.live)
  const { delta } = useSelector(state => state.delta)
  const { game } = useSelector(state => state.game)
  const [params, setParams] = useState('')

  useEffect(() => {
    setParams(`status=${getStatus(live)}&number=${active.round.result}&time=${active.start}&delta=${delta}`)
  }, [active, live])

  return (
    <div className={style.block}>
      <div className={style.wheel}>
        <iframe src={`${game.iframe}#/${params}`} title={'Wheel'} />
      </div>
    </div>
  )
}

export default Live
