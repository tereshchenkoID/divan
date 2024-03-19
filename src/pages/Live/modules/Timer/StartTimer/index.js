import { matchStatus } from 'constant/config'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setProgress } from 'store/LIVE/actions/progressAction'
import { setModal } from 'store/actions/modalAction'
import { setTv } from 'store/LIVE/actions/tvAction'

const StartTimer = ({ delta, timer }) => {
  const dispatch = useDispatch()
  const { tv } = useSelector(state => state.tv)
  const { progress } = useSelector(state => state.progress)
  const { game } = useSelector(state => state.game)

  useEffect(() => {
    if (progress === 1) {
      const time = timer.time.split(':')
      if (Number(time[0]) === 0 && Number(time[1]) < 4 && Number(time[1]) > 0) {
        dispatch(setModal(1))
      }
    }

    if (new Date().getTime() + delta > tv.event.nextUpdate) {
      dispatch(setTv(`${game.type}/${game.id}`)).then(json => {
        if (json && json.event.status === matchStatus.PROGRESS) {
          dispatch(setProgress(2))
          dispatch(setModal(0))
        }
      })
    }
  }, [dispatch, progress, game, tv, delta, timer])

  return <div>{timer.time}</div>
}

export default StartTimer
