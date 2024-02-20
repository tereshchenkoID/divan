import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import Loader from 'components/Loader'
import Translation from './Translation'

import { checkData } from 'helpers/checkData'

import style from './index.module.scss'

const Live = () => {
  const { update } = useSelector(state => state.update)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    !checkData(update) && setLoading(false)
  }, [update])

  return <div className={style.block}>{loading ? <Loader type={'block'} /> : <Translation data={update.event} />}</div>
}

export default Live
