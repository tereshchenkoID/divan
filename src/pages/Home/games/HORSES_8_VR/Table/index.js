import { gameType, matchStatus } from 'constant/config'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import useSocket from 'hooks/useSocket'

import classNames from 'classnames'

import { getDateTime } from 'helpers/getDateTime'
import { conditionStatus } from 'helpers/conditionStatus'
import { checkTime } from 'helpers/checkTime'
import { checkData } from 'helpers/checkData'
import { checkCmd } from 'helpers/checkCmd'

import { setModal } from 'store/actions/modalAction'
import { setLive } from 'store/HOME/actions/liveAction'
import { setData } from 'store/HOME/actions/dataAction'

import TableChips from './TableChips'
import Loader from 'components/Loader'
import SkipModal from 'pages/Home/modules/SkipModal'
import UpdateData from 'pages/Home/modules/UpdateData'
import Timer from 'pages/Home/modules/Timer'
import Alert from 'pages/Home/modules/Alert'

import style from './index.module.scss'

const Table = () => {
  const { t } = useTranslation()
  const TYPES = ['Main', 'Forecast', 'Quinella', 'Trincast']
  const dispatch = useDispatch()
  const { sendMessage } = useSocket()

  const { data } = useSelector(state => state.data)
  const { delta } = useSelector(state => state.delta)
  const { game } = useSelector(state => state.game)
  const { modal } = useSelector(state => state.modal)
  const { live } = useSelector(state => state.live)
  const { update } = useSelector(state => state.update)
  const { isConnected, receivedMessage } = useSelector(state => state.socket)

  const [type, setType] = useState(0)
  const [find, setFind] = useState(null)
  const [active, setActive] = useState(0)
  const [loading, setLoading] = useState(true)

  const handleNext = () => {
    setFind(data.events[0])
    setActive(data.events[1])
    dispatch(setLive(1))
    dispatch(setModal(0))
  }

  const checkStatus = el => {
    if (!checkData(update) && update.event.id === el.id) {
      dispatch(setLive(conditionStatus(update.event.status)))
    } else {
      dispatch(setLive(conditionStatus(el.status)))
    }
  }

  const resetActive = () => {
    if (data.events[0].status !== matchStatus.ANNOUNCEMENT) {
      setFind(data.events[0])
    }
  }

  useEffect(() => {
    if (game !== null) {
      setLoading(true)

      if (isConnected) {
        sendMessage({
          cmd: `feed/${sessionStorage.getItem('authToken')}/${game.type}/${game.id}`,
        })
      } else {
        dispatch(setData(game)).then(json => {
          if (json.events.length > 0) {
            if (json.events[0].status !== matchStatus.ANNOUNCEMENT) {
              setActive(json.events[1])
              setFind(json.events[0])
            } else {
              setActive(json.events[0])
            }

            setLoading(false)
          } else {
            setLoading(false)
          }
        })
      }
    }
  }, [game])

  useEffect(() => {
    if (receivedMessage !== '' && checkCmd('feed', receivedMessage.cmd)) {
      if (
        receivedMessage.events &&
        receivedMessage.events[0].type === game.type &&
        modal !== 2
      ) {
        dispatch(setData(game, receivedMessage)).then(() => {
          if (receivedMessage.events[0].status !== matchStatus.ANNOUNCEMENT) {
            setActive(receivedMessage.events[1])
            setFind(receivedMessage.events[0])
            checkStatus(receivedMessage.events[1])
          } else {
            setFind(null)
            setActive(receivedMessage.events[0])
            dispatch(setLive(1))
          }

          setLoading(false)
        })
      }
    }
  }, [receivedMessage])

  useEffect(() => {
    if (modal === 1) {
      handleNext()
    }

    if (live === 4) {
      setFind(null)
      setActive(data.events[0])
      dispatch(setLive(1))
    }
  }, [live])

  return (
    <div className={style.block}>
      {loading ? (
        <Loader type={'block'} />
      ) : data && data.events.length > 0 ? (
        <>
          {modal === 1 && <SkipModal action={handleNext} />}
          {active.id !== data.events[0].id && (
            <UpdateData
              find={find || data.events[0]}
              setActive={setActive}
              setFind={setFind}
            />
          )}
          <div className={style.tab}>
            {data.events.map((el, idx) => (
              <button
                key={idx}
                className={classNames(
                  style.link,
                  el.id === active.id && style.active,
                )}
                onClick={() => {
                  checkStatus(el)
                  setActive(el)
                  setType(0)
                  resetActive()
                }}
              >
                {getDateTime(el.start, 3)}
              </button>
            ))}
          </div>
          <div className={style.info}>
            <div className={style.league}>
              <img src={game} alt={game.name} />
            </div>
            <Timer data={active} type={gameType.HORSES_8_VR} />
          </div>
          <div className={style.body}>
            <div className={style.header}>
              {checkTime(active.start, delta) &&
                TYPES.map((el, idx) => (
                  <button
                    key={idx}
                    className={classNames(
                      style.market,
                      type === idx && style.active,
                    )}
                    onClick={() => {
                      setType(idx)
                    }}
                  >
                    {el}
                  </button>
                ))}
            </div>
            <div className={style.wrapper}>
              {checkTime(active.start, delta) ? (
                <TableChips type={type} events={data.events} data={active} />
              ) : (
                <div className={style.live}>
                  <div>{t('interface.live')}</div>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <Alert text={t('notification.events_not_found')} type={'default'} />
      )}
    </div>
  )
}

export default Table
