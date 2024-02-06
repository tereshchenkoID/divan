import { useState, useEffect } from 'react'

import Loader from 'components/Loader'
import Translation from './Translation'
import History from './History'

import style from './index.module.scss'

import { getData } from 'helpers/api'

import { hostnames } from 'constant/config'

const Live = () => {
  const token = sessionStorage.getItem('authToken')

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getData(`${hostnames.PROD}/viewer/event/${token}/COLOR_COLOR/49`).then(
      json => {
        if (json) {
          setData(json.event)
          setLoading(false)
        }
      },
    )
  }, [])

  return (
    <div className={style.block}>
      {loading ? (
        <Loader type={'block'} background={'transparent'} />
      ) : (
        <div className={style.grid}>
          <History data={data} />
          <Translation data={data} />
        </div>
      )}
    </div>
  )
}

export default Live
