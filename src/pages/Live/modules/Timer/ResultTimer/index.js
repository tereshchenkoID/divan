import { gameType, matchStatus } from 'constant/config'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { setProgress } from 'store/LIVE/actions/progressAction'
import { setHistory } from 'store/LIVE/actions/historyAction'
import { setTv } from 'store/LIVE/actions/tvAction'

import { getDifferent } from 'helpers/getDifferent'

const ResultTimer = ({ end, delta, type }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [timer, setTimer] = useState('')
  const { game } = useSelector(state => state.game)
  let animationFrameId = null

  const updateTime = () => {
    let r = getDifferent(end, delta)
    setTimer(r)

    if (r === '0') {
      dispatch(setTv(`${type}/${game.id}`)).then(json => {
        if (json.event.status === matchStatus.ANNOUNCEMENT) {
          dispatch(setProgress(1))
          type === gameType.FOOTBALL_LEAGUE &&
            dispatch(setHistory(`${type}/${game.id}`))
          return
        }
        animationFrameId = requestAnimationFrame(updateTime)
      })
    } else {
      animationFrameId = requestAnimationFrame(updateTime)
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    animationFrameId = requestAnimationFrame(updateTime)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [end, delta])

  return (
    <>
      <div>{t('interface.results')}</div>
      <div>{timer === '0' ? '00:00' : timer}</div>
    </>
  )
}

export default ResultTimer
