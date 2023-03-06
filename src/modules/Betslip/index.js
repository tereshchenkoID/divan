import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import classNames from "classnames";

import {deleteBetslip, setBetslip} from "store/actions/betslipAction";

import {useTotalStake} from "./useTotalStake";
import {useMinMaxOdd} from "./useMinMaxOdd";

import Icon from "components/Icon";
import Bet from "./Bet";

import style from './index.module.scss';

const getMaxWin = (data) => {
    let result = 0

    // eslint-disable-next-line array-callback-return
    data.map(el => {
        result += el.stake > 0 ? el.b * el.stake : 0
    })

    return result
}


// PER_BET ставка в каждое поле
// PER_GROUP дефолтовое значение делиться на количество исходов
// e
    // a - min
    // b - max
    // c - default


// const getMinWin = (data) => {
//     const a = data.slice(0).filter(el => el.stake > 0).sort((a, b) => a.b - b.b)[0]
//     return a ? a.b * a.stake : 0
// }

const Betslip = () => {
    const dispatch = useDispatch()
    const {betslip} = useSelector((state) => state.betslip)
    const {settings} = useSelector((state) => state.settings)

    const [type, setType] = useState(0)

    const oddsState = {
        length: betslip.length,
        minOdd: useMinMaxOdd(betslip, 0),
        maxOdd: useMinMaxOdd(betslip, 1),
        totalStake: useTotalStake(betslip)
    }

    return (
        <div className={style.block}>
            <div className={style.wrapper}>
            {
                betslip.length > 0 &&
                <>
                    <div className={style.row}>
                        <div>Selection</div>
                        <div>Odds</div>
                        <div>Stake</div>
                    </div>
                    <div className={style.list}>
                        {
                            betslip.map((el, idx) =>
                                <div
                                    key={idx}
                                    className={style.item}
                                >
                                    <Bet
                                        data={el}
                                        betslip={betslip}
                                    />
                                </div>
                            )
                        }
                    </div>
                    <div className={style.types}>
                        <button
                            className={
                                classNames(
                                    style.type,
                                    type === 0 && style.active
                                )
                            }
                            onClick={() => {
                                setType(0)
                            }}
                            aria-label={'Single'}
                        >
                            Single
                        </button>
                        <button
                            className={
                                classNames(
                                    style.type,
                                    type === 1 && style.active
                                )
                            }
                            onClick={() => {
                                setType(1)
                            }}
                            aria-label={'System'}
                        >
                            System
                        </button>
                    </div>
                    <div className={style.table}>
                        <div className={style.thead}>
                            <div className={style.tr}>
                                <div className={style.th}>GR</div>
                                <div className={style.th}>Combi</div>
                                <div className={style.th}>
                                    <div className={style.th}>Odds</div>
                                    <div className={style.tr}>
                                        <div className={style.th}>Min</div>
                                        <div className={style.th}>Max</div>
                                    </div>
                                </div>
                                <div className={style.th}>Stake / Bet</div>
                            </div>
                        </div>
                        <div className={style.tbody}>
                            <div className={style.tr}>
                                <div className={style.th}>1</div>
                                <div className={style.th}>{oddsState.length}</div>
                                <div className={style.th}>{oddsState.minOdd}</div>
                                <div className={style.th}>{oddsState.maxOdd}</div>
                                <div className={style.th}>1</div>
                            </div>
                        </div>
                    </div>
                    {/*<div>*/}
                    {/*    <div className={style.stake}>*/}
                    {/*        <div>Potential MIN Win</div>*/}
                    {/*        <div>{getMinWin(betslip).toFixed(2)}</div>*/}
                    {/*    </div>*/}
                    {/*    <div className={style.stake}>*/}
                    {/*        <div>Potential MAX Win</div>*/}
                    {/*        <div>{getMaxWin(betslip).toFixed(2)}</div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </>
            }
            </div>
            <div>
                <div className={style.stake}>
                    <div>Total Stake</div>
                    <div>{oddsState.totalStake.toFixed(2)}</div>
                </div>
                <div className={style.stake}>
                    <div>Max Total Win</div>
                    <div>{getMaxWin(betslip).toFixed(2)}</div>
                </div>
            </div>
            <div className={style.footer}>
                <button
                    className={
                        classNames(
                            style.option,
                            style.red
                        )
                    }
                    onClick={() => {
                        dispatch(deleteBetslip([]))
                    }}
                    aria-label={'Remove'}
                >
                    <Icon id={'close'} />
                </button>
                <button
                    className={
                        classNames(
                            style.option,
                            style.blue
                        )
                    }
                >
                    <Icon id={'file-times'} />
                </button>
                <button
                    className={
                        classNames(
                            style.option,
                            style.olive
                        )
                    }
                >
                    <Icon id={'dollar'} />
                </button>
                <button
                    className={
                        classNames(
                            style.option,
                            style.green
                        )
                    }
                >
                    <Icon id={'check'} />
                </button>
                <button
                    className={
                        classNames(
                            style.option,
                            style.olive
                        )
                    }
                >
                    <Icon id={'print'} />
                </button>
            </div>
        </div>
    );
}

export default Betslip;
