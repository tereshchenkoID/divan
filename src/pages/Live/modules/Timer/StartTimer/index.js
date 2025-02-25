import React from 'react'
import { getTimerFormat } from 'helpers/getTimerFormat'

const StartTimer = ({ timer }) => {
  return <div>{getTimerFormat(timer.time, 0)}</div>
}

export default StartTimer
