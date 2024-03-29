import { useState, useEffect } from 'react'
import { hostnames } from 'constant/config'

import { useSelector } from 'react-redux'

import Pay from '../Pay'
import Numbers from '../Numbers'
import Colors from '../Colors'
import History from '../History'
import Dozens from '../Dozens'
import Hot from '../Hot'

import style from './index.module.scss'

const Table = ({ data }) => {
  const { progress } = useSelector(state => state.progress)
  const { delta } = useSelector(state => state.delta)
  const [params, setParams] = useState('')

  useEffect(() => {
    setParams(
      `status=${progress !== 2 ? 'init' : 'start'}&number=${data.round.result || data.history[0].results}&time=${data.start}&delta=${delta}`,
    )
  }, [progress])

  return (
    <div className={style.block}>
      <div className={style.wrapper}>
        <div className={style.column}>
          {params}
          <div className={style.wheel}>
            <iframe title={'Wheel'} src={`${hostnames.PROD}/iframe/wheel/#/${params}`} />
          </div>
        </div>
        <div className={style.column}>
          <div className={style.grid}>
            <div>
              <Hot data={data} />
            </div>
            <div>
              <Dozens data={data} />
            </div>
            <div>
              <Colors data={data} />
            </div>
            <div>
              <History data={data} />
            </div>
            <div>
              <Pay />
            </div>
            <div>
              <Numbers data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Table
