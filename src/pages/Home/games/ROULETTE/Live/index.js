import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import { hostnames } from 'constant/config'

import style from './index.module.scss'

const getStatus = id => {
  switch (id) {
    case 1:
      return 'init'
    case 2:
      return 'spin'
    case 3:
      return 'result'
    default:
      return 'wait'
  }
}

const Live = ({ active }) => {
  const { live } = useSelector(state => state.live)
  const { delta } = useSelector(state => state.delta)
  const [params, setParams] = useState('')

  useEffect(() => {
    setParams(`status=${getStatus(live)}&number=${active.round.result}&time=${active.start}&delta=${delta}`)
  }, [active, live])

  return (
    <div className={style.block}>
      <div className={style.wheel}>
        <iframe src={`${hostnames.PROD}/iframe/wheel/#/${params}`} title={'Wheel'} />
      </div>
    </div>
  )
}

export default Live
