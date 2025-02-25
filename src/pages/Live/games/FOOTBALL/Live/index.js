import React from 'react'
import { useSelector } from 'react-redux'

import { matchStatus } from 'constant/config'

import Item from './Item'

import style from './index.module.scss'

const Live = ({ data }) => {
  const { liveTimer } = useSelector(state => state.liveTimer)

  if (data.status === matchStatus.ANNOUNCEMENT) return

  return (
    <div className={style.block}>
      {data.league.matches.map((el, idx) => (
        <Item key={idx} data={el} timer={liveTimer} />
      ))}
    </div>
  )
}

export default Live
