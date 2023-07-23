import React from "react";
import {useSelector} from "react-redux";

import {getDateTime} from "helpers/getDateTime";
import {convertFixed} from "helpers/convertFixed";

import style from './index.module.scss';

export const StatsPrint = React.forwardRef((data, ref) => {
    const {balance} = useSelector((state) => state.balance)
    const currency = data.data.Symbol || balance.account.symbol

    return (
        <div
            className={style.block}
            ref={ref}
        >
            <div className={style.title}>SETTLEMENT #{data.data.Namber}</div>
            <ul className={style.info}>
                <li>
                    <div>Shop:</div>
                    <div>{balance.username}</div>
                </li>
                <li>
                    <div>Date:</div>
                    <div>{getDateTime(data.data.Date, 1)}</div>
                </li>
                <li>
                    <div>Type:</div>
                    <div>{data.data.Type}</div>
                </li>
                <li>
                    <div>Previous:</div>
                    <div>#{data.data.Last_Number} ({getDateTime(data.data.Last_Date, 1)})</div>
                </li>
                <li>
                    <div>From:</div>
                    <div>{getDateTime(data.data.Last_Date, 1)}</div>
                </li>
                <li>
                    <div>To:</div>
                    <div>{getDateTime(data.data.Date, 1)}</div>
                </li>
                <li>
                    <div>Total In:</div>
                    <div>{currency} {convertFixed(data.data.Total_In)}</div>
                </li>
                <li>
                    <div>Total Out:</div>
                    <div>{currency} {convertFixed(data.data.Total_Out)}</div>
                </li>
                <li>
                    <div>Reversal:</div>
                    <div>{currency} {convertFixed(data.data.Reversal)}</div>
                </li>
                <li>
                    <div>Profit:</div>
                    <div>{currency} {convertFixed(data.data.Profit)}</div>
                </li>
                <li>
                    <div>Balance:</div>
                    <div>{currency} {convertFixed(balance.account.balance)}</div>
                </li>
                <li>
                    <div>Open Payout:</div>
                    <div>{currency} {convertFixed(data.data.Open_Payouts)}</div>
                </li>
            </ul>
        </div>
    );
})
