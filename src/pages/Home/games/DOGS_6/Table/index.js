import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import classNames from 'classnames'

import TableChips from './TableChips'

import style from './index.module.scss'

const TYPES = ['Main', 'Forecast', 'Quinella', 'Trincast']

const Table = ({ active }) => {
  const { t } = useTranslation()
  const { data } = useSelector(state => state.data)
  const { live } = useSelector(state => state.live)
  const [type, setType] = useState(0)

  useEffect(() => {
    return () => {
      setType(0)
    }
  }, [active])

  return (
    <>
      <div className={style.header}>
        {live === 1 &&
          TYPES.map((el, idx) => (
            <button
              key={idx}
              className={classNames(style.market, type === idx && style.active)}
              onClick={() => {
                setType(idx)
              }}
            >
              {el}
            </button>
          ))}
      </div>
      <div className={style.wrapper}>
        {live === 1 ? (
          <TableChips type={type} events={data.events} data={active} />
        ) : (
          <div className={style.live}>
            <div>{t('interface.live')}</div>
          </div>
        )}
      </div>
    </>
  )
}

export default Table
