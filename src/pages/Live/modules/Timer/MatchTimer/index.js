import { gameType } from 'constant/config'
import { useSelector } from 'react-redux'

const MatchTimer = () => {
  const { game } = useSelector(state => state.game)
  const { liveTimer } = useSelector(state => state.liveTimer)

  return <div>{liveTimer === '0' ? '00:00' : `${liveTimer}${game.type === gameType.FOOTBALL_LEAGUE ? `'` : ''}`}</div>
}

export default MatchTimer
