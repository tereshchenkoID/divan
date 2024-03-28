import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

import { setModal } from 'store/actions/modalAction'

const StartTimer = ({ timer, setDisabled, isActive }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    if (isActive) {
      const time = timer.time.split(':')
      if (Number(time[0]) === 0 && Number(time[1]) < 7 && Number(time[1]) > 0) {
        dispatch(setModal(1))
        setDisabled(true)
      }
    }
  }, [dispatch, isActive, timer, setDisabled])

  return <div>{timer.next}</div>
}

export default StartTimer
