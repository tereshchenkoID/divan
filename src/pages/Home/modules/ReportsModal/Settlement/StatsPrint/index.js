import React from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { getDateTime } from 'helpers/getDateTime'
import { convertFixed } from 'helpers/convertFixed'

import style from './index.module.scss'

export const StatsPrint = React.forwardRef((data, ref) => {
  const { t } = useTranslation()
  const { balance } = useSelector(state => state.balance)
  const currency = data.data.Symbol || balance.account.symbol

  return (
    <div className={style.block} ref={ref}>
      <div className={style.title}>
        {t('interface.settlement')} #{data.data.Number}
      </div>
      <ul className={style.info}>
        <li>
          <div>{t('interface.shop')}:</div>
          <div>{balance.username}</div>
        </li>
        <li>
          <div>{t('interface.date')}:</div>
          <div>{getDateTime(data.data.Date, 1)}</div>
        </li>
        <li>
          <div>{t('interface.type')}:</div>
          <div>{data.data.Type}</div>
        </li>
        <li>
          <div>{t('interface.previous')}:</div>
          <div>
            #{data.data.Last_Number} ({getDateTime(data.data.Last_Date, 1)})
          </div>
        </li>
        <li>
          <div>{t('interface.from')}:</div>
          <div>{getDateTime(data.data.Last_Date, 1)}</div>
        </li>
        <li>
          <div>{t('interface.to')}:</div>
          <div>{getDateTime(data.data.Date, 1)}</div>
        </li>
        <li>
          <div>{t('interface.total_in')}:</div>
          <div>
            {currency} {convertFixed(data.data.Total_In)}
          </div>
        </li>
        <li>
          <div>{t('interface.total_out')}:</div>
          <div>
            {currency} {convertFixed(data.data.Total_Out)}
          </div>
        </li>
        <li>
          <div>{t('interface.reversal')}:</div>
          <div>
            {currency} {convertFixed(data.data.Reversal)}
          </div>
        </li>
        <li>
          <div>{t('interface.profit')}:</div>
          <div>
            {currency} {convertFixed(data.data.Profit)}
          </div>
        </li>
        <li>
          <div>{t('interface.balance')}:</div>
          <div>
            {currency} {convertFixed(balance.account.balance)}
          </div>
        </li>
        <li>
          <div>{t('interface.open_payouts')}:</div>
          <div>
            {currency} {convertFixed(data.data.Open_Payouts)}
          </div>
        </li>
      </ul>
    </div>
  )
})
