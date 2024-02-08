import { gameType, matchStatus } from 'constant/config'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { setProgress } from 'store/LIVE/actions/progressAction'
import { setHistory } from 'store/LIVE/actions/historyAction'
import { setTv } from 'store/LIVE/actions/tvAction'

import { getDifferent } from 'helpers/getDifferent'

const ResultTimer = ({ data, delta, type }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [timer, setTimer] = useState('')
  const { game } = useSelector(state => state.game)

  useEffect(() => {
    let r = getDifferent(data.nextUpdate, delta)
    setTimer(r)
  }, [data.nextUpdate, delta])

  useEffect(() => {
    const a = setInterval(() => {
      let r = getDifferent(data.nextUpdate, delta)
      setTimer(r)

      if (new Date().getTime() + delta >= data.nextUpdate) {
        // if (r === '0') {
        dispatch(setTv(`${type}/${game.id}`)).then(json => {
          if (json.event.status === matchStatus.ANNOUNCEMENT) {
            dispatch(setProgress(1))
            type === gameType.FOOTBALL_LEAGUE &&
              dispatch(setHistory(`${type}/${game.id}`))
            clearInterval(a)
          }
        })
      }
    }, 1000)

    return () => {
      setTimer('')
      clearInterval(a)
    }
  }, [data.nextUpdate, delta])

  return (
    <>
      <div>{t('interface.results')}</div>
      <div>{timer === '0' ? '00:00' : timer}</div>
    </>
  )
}

export default ResultTimer
