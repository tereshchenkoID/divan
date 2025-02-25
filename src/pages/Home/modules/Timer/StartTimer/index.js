import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { gameType } from 'constant/config'

import { getTimerFormat } from 'helpers/getTimerFormat'

import { setModal } from 'store/actions/modalAction'

const StartTimer = ({ timer, game, setDisabled, isActive }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    if (isActive) {
      const time = timer.time.split(':')
      const [hours, minutes, seconds, milliseconds] = time.map(Number)
      const r = ((hours * 60 + minutes) * 60 + seconds) * 1000 + milliseconds

      if (r !== 0 && r < 7) {
        dispatch(setModal(1))
        setDisabled(true)
      }
    }
  }, [dispatch, isActive, timer, setDisabled])

  return <div>{getTimerFormat(timer.next, game.type === gameType.SPORT_PR ? 1 : 0)}</div>
}

export default StartTimer
