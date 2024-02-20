import { useSelector } from 'react-redux'

import { convertFixed } from 'helpers/convertFixed'
import { getDateTime } from 'helpers/getDateTime'

import classNames from 'classnames'

import style from './index.module.scss'
import { useTranslation } from 'react-i18next'

const sumField = (data, field) => {
  if (data.data) return data.data.reduce((sum, item) => sum + Number(item[field]), 0)

  return 0
}

const findMinMax = (data, field) => {
  if (data.data) {
    const values = data.data.map(item => Number(item[field]))
    const min = Math.min(...values)
    const max = Math.max(...values)
    return { min, max }
  }

  return {
    min: 0,
    max: 0,
  }
}

const getPercent = (data, max) => {
  return (data / max) * 100
}

const profitScale = (el, data) => {
  const f = Math.abs(data.min) + data.max
  const f_max = getPercent(data.max, f)
  const f_min = getPercent(Math.abs(data.min), f)

  return el < 0 ? f_min : f_max
}

const profitPercent = (el, data) => {
  let a = el < 0 ? getPercent(el, Math.abs(data.min)) : getPercent(el, data.max)
  return Math.abs(a)
}

const Table = ({ data }) => {
  // const data = {
  //     Currency: 'USD',
  //     Symbol: '$',
  //     data: [
  //         {
  //             Date: 1688234400000,
  //             Profit: -20746.74,
  //             Tickets: 554
  //         },
  //         {
  //             Date: 1688234400000,
  //             Profit: 131840.53,
  //             Tickets: 762
  //         },
  //         {
  //             Date: 1688234400000,
  //             Profit: 61593.42,
  //             Tickets: 597
  //         },
  //         {
  //             Date: 1688234400000,
  //             Profit: 12315.49,
  //             Tickets: 506
  //         },
  //         {
  //             Date: 1688234400000,
  //             Profit: 34522.61,
  //             Tickets: 94
  //         },
  //         {
  //             Date: 1688234400000,
  //             Profit: 31649.70,
  //             Tickets: 315
  //         },
  //         {
  //             Date: 1688234400000,
  //             Profit: 35979.12,
  //             Tickets: 158
  //         }
  //     ]
  // }

  const { t } = useTranslation()

  const { balance } = useSelector(state => state.balance)
  const currency = data.Symbol || balance.account.symbol
  const tickets = findMinMax(data, 'Tickets')
  const profit = findMinMax(data, 'Profit')

  return (
    <div className={style.block}>
      <div className={style.row}>
        <div className={style.cell}>{t('interface.date')}</div>
        <div className={style.cell}>{t('interface.tickets_count')}</div>
        <div className={style.cell}>{t('interface.profit')}</div>
      </div>
      {data.data &&
        data.data.map((el, idx) => (
          <div key={idx} className={style.row}>
            <div className={style.cell}>{getDateTime(el.Date, 2)}</div>
            <div className={style.cell}>
              {el.Tickets > 0 && (
                <div className={classNames(style.scale, style.default)}>
                  <div
                    style={{
                      width: `${getPercent(el.Tickets, tickets.max)}%`,
                    }}
                  />
                </div>
              )}
              <span>{el.Tickets}</span>
            </div>
            <div className={style.cell}>
              <div
                className={classNames(style.scale, el.Profit > 0 && style.up, el.Profit < 0 && style.down)}
                style={{
                  width: `${profitScale(el.Profit, profit)}%`,
                }}
              >
                <div
                  style={{
                    width: `${profitPercent(el.Profit, profit)}%`,
                  }}
                />
              </div>
              <span>
                {currency} {convertFixed(el.Profit, 2)}
              </span>
            </div>
          </div>
        ))}
      <div className={style.row}>
        <div className={style.cell}>
          <strong>{t('interface.total')}</strong>
        </div>
        <div className={style.cell}>
          <strong>{sumField(data, 'Tickets')}</strong>
        </div>
        <div className={style.cell}>
          <strong>
            {currency} {convertFixed(sumField(data, 'Profit'), 2)}
          </strong>
        </div>
      </div>
    </div>
  )
}

export default Table
