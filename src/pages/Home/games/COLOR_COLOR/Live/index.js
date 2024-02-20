import { useState, useEffect } from 'react'

import Loader from 'components/Loader'
import Translation from './Translation'
import History from './History'

import { useSelector } from 'react-redux'
import { checkData } from 'helpers/checkData'

import style from './index.module.scss'

const Live = () => {
  const { update } = useSelector(state => state.update)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    !checkData(update) && setLoading(false)
  }, [update])

  return (
    <div className={style.block}>
      {loading ? (
        <Loader type={'block'} />
      ) : (
        <div className={style.grid}>
          <History data={update.event} />
          <Translation data={update.event} />
        </div>
      )}
    </div>
  )
}

export default Live
