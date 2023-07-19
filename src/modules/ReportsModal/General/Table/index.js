import {useSelector} from "react-redux";

import style from './index.module.scss';

const convertFixed = (data) => {
    return parseFloat(data).toFixed(2)
}

const Table = ({data}) => {
    const {balance} = useSelector((state) => state.balance)
    const currency = balance.account.symbol || '$'

    return (
        <div className={style.block}>
            <div className={style.row}>
                <div className={style.cell}>Ticket count</div>
                <div className={style.cell}>{data.Tickets}</div>
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
                <div className={style.cell}>Open Payouts</div>
                <div className={style.cell}>{currency} {convertFixed(data.Open_Payouts)}</div>
            </div>
            <div className={style.row}>
                <div className={style.cell}>Jackpot 1 Payout</div>
                <div className={style.cell}>{currency} {convertFixed(data.Jackpot_1)}</div>
            </div>
            <div className={style.row}>
                <div className={style.cell}>Jackpot 2 Payout</div>
                <div className={style.cell}>{currency} {convertFixed(data.Jackpot_2)}</div>
            </div>
            <div className={style.row}>
                <div className={style.cell}>Jackpot 3 Payout</div>
                <div className={style.cell}>{currency} {convertFixed(data.Jackpot_3)}</div>
            </div>
            <div className={style.row}>
                <div className={style.cell}>Jackpot 1 Contribution</div>
                <div className={style.cell}>{currency} {convertFixed(data.Jackpot_Contr_1)}</div>
            </div>
            <div className={style.row}>
                <div className={style.cell}>Jackpot 2 Contribution</div>
                <div className={style.cell}>{currency} {convertFixed(data.Jackpot_Contr_2)}</div>
            </div>
            <div className={style.row}>
                <div className={style.cell}>Jackpot 3 Contribution</div>
                <div className={style.cell}>{currency} {convertFixed(data.Jackpot_Contr_3)}</div>
            </div>
            <div className={style.row}>
                <div className={style.cell}>Reversal</div>
                <div className={style.cell}>{currency} {convertFixed(data.Reversal)}</div>
            </div>
            <div className={style.row}>
                <div className={style.cell}>Commission</div>
                <div className={style.cell}>{currency} {convertFixed(data.Commission)}</div>
            </div>
            <div className={style.row}>
                <div className={style.cell}>Profit</div>
                <div className={style.cell}>{currency} {convertFixed(data.Profit)}</div>
            </div>
        </div>
    );
}

export default Table;
