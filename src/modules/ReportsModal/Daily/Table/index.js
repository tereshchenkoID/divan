import {useSelector} from "react-redux";

import {convertFixed} from "helpers/convertFixed";
import {getDateTime} from "helpers/getDateTime";

import classNames from "classnames";

import style from './index.module.scss';

const sumField = (data, field) => {
    return data.reduce((sum, item) => sum + Number(item[field]), 0);
}

const findMinMax = (data, field) => {
    const values = data.map(item => Number(item[field]));
    return Math.max(...values);
}

const scaleX = (data, max) => {
    return data / max * 100
}

const Table = ({data}) => {
    const {balance} = useSelector((state) => state.balance)
    const currency = data.Symbol || balance.account.symbol
    const maxTickets = findMinMax(data.data, 'Tickets')
    const maxProfit = findMinMax(data.data, 'Profit')

    return (
        <div className={style.block}>
            <div className={style.row}>
                <div className={style.cell}>Date</div>
                <div className={style.cell}>Tickets count</div>
                <div className={style.cell}>Profit</div>
            </div>
            {
                data.data.map((el, idx) =>
                    <div
                        key={idx}
                        className={style.row}
                    >
                        <div className={style.cell}>{getDateTime(el.Date, 2)}</div>
                        <div className={style.cell}>
                            <div
                                className={
                                    classNames(
                                        style.scale,
                                        el.Tickets > 0 && style.up
                                    )
                                }
                                style={{
                                    width: `${scaleX(el.Tickets, maxTickets)}%`,
                                }}
                            />
                            <span>{el.Tickets}</span>
                        </div>
                        <div className={style.cell}>
                            <div
                                className={
                                    classNames(
                                        style.scale,
                                        el.Profit > 0 && style.up,
                                        el.Profit < 0 && style.down
                                    )
                                }
                                style={{
                                    width: `${scaleX(el.Profit, maxProfit)}%`,
                                }}
                            />
                            <span>{currency} {convertFixed(el.Profit, 2)}</span>
                        </div>
                    </div>
                )
            }
            <div className={style.row}>
                <div className={style.cell}>
                    <strong>Total</strong>
                </div>
                <div className={style.cell}>
                    <strong>{sumField(data.data, 'Tickets')}</strong>
                </div>
                <div className={style.cell}>
                    <strong>{currency} {convertFixed(sumField(data.data, 'Profit'), 2)}</strong>
                </div>
            </div>
        </div>
    );
}

export default Table;
