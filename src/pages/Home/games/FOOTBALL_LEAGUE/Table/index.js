import React from 'react'
import { useSelector } from 'react-redux'

import Live from '../Live'
import Schedule from './Schedule'
import Tab from './Tab'

const Table = ({ active }) => {
  const { resize } = useSelector(state => state.resize)
  const { live } = useSelector(state => state.live)

  return <>{resize ? <Tab active={active} /> : live === 1 ? <Schedule active={active} /> : <Live />}</>
}

export default Table
