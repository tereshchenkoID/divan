import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'

import MatchTimer from './MatchTimer'
import StartTimer from './StartTimer'
import ResultTimer from './ResultTimer'
import UpdateTimer from './UpdateTimer'

import { gameType, matchStatus } from 'constant/config'

import useSocket from 'hooks/useSocket'
import { convertTime } from 'helpers/convertTime'
import { checkCmd } from 'helpers/checkCmd'
import { getToken } from 'helpers/getToken'

import { setData } from 'store/HOME/actions/dataAction'
import { setLive } from 'store/HOME/actions/liveAction'
import { setModal } from 'store/actions/modalAction'
import { setLiveTimer } from 'store/HOME/actions/liveTimerAction'

import style from './index.module.scss'
import classNames from 'classnames'

const Timer = ({ active, setActive, timer, setDisabled, initTime }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { sendMessage } = useSocket()
  const { resize } = useSelector(state => state.resize)
  const { data } = useSelector(state => state.data)
  const { game } = useSelector(state => state.game)
  const { live } = useSelector(state => state.live)
  const { delta } = useSelector(state => state.delta)
  const { receivedMessage, isConnected } = useSelector(state => state.socket)
  const [isRequesting, setIsRequesting] = useState(false)
  const isActive = timer.currentId === timer.nextId

  useEffect(() => {
    if (isActive && new Date().getTime() + delta > active.nextUpdate) {
      if (isConnected) {
        sendMessage({
          cmd: `feed/${getToken()}/${game.type}/${game.id}`,
        })
      } else {
        if (!isRequesting) {
          setIsRequesting(true)
          dispatch(setData(game))
            .then(json => {
              if (live === 1 && json.events[0].status === matchStatus.PROGRESS) {
                initTime(json.events[1], 2)
                dispatch(setLive(1))
                setActive(json.events[1])
                !resize && setDisabled(false)
                dispatch(setModal(0))
              } else if (live === 2 && json.events[0].status === matchStatus.RESULTS) {
                setActive(json.events[0])
                initTime(json.events[0], 2)
                dispatch(setLive(3))
                dispatch(setLiveTimer(0))
              } else if (live === 3 && json.events[0].status === matchStatus.ANNOUNCEMENT) {
                setActive(json.events[0])
                initTime(json.events[0], 2)
                dispatch(setLive(1))
              }
              setIsRequesting(false)
            })
            .catch(error => {
              setIsRequesting(false)
              console.error('Error:', error)
            })
        }
      }
    }
  }, [dispatch, live, game, delta, timer])

  useEffect(() => {
    if (receivedMessage !== '' && checkCmd('feed', receivedMessage.cmd)) {
      if (isActive && new Date().getTime() + delta > active.nextUpdate) {
        dispatch(setData(game, receivedMessage)).then(() => {
          if (live === 1 && receivedMessage.events[0].status === matchStatus.PROGRESS) {
            initTime(receivedMessage.events[1], 2)
            dispatch(setLive(1))
            setActive(receivedMessage.events[1])
            !resize && setDisabled(false)
            dispatch(setModal(0))
          } else if (live === 2 && receivedMessage.events[0].status === matchStatus.RESULTS) {
            setActive(receivedMessage.events[0])
            initTime(receivedMessage.events[0], 2)
            dispatch(setLive(3))
            dispatch(setLiveTimer(0))
          } else if (live === 3 && receivedMessage.events[0].status === matchStatus.ANNOUNCEMENT) {
            setActive(receivedMessage.events[0])
            initTime(receivedMessage.events[0], 2)
            dispatch(setLive(1))
          }
        })
      } else {
        dispatch(setData(game, receivedMessage)).then(() => {
          !resize && setDisabled(false)
        })
      }
    }
  }, [receivedMessage])

  if (!live) {
    return false
  }

  return (
    <div className={style.block}>
      <div className={classNames(style.top, game.type !== gameType.SPORT_PR && style.lg)}>
        {live === 1 && <StartTimer timer={timer} game={game} setDisabled={setDisabled} isActive={isActive} />}
        {live === 2 && t('interface.live')}
      </div>
      <div className={style.bottom}>
        {live === 1 && <div>{convertTime(active.start, delta)}</div>}
        {live === 2 && <MatchTimer active={active} timer={timer} />}
        {live === 3 && <ResultTimer timer={timer} />}
        {live === 4 && <div>{t('interface.results')}</div>}
      </div>
      {!isActive && <UpdateTimer active={data.events?.[0]} timer={timer} setDisabled={setDisabled} />}
    </div>
  )
}

export default Timer
