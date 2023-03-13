import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import classNames from "classnames";

import {deleteBetslip} from "store/actions/betslipAction";
import {setStake} from "store/actions/stakeAction";
import {setTicket} from "store/actions/ticketAction";

import {
    getOdds,
    getUniquePermutations,
    getBetMinMaxSystem,
    getCoverBetMaxSingle,
    getCoverStakeMaxSystem,
    getMinMaxOdd,
    getBetMaxSingle,
    getTotalStakeSystem,
    getTotalStakeSingle
} from 'modules/Betslip/useStake'

import Icon from "components/Icon";
import Bet from "./Bet";
import Stake from "./Stake";
import Ticket from "./Ticket";

import style from './index.module.scss';

const Betslip = () => {
    const dispatch = useDispatch()
    const {betslip} = useSelector((state) => state.betslip)
    const {stake} = useSelector((state) => state.stake)
    const {ticket} = useSelector((state) => state.ticket)
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
                    id: m.length,
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
        const minOdd = getMinMaxOdd(betslip, 0)
        const maxOdd = getMinMaxOdd(betslip, 1)
        const maxWin = getBetMaxSingle(betslip)
        let s

        if (init) {
            s = setting['stake-mode'] === 1 ? settings.f.c : settings.f.c
        }
        else {
            s = (stake.length && stake[0].stake) || settings.f.c
        }

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
            if (betslip.length > 1) {
                if (disabled) {
                    let e = betslip[0].mid

                    betslip.map((el) => {
                        if (e !== el.mid) {
                            setDisabled(false)
                            setType(1)
                        }
                        else {
                            setDisabled(true)
                            setType(0)
                        }

                        setDisabled(false)
                        return null
                    });
                }
            }
            else {
                setType(0)
                setDisabled(true)
            }
    }

    const updateStake = (a) => {
        if (!init) {
            for(let i = 0; i < betslip.length; i++) {
                betslip[i].stake = setting['stake-mode'] === 1 ? a : (a / betslip.length).toFixed(2)
            }
        }
        else {
            for(let i = 0; i < betslip.length; i++) {
                if (betslip[i].stake === 0) {
                    betslip[i].stake = a
                }
            }
        }

        dispatch(deleteBetslip(betslip))
    }

    useEffect(() => {
        checkType()

        if (betslip.length) {
            if (type === 0) {
                dispatch(setStake(singleHandler()))
            }
            else {
                dispatch(setStake(systemHandler()))
            }
        }
    }, [betslip, type])

    useEffect(() => {
        if (type === 0) {
            if (stake.length) {
                updateStake(stake[0].stake)
            }
        }

    }, [stake])

    return (
        <div className={style.block}>
            {
                ticket.toggle === 0
                    ?
                        <div className={style.wrapper}>
                            {
                                betslip.length > 0 &&
                                <>
                                    <div
                                        className={
                                            classNames(
                                                style.row,
                                                type === 0 ? style.md : style.sm
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
                                                        setDisabled={setDisabled}
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
                                                    disabled && style.disabled,
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
                                                        setInit={setInit}
                                                    />
                                                )
                                            }
                                        </div>
                                    </div>
                                </>
                            }
                        </div>
                    :
                        <div className={style.wrapper}>
                            <div
                                className={
                                    classNames(
                                        style.row,
                                        style.lg
                                    )
                                }
                            >
                                <div></div>
                                <div>Ticker №</div>
                                <div>Stake</div>
                                <div>Payout</div>
                            </div>
                            <div className={style.list}>
                                <Ticket />
                                <Ticket />
                            </div>
                        </div>
            }
            {
                (ticket.toggle === 0 && betslip.length) &&
                <div>
                    <div className={style.stake}>
                        <div>Total Stake</div>
                        {
                            type === 0 &&
                            <div>{getTotalStakeSingle(stake).toFixed(2)}</div>
                        }
                        {
                            type === 1 &&
                            <div>{getTotalStakeSystem(stake, setting['stake-mode']).toFixed(2)}</div>
                        }
                    </div>
                    <div className={style.stake}>
                        <div>Max Total Win</div>
                        {
                            type === 0 &&
                            <div>{getCoverBetMaxSingle(betslip).toFixed(2)}</div>
                        }
                        {
                            type === 1 &&
                            <div>{getCoverStakeMaxSystem(stake).toFixed(2)}</div>
                        }
                    </div>
                </div>
            }
            <div className={style.footer}>
                <button
                    className={
                        classNames(
                            style.option,
                            style.red
                        )
                    }
                    onClick={() => {
                        dispatch(setStake([]))
                        dispatch(deleteBetslip([]))
                        dispatch(setTicket(0))
                        setDisabled(true)
                    }}
                    aria-label={'Remove'}
                >
                    <Icon id={'close'} />
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
