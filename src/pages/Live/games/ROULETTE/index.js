import { gameType, matchStatus } from 'constant/config'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { setProgress } from 'store/LIVE/actions/progressAction'
import { setTv } from 'store/LIVE/actions/tvAction'

import Alert from '../../modules/Alert'
import Timer from '../../modules/Timer'
import Table from './Table'

import style from './index.module.scss'

const Page = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { tv } = useSelector(state => state.tv)
  const { game } = useSelector(state => state.game)
  const { progress } = useSelector(state => state.progress)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    dispatch(setTv(`${game.type}/${game.id}`)).then(json => {
      if (json.event.status === matchStatus.ANNOUNCEMENT) {
        dispatch(setProgress(1))
      } else if (json.event.status === matchStatus.PROGRESS) {
        dispatch(setProgress(2))
      } else if (json.event.status === matchStatus.RESULTS) {
        dispatch(setProgress(3))
      } else if (json.event.status === matchStatus.COMPLETED) {
        dispatch(setProgress(4))
      }

      setLoading(false)
    })
  }, [])

  if (loading) {
    return false
  }

  return (
    <div className={style.block}>
      {tv.event ? (
        <>
          <div className={style.info}>
            <div className={style.league}>
              <img src={game.logo} alt={game.name} />
            </div>
            {progress !== 0 && (
              <Timer data={tv.event} type={gameType.ROULETTE} />
            )}
          </div>
          <div className={style.weeks}>
            <button className={style.week}>
              {t('interface.round')} #{tv.event.round.id}
            </button>
          </div>
          <Table data={tv.event} />
        </>
      ) : (
        <Alert text={t('notification.events_not_found')} type={'default'} />
      )}
    </div>
  )
}

export default Page
