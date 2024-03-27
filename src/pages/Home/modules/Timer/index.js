import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { convertTime } from 'helpers/convertTime'

import MatchTimer from './MatchTimer'
import StartTimer from './StartTimer'
import ResultTimer from './ResultTimer'
import UpdateTimer from './UpdateTimer'

import { matchStatus } from 'constant/config'

import style from './index.module.scss'
import { useEffect } from 'react'
import { checkCmd } from 'helpers/checkCmd'
import { setData } from 'store/HOME/actions/dataAction'
import { setLive } from 'store/HOME/actions/liveAction'
import { setModal } from 'store/actions/modalAction'
import { setLiveTimer } from 'store/HOME/actions/liveTimerAction'

const Timer = ({ active, setActive, timer, setDisabled, initTime }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { data } = useSelector(state => state.data)
  const { game } = useSelector(state => state.game)
  const { live } = useSelector(state => state.live)
  const { delta } = useSelector(state => state.delta)
  const { receivedMessage } = useSelector(state => state.socket)
  const isActive = timer.currentId === timer.nextId

  useEffect(() => {
    if (receivedMessage !== '' && checkCmd('feed', receivedMessage.cmd)) {
      if (isActive && new Date().getTime() + delta > active.nextUpdate) {
        dispatch(setData(game, receivedMessage)).then(() => {
          if (live === 1 && receivedMessage.events[0].status === matchStatus.PROGRESS) {
            initTime(receivedMessage.events[1])
            dispatch(setLive(1))
            setActive(receivedMessage.events[1])
            setDisabled(false)
            dispatch(setModal(0))
          } else if (live === 2 && receivedMessage.events[0].status === matchStatus.RESULTS) {
            setActive(receivedMessage.events[0])
            initTime(receivedMessage.events[0])
            dispatch(setLive(3))
            dispatch(setLiveTimer(0))
          } else if (live === 3 && receivedMessage.events[0].status === matchStatus.ANNOUNCEMENT) {
            setActive(receivedMessage.events[0])
            initTime(receivedMessage.events[0])
            dispatch(setLive(1))
          }
        })
      } else {
        dispatch(setData(game, receivedMessage)).then(() => {
          setDisabled(false)
        })
      }
    }
  }, [receivedMessage])

  if (!live) {
    return false
  }

  return (
    <div className={style.block}>
      <div className={style.top}>
        {live === 1 && (
          <StartTimer
            active={active}
            setActive={setActive}
            timer={timer}
            setDisabled={setDisabled}
            isActive={isActive}
            initTime={initTime}
          />
        )}
        {live === 2 && t('interface.live')}
      </div>
      <div className={style.bottom}>
        {live === 1 && <div>{convertTime(active.start, delta)}</div>}
        {live === 2 && <MatchTimer active={active} setActive={setActive} timer={timer} isActive={isActive} initTime={initTime} />}
        {live === 3 && (
          <ResultTimer active={active} setActive={setActive} timer={timer} isActive={isActive} initTime={initTime} />
        )}
        {live === 4 && <div>{t('interface.results')}</div>}
      </div>
      {!isActive && <UpdateTimer active={data.events?.[0]} timer={timer} setDisabled={setDisabled} />}
    </div>
  )
}

export default Timer
