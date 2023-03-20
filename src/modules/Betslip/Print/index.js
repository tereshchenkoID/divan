import React from "react";
import {useSelector} from "react-redux";

import {getDateTime} from "helpers/getDateTime";

import style from './index.module.scss';

export const Print = React.forwardRef((data, ref) => {
    const {settings} = useSelector((state) => state.settings)

    console.log(data.data)

    return (
        <div
            className={style.block}
            ref={ref}
        >
            <div className={style.header}>
                <div>
                    <div className={style.logo} />
                </div>
                <div>
                    <ul className={style.info}>
                        <li>
                            <div>Shop:</div>
                            <div>{data.data.stake.username}</div>
                        </li>
                        <li>
                            <div>Bet:</div>
                            <div>{getDateTime(data.data.stake.placed, 2)}</div>
                        </li>
                        <li>
                            <div>Time:</div>
                            <div>{getDateTime(data.data.stake.placed, 0)}</div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={style.body}>
                <div className={style.title}>Ticket #{data.data.stake.id}</div>
                <div className={style.code} />
                {
                    data.data.stake.group &&
                    data.data.stake.group.map((el, idx) =>
                        <div
                            key={idx}
                            className={style.bet}
                        >
                            <ul className={style.info}>
                                <li>
                                    <div>GR: {el.group}</div>
                                    <div>{el.group} x {settings.account.symbol} {parseFloat(el.unit).toFixed(2)} = {settings.account.symbol} {el.combi * el.unit}</div>
                                </li>
                                <li>
                                    <div>Min/Max win:</div>
                                    <div>{settings.account.symbol} {el.minwin.toFixed(2)} / {settings.account.symbol} {el.maxwin.toFixed(2)}</div>
                                </li>
                            </ul>
                        </div>
                    )
                }
                {
                    data.data.stake.bets.map((el, idx) =>
                        <div
                            key={idx}
                            className={style.bet}
                        >
                            <div className={style.wrapper}>
                                <div>{el.details.matchId}</div>
                                <div>{el.details.pos}</div>
                                <div>-</div>
                                <div className={style.teams}>
                                    <div>{el.details.teams.home}</div>
                                    <div>-</div>
                                    <div>{el.details.teams.away}</div>
                                </div>
                            </div>
                            <div className={style.wrapper}>
                                <div>{getDateTime(el.details.start, 0)}</div>
                                <div>{el.market} : {el.selection}</div>
                                <div className={style.odd}>{el.odds}</div>
                            </div>
                        </div>
                    )
                }
            </div>
            <div className={style.footer}>
                <ul className={style.info}>
                    <li>
                        <div>Total stake: </div>
                        <div>{settings.account.symbol} {data.data.stake.amount}</div>
                    </li>
                    <li>
                        <div>Min/Max win: </div>
                        <div>{settings.account.symbol} {data.data.stake.minwin.toFixed(2)} / {settings.account.symbol} {data.data.stake.maxwin.toFixed(2)}</div>
                    </li>
                </ul>
            </div>
        </div>
    );
})
