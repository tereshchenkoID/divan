import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

import {getDateTime} from "helpers/getDateTime";
import {convertFixed} from "helpers/convertFixed";

import style from './index.module.scss';

const Table = ({data}) => {
    const { t } = useTranslation()
    const {balance} = useSelector((state) => state.balance)
    const currency = data.Symbol || balance.account.symbol

    return (
        <div className={style.block}>
            <div className={style.row}>
                <div className={style.cell}>{t('interface.number')}</div>
                <div className={style.cell}>{data.Number}</div>
            </div>
            <div className={style.row}>
                <div className={style.cell}>{t('interface.last_settlement')}</div>
                <div className={style.cell}>#{data.Last_Number} ({getDateTime(data.Last_Date, 1)})</div>
            </div>
            <div className={style.row}>
                <div className={style.cell}>{t('interface.actual_date')}</div>
                <div className={style.cell}>{getDateTime(data.Date, 1)}</div>
            </div>
            <div className={style.row}>
                <div className={style.cell}>{t('interface.total_in')}</div>
                <div className={style.cell}>{currency} {convertFixed(data.Total_In)}</div>
            </div>
            <div className={style.row}>
                <div className={style.cell}>{t('interface.total_out')}</div>
                <div className={style.cell}>{currency} {convertFixed(data.Total_Out)}</div>
            </div>
            <div className={style.row}>
                <div className={style.cell}>{t('interface.jackpot_1')}</div>
                <div className={style.cell}>{currency} {convertFixed(data.Jackpot_1)}</div>
            </div>
            <div className={style.row}>
                <div className={style.cell}>{t('interface.jackpot_2')}</div>
                <div className={style.cell}>{currency} {convertFixed(data.Jackpot_2)}</div>
            </div>
            <div className={style.row}>
                <div className={style.cell}>{t('interface.jackpot_3')}</div>
                <div className={style.cell}>{currency} {convertFixed(data.Jackpot_3)}</div>
            </div>
            <div className={style.row}>
                <div className={style.cell}>{t('interface.reversal')}</div>
                <div className={style.cell}>{currency} {convertFixed(data.Reversal)}</div>
            </div>
            <div className={style.row}>
                <div className={style.cell}>{t('interface.profit')}</div>
                <div className={style.cell}>{currency} {convertFixed(data.Profit)}</div>
            </div>
            <div className={style.row}>
                <div className={style.cell}>{t('interface.open_payouts')}</div>
                <div className={style.cell}>{currency} {convertFixed(data.Open_Payouts)}</div>
            </div>
        </div>
    );
}

export default Table;
