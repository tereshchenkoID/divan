import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { convertFixed } from 'helpers/convertFixed'

import style from './index.module.scss'

const Table = ({ data }) => {
  const { t } = useTranslation()
  const { balance } = useSelector(state => state.balance)
  const currency = data.Symbol || balance.account.symbol

  return (
    <div className={style.block}>
      <div className={style.row}>
        <div className={style.cell}>{t('interface.ticket_count')}</div>
        <div className={style.cell}>{data.Tickets}</div>
      </div>
      <div className={style.row}>
        <div className={style.cell}>{t('interface.total_in')}</div>
        <div className={style.cell}>
          {currency} {convertFixed(data.Total_In)}
        </div>
      </div>
      <div className={style.row}>
        <div className={style.cell}>{t('interface.total_out')}</div>
        <div className={style.cell}>
          {currency} {convertFixed(data.Total_Out)}
        </div>
      </div>
      <div className={style.row}>
        <div className={style.cell}>{t('interface.open_payouts')}</div>
        <div className={style.cell}>
          {currency} {convertFixed(data.Open_Payouts)}
        </div>
      </div>
      <div className={style.row}>
        <div className={style.cell}>{t('interface.jackpot_1_payout')}</div>
        <div className={style.cell}>
          {currency} {convertFixed(data.Jackpot_1)}
        </div>
      </div>
      <div className={style.row}>
        <div className={style.cell}>{t('interface.jackpot_2_payout')}</div>
        <div className={style.cell}>
          {currency} {convertFixed(data.Jackpot_2)}
        </div>
      </div>
      <div className={style.row}>
        <div className={style.cell}>{t('interface.jackpot_3_payout')}</div>
        <div className={style.cell}>
          {currency} {convertFixed(data.Jackpot_3)}
        </div>
      </div>
      <div className={style.row}>
        <div className={style.cell}>{t('interface.jackpot_1_contribution')}</div>
        <div className={style.cell}>
          {currency} {convertFixed(data.Jackpot_Contr_1)}
        </div>
      </div>
      <div className={style.row}>
        <div className={style.cell}>{t('interface.jackpot_2_contribution')}</div>
        <div className={style.cell}>
          {currency} {convertFixed(data.Jackpot_Contr_2)}
        </div>
      </div>
      <div className={style.row}>
        <div className={style.cell}>{t('interface.jackpot_3_contribution')}</div>
        <div className={style.cell}>
          {currency} {convertFixed(data.Jackpot_Contr_3)}
        </div>
      </div>
      <div className={style.row}>
        <div className={style.cell}>{t('interface.reversal')}</div>
        <div className={style.cell}>
          {currency} {convertFixed(data.Reversal)}
        </div>
      </div>
      <div className={style.row}>
        <div className={style.cell}>{t('interface.commission')}</div>
        <div className={style.cell}>
          {currency} {convertFixed(data.Commission)}
        </div>
      </div>
      <div className={style.row}>
        <div className={style.cell}>{t('interface.profit')}</div>
        <div className={style.cell}>
          {currency} {convertFixed(data.Profit)}
        </div>
      </div>
    </div>
  )
}

export default Table
