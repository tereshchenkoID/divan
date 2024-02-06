import { matchStatus } from 'constant/config'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setProgress } from 'store/LIVE/actions/progressAction'
import { setModal } from 'store/HOME/actions/modalAction'
import { setTv } from 'store/LIVE/actions/tvAction'

import { getDifferent } from 'helpers/getDifferent'

const StartTimer = ({ start, delta, type }) => {
  const dispatch = useDispatch()
  const [timer, setTimer] = useState('')
  const [isActive, setIsActive] = useState(true)
  const { game } = useSelector(state => state.game)
  let animationFrameId = null

  const handleVisibilityChange = () => {
    setIsActive(!document.hidden)
  }

  const updateTime = () => {
    let r = getDifferent(start, delta)
    const diff = (start - (new Date().getTime() + delta)) / 1000
    setTimer(r)

    // console.log(diff)

    if (diff < 4 && diff > 1) {
      dispatch(setModal(1))
    }

    if (r === '0') {
      dispatch(setTv(`${type}/${game.id}`)).then(json => {
        if (json.event.status === matchStatus.PROGRESS) {
          dispatch(setProgress(2))
          dispatch(setModal(0))
          return
        }
        animationFrameId = requestAnimationFrame(updateTime)
      })
    } else {
      animationFrameId = requestAnimationFrame(updateTime)
    }
  }

  useEffect(() => {
    if (isActive) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      animationFrameId = requestAnimationFrame(updateTime)
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      cancelAnimationFrame(animationFrameId)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [start, delta, isActive])

  return <div>{timer}</div>
}

export default StartTimer
