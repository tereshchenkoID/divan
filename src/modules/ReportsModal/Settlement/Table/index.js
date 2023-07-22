import {useSelector} from "react-redux";

import {getDateTime} from "helpers/getDateTime";
import {convertFixed} from "helpers/convertFixed";

import style from './index.module.scss';

const Table = ({data}) => {
    const {balance} = useSelector((state) => state.balance)
    const currency = data.Symbol || balance.account.symbol

    return (
        <div className={style.block}>
            <div className={style.row}>
                <div className={style.cell}>Number</div>
                <div className={style.cell}>{data.Namber}</div>
            </div>
            <div className={style.row}>
                <div className={style.cell}>Last settlement</div>
                <div className={style.cell}>#{data.Last_Number} ({getDateTime(data.Last_Date, 1)})</div>
            </div>
            <div className={style.row}>
                <div className={style.cell}>Actual Date / Time</div>
                <div className={style.cell}>{getDateTime(data.Date, 1)}</div>
            </div>
            <div className={style.row}>
                <div className={style.cell}>Total In</div>
                <div className={style.cell}>{currency} {convertFixed(data.Total_In)}</div>
            </div>
            <div className={style.row}>
                <div className={style.cell}>Total Out</div>
                <div className={style.cell}>{currency} {convertFixed(data.Total_Out)}</div>
            </div>
            <div className={style.row}>
                <div className={style.cell}>Jackpot 1</div>
                <div className={style.cell}>{currency} {convertFixed(data.Jackpot_1)}</div>
            </div>
            <div className={style.row}>
                <div className={style.cell}>Jackpot 2</div>
                <div className={style.cell}>{currency} {convertFixed(data.Jackpot_2)}</div>
            </div>
            <div className={style.row}>
                <div className={style.cell}>Jackpot 3</div>
                <div className={style.cell}>{currency} {convertFixed(data.Jackpot_3)}</div>
            </div>
            <div className={style.row}>
                <div className={style.cell}>Reversal</div>
                <div className={style.cell}>{currency} {convertFixed(data.Reversal)}</div>
            </div>
            <div className={style.row}>
                <div className={style.cell}>Profit</div>
                <div className={style.cell}>{currency} {convertFixed(data.Profit)}</div>
            </div>
            <div className={style.row}>
                <div className={style.cell}>Open Payouts</div>
                <div className={style.cell}>{currency} {convertFixed(data.Open_Payouts)}</div>
            </div>
        </div>
    );
}

export default Table;
