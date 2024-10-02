import { gameType } from 'constant/config'
import { useSelector } from 'react-redux'

const MatchTimer = () => {
  const { game } = useSelector(state => state.game)
  const { liveTimer } = useSelector(state => state.liveTimer)

  const isMarked = game.type.indexOf(gameType.FOOTBALL) !== -1
  const initialValues = isMarked ? `0'` : '00:00'

  return <div>{liveTimer <= 0 ? initialValues : `${liveTimer}${isMarked ? `'` : ''}`}</div>
}

export default MatchTimer
