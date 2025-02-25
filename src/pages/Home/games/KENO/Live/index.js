import React from 'react'
import { useSelector } from 'react-redux'

import { matchStatus } from 'constant/config'

import Translation from './Translation'

import style from './index.module.scss'

const Live = () => {
  const { data } = useSelector(state => state.data)

  if (data.events[0].status === matchStatus.ANNOUNCEMENT) return

  return (
    <div className={style.block}>
      <Translation data={data.events[0]} />
    </div>
  )
}

export default Live
