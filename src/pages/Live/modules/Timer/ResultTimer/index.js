import { matchStatus } from 'constant/config'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { setProgress } from 'store/LIVE/actions/progressAction'
import { setTv } from 'store/LIVE/actions/tvAction'

const ResultTimer = ({ delta, timer }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { tv } = useSelector(state => state.tv)
  const { game } = useSelector(state => state.game)

  useEffect(() => {
    if (new Date().getTime() + delta > tv.event.nextUpdate) {
      dispatch(setTv(`${game.type}/${game.id}`)).then(json => {
        if (json && json.event.status === matchStatus.ANNOUNCEMENT) {
          dispatch(setProgress(1))
        }
      })
    }
  }, [dispatch, game, tv, delta, timer])

  return (
    <>
      <div>{t('interface.results')}</div>
      <div>{timer.time}</div>
    </>
  )
}

export default ResultTimer
