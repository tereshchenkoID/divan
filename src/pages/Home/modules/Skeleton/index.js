import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { gameType, matchStatus } from 'constant/config'

import useSocket from 'hooks/useSocket'

import { checkCmd } from 'helpers/checkCmd'
import { checkData } from 'helpers/checkData'
import { getDateTime } from 'helpers/getDateTime'
import { conditionStatus } from 'helpers/conditionStatus'

import { setData } from 'store/HOME/actions/dataAction'
import { setLive } from 'store/HOME/actions/liveAction'
import { setModal } from 'store/actions/modalAction'

import Loader from 'components/Loader'
import Alert from 'components/Alert'
import UpdateData from '../UpdateData'
import SkipModal from '../SkipModal'
import Timer from '../Timer'

import style from './index.module.scss'

import FOOTBALL_LEAGUE from 'pages/Home/games/FOOTBALL_LEAGUE/Table'
import FOOTBALL from 'pages/Home/games/FOOTBALL/Table'
import COLOR_COLOR from 'pages/Home/games/COLOR_COLOR/Table'
import ROULETTE from 'pages/Home/games/ROULETTE/Table'
import KENO from 'pages/Home/games/KENO/Table'
import DOGS_6 from 'pages/Home/games/DOGS_6/Table'
import HORSES_8_VR from 'pages/Home/games/HORSES_8_VR/Table'

const setGame = (id, active, find) => {
  switch (id) {
    case gameType.FOOTBALL:
      return <FOOTBALL active={active} />
    case gameType.FOOTBALL_LEAGUE:
      return <FOOTBALL_LEAGUE active={active} />
    case gameType.ROULETTE:
      return <ROULETTE active={active} />
    case gameType.COLOR_COLOR:
      return <COLOR_COLOR active={active} find={find} />
    case gameType.KENO:
      return <KENO active={active} find={find} />
    case gameType.DOGS_6:
      return <DOGS_6 active={active} />
    case gameType.HORSES_8_VR:
      return <HORSES_8_VR active={active} />
    default:
      return <FOOTBALL_LEAGUE active={active} />
  }
}

const Skeleton = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { sendMessage } = useSocket()

  const { data } = useSelector(state => state.data)
  const { live } = useSelector(state => state.live)
  const { modal } = useSelector(state => state.modal)
  const { game } = useSelector(state => state.game)
  const { update } = useSelector(state => state.update)
  const { isConnected, receivedMessage } = useSelector(state => state.socket)

  const [loading, setLoading] = useState(true)
  const [find, setFind] = useState(null)
  const [active, setActive] = useState(0)
  const [type, setType] = useState(null)

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

  useEffect(() => {
    setLoading(true)

    if (game !== null) {
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
              checkStatus(json.events[1])
            } else {
              setActive(json.events[0])
              dispatch(setLive(1))
            }
          }
          setType(game)
          setLoading(false)
        })
      }
    }

    return () => {
      setActive(0)
    }
  }, [game])

  useEffect(() => {
    if (receivedMessage !== '' && checkCmd('feed', receivedMessage.cmd)) {
      if (receivedMessage.events && receivedMessage.events[0].type === game.type && modal !== 2) {
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
          setType(game)
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
      ) : (
        <>
          {data && data.events.length > 0 ? (
            <>
              <div className={style.info}>
                <div className={style.league}>
                  <img src={type.logo} alt={type.name} />
                </div>
                <Timer data={active} type={type.type} />
              </div>
              <div className={style.tab}>
                {data.events.map((el, idx) => (
                  <button
                    key={idx}
                    className={classNames(style.link, el.id === active.id && style.active)}
                    onClick={() => {
                      checkStatus(el)
                      setActive(el)
                    }}
                  >
                    {el.league?.week ? `${t('interface.week')} ${el.league.week}` : getDateTime(el.start, 3)}
                  </button>
                ))}
              </div>
              {live !== 0 && (
                <>
                  <div className={style.body}>{setGame(type.type, active, find)}</div>
                  {modal === 1 && <SkipModal action={handleNext} />}
                  {active.id !== data.events[0].id && (
                    <UpdateData find={find || data.events[0]} setActive={setActive} setFind={setFind} />
                  )}
                </>
              )}
            </>
          ) : (
            <Alert text={t('notification.events_not_found')} type={'default'} />
          )}
        </>
      )}
    </div>
  )
}

export default Skeleton
