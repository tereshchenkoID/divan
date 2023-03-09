import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import classNames from "classnames";

import {deleteBetslip} from "store/actions/betslipAction";
import {setStake} from "store/actions/stakeAction";

import {useTotalStake} from "./useTotalStake";
import {useMinMaxOdd} from "./useMinMaxOdd";

import {
    getOdds,
    getUniquePermutations,
    getBetMinMaxSystem,
    getCoverBetMaxSingle,
    getCoverBetMaxSystem, getBetMaxSingle
} from 'modules/Betslip/useStake'

import Icon from "components/Icon";
import Bet from "./Bet";
import Stake from "./Stake";

import style from './index.module.scss';

// const getMinWin = (data) => {
//     const a = data.slice(0).filter(el => el.stake > 0).sort((a, b) => a.b - b.b)[0]
//     return a ? a.b * a.stake : 0
// }


const Betslip = () => {
    const dispatch = useDispatch()
    const {betslip} = useSelector((state) => state.betslip)
    const {stake} = useSelector((state) => state.stake)
    const {setting} = useSelector((state) => state.setting)
    const {settings} = useSelector((state) => state.settings)
    const [init, setInit] = useState(false)

    const [disabled, setDisabled] = useState(true)
    const [type, setType] = useState(0)

    const systemHandler = () => {
        const a = []

        betslip.map((el, idx) => {
            if (idx !== 0) {
                const m = getUniquePermutations(getOdds(betslip), idx + 1)
                const min = getBetMinMaxSystem(m, 0)
                const max = getBetMinMaxSystem(m, 1)
                const maxWin = getBetMinMaxSystem(m, 2)
                const s = 0

                a.push({
                    type: 1,
                    id: idx + 1,
                    gr: idx + 1,
                    combi: m.length,
                    min: min,
                    max: max,
                    minWin: min * s,
                    maxWin: maxWin * s,
                    stake: s
                })
            }
        })

        return a
    }

    const singleHandler = () => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const minOdd = useMinMaxOdd(betslip, 0)
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const maxOdd = useMinMaxOdd(betslip, 1)
        const s = setting['stake-mode'] === 1 ? settings.f.c : settings.f.c
        const maxWin = getBetMaxSingle(betslip)

        return [{
            type:   0,
            id:     0,
            gr:     1,
            combi:  betslip.length,
            min:    minOdd,
            max:    maxOdd,
            minWin: minOdd * s,
            maxWin: maxWin * s,
            stake:  s
        }]
    }

    const checkType = () => {
        if (betslip.length) {
            let e = betslip[0].sid

            betslip.map((el) => {
                if (e !== el.sid) {
                    setDisabled(false)
                    setType(1)
                }
                else {
                    setDisabled(true)
                    setType(0)
                }

                return null
            });
        }
    }

    useEffect(() => {
        let b = betslip

        if (!init) {
            let a = setting['stake-mode'] === 1 ? settings.f.c : settings.f.c / betslip.length

            b.map((e) => {
                return e.stake = a
            });

            dispatch(deleteBetslip(b))
        }
        else {
            b.map((e) => {
                return e.stake = e.stake === 0 ? settings.f.c : e.stake
            });

            dispatch(deleteBetslip(b))
        }

        // checkType()
    }, [betslip, setting])

    useEffect(() => {
        if (type === 0) {
            dispatch(setStake(singleHandler()))
        }
        else {
            dispatch(setStake(systemHandler()))
        }
    }, [betslip, type])

    return (
        <div className={style.block}>
            <div className={style.wrapper}>
            {
                betslip.length > 0 &&
                <>
                    <div
                        className={
                            classNames(
                                style.row,
                                type === 0 ? style.lg : style.sm
                            )
                        }
                    >
                        <div>Selection</div>
                        <div>Odds</div>
                        {
                            type === 0 &&
                            <div>Stake</div>
                        }
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
                                        type={type}
                                        setInit={setInit}
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
                                    // disabled && style.disabled,
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
                            {
                                stake.map((el, idx) =>
                                    <Stake
                                        key={idx}
                                        data={el}
                                    />
                                )
                            }
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
            {/*<div>*/}
            {/*    <div className={style.stake}>*/}
            {/*        <div>Total Stake</div>*/}
            {/*        {*/}
            {/*            type === 0 &&*/}
            {/*            // eslint-disable-next-line react-hooks/rules-of-hooks*/}
            {/*            <div>{useTotalStake(betslip).toFixed(2)}</div>*/}
            {/*        }*/}
            {/*        {*/}
            {/*            type === 1 &&*/}
            {/*            <div>-</div>*/}
            {/*        }*/}
            {/*    </div>*/}
            {/*    <div className={style.stake}>*/}
            {/*        <div>Max Total Win</div>*/}
            {/*        {*/}
            {/*            type === 0 &&*/}
            {/*            <div>{getCoverBetMaxSingle(betslip).toFixed(2)}</div>*/}

            {/*        }*/}
            {/*        {*/}
            {/*            type === 1 &&*/}
            {/*            <div>{getCoverBetMaxSystem(getOdds(betslip), betslip.length - 1, 10).toFixed(2)}</div>*/}
            {/*        }*/}
            {/*    </div>*/}
            {/*</div>*/}
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
                        setInit(false)
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
