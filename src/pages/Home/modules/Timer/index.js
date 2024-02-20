import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import useSocket from 'hooks/useSocket'

import { setUpdate } from 'store/HOME/actions/updateAction'
import { setLive } from 'store/HOME/actions/liveAction'

import { convertTime } from 'helpers/convertTime'
import { checkData } from 'helpers/checkData'
import { checkCmd } from 'helpers/checkCmd'

import MatchTimer from './MatchTimer'
import StartTimer from './StartTimer'
import ResultTimer from './ResultTimer'

import style from './index.module.scss'

const Timer = ({ data, type }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { sendMessage } = useSocket()
  const { game } = useSelector(state => state.game)
  const { live } = useSelector(state => state.live)
  const { update } = useSelector(state => state.update)
  const { delta } = useSelector(state => state.delta)
  const { isConnected, receivedMessage } = useSelector(state => state.socket)

  useEffect(() => {}, [delta])

  useEffect(() => {
    if (live === 2 || live === 3) {
      if (isConnected) {
        sendMessage({
          cmd: `feed/${sessionStorage.getItem('authToken')}/EVENT/${data.id}`,
        })
      } else {
        dispatch(setUpdate(data.id, null))
      }
    }
  }, [live])

  useEffect(() => {
    if (receivedMessage !== '' && checkCmd('event', receivedMessage.cmd)) {
      dispatch(setUpdate(null, receivedMessage))
    }
  }, [receivedMessage])

  useEffect(() => {
    return () => {
      dispatch(setUpdate(null, null))
      dispatch(setLive(1))
    }
  }, [])

  if (!live) {
    return false
  }

  return (
    <div className={style.block}>
      <div className={style.top}>
        {live === 1 && <StartTimer data={data} delta={delta} />}
        {live === 2 && t('interface.live')}
      </div>
      <div className={style.bottom}>
        {live === 1 && <div>{convertTime(data.start, delta)}</div>}
        {live === 2 && !checkData(update) && <MatchTimer data={update} delta={delta} type={type} />}
        {live === 3 && !checkData(update) && <ResultTimer data={update} game={game} delta={delta} />}
        {live === 4 && <div>{t('interface.results')}</div>}
      </div>
    </div>
  )
}

export default Timer
