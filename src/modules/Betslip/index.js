import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import classNames from "classnames";

import {getMinMaxOdd, getBetMaxSingle, getTotalStakeSystem, getTotalStakeSingle, getSystemCombination, getSystemBetMinMaxSystem} from 'hooks/useStake'

import {deleteBetslip} from "store/actions/betslipAction";
import {setStake} from "store/actions/stakeAction";
import {setTicket} from "store/actions/ticketAction";
import {setNotification} from "store/actions/notificationAction";

import Button from "components/Button";
import Bet from "./Bet";
import Stake from "./Stake";
import Ticket from "./Ticket";

import style from './index.module.scss';
import bet from "./Bet";
import {postData} from "../../helpers/api";
import {hostnames} from "../../constant/config";
import {setAuth} from "../../store/actions/authAction";


const Betslip = () => {
    const dispatch = useDispatch()
    const {betslip} = useSelector((state) => state.betslip)
    const {stake} = useSelector((state) => state.stake)
    const {ticket} = useSelector((state) => state.ticket)
    const {setting} = useSelector((state) => state.setting)
    const {settings} = useSelector((state) => state.settings)
    const {balance} = useSelector((state) => state.balance)

    const [init, setInit] = useState(false)
    const [disabled, setDisabled] = useState(true)
    const [type, setType] = useState(0)

    const sendStake = () => {
        const max = 200

        // dispatch(setNotification('Stake per bet is lower than minimum $300'))

        let type = 0
        const a = {
            a: balance.account.currency,
            b: setting['stake-mode'] ? "PER_BET" : "PER_GROUP",
            c: settings.betting.odds,
            d: [],
            e: []
        }

        for (let i = 0; i < stake.length; i++) {
            if (stake[i].stake !== 0) {
                let s = {}
                s.b = stake[i].gr
                type = stake[i].type

                if (type === 1) {
                    s.a = stake[i].stake
                }

                a.d.push(s)
            }
        }

        for (let i = 0; i < betslip.length; i++) {
            if (betslip[i].stake !== 0) {
                let s = {
                    a: betslip[i].type,
                    b: betslip[i].mid,
                    c: betslip[i].b,
                    e: betslip[i].m_old,   // Change after
                    f: betslip[i].o_old    // Change after
                }

                if(type === 0) {
                    s.g = betslip[i].stake.toString()
                }

                a.e.push(s)
            }
        }

        // fetch(`https://api.qool90.bet/account/${sessionStorage.getItem('authToken')}/placebet`, {
        //     method: 'POST',
        //     body: JSON.stringify(a),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // })
        //     .then(response => {
        //         if (!response.ok) {
        //             throw new Error('Network response was not ok');
        //         }
        //         return response.json();
        //     })
        //     .catch(error => {
        //         console.error('There was a problem with the fetch operation:', error);
        //     });


        postData('/placebet', JSON.stringify(a))
            .then((json) => {
                if (json) {
                    console.log(json)
                }
                else {
                    // setError(true)
                }
            })


        // dispatch(deleteBetslip([]))
        // dispatch(setStake([]))
    }

    const systemHandler = () => {
        const r = []
        const b = getSystemCombination(betslip)

        // eslint-disable-next-line array-callback-return
        b.countList.map(el => {
            const s = []

            for (let i = 0; i < b.r.length; i++) {
                if (b.r[i].length === el.gr) {
                    s.push(b.r[i])
                }
            }

            const min = getSystemBetMinMaxSystem(s, 0)
            const max = getSystemBetMinMaxSystem(s, 1)
            const maxWin = getSystemBetMinMaxSystem(s, 2)
            const st = 0

            r.push({
                type: 1,
                id: el.combi,
                gr: el.gr,
                combi: el.combi,
                min: min,
                max: max,
                minWin: min * st,
                maxWin: maxWin * st,
                stake: st
            })

        })

        return r
    }

    const singleHandler = () => {
        const minOdd = getMinMaxOdd(betslip, 0)
        const maxOdd = getMinMaxOdd(betslip, 1)
        const maxWin = getBetMaxSingle(betslip)
        let s

        // console.log(init)

        if (init) {
            s = settings.betslip.single.default
        }
        else {
            s = (stake.length && stake[0].stake) || settings.betslip.single.default
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

                    return null
                });
            }
        }
        else {
            setType(0)
            setDisabled(true)
        }
    }

    const updateBetslip = (a) => {
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

            stake[0].stake = getTotalStakeSingle(betslip)
        }

        dispatch(deleteBetslip(betslip))
    }

    useEffect(() => {
        checkType()

        if (betslip.length) {
            // console.log("Init")
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
                // console.log("Update")
                updateBetslip(stake[0].stake)
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
                                                        stake={stake}
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
                            <div>{balance.account.symbol} {getTotalStakeSingle(betslip).toFixed(2)}</div>
                        }
                        {
                            type === 1 &&
                            <div>{balance.account.symbol} {getTotalStakeSystem(stake, setting['stake-mode']).toFixed(2)}</div>
                        }
                    </div>
                </div>
            }
            <div className={style.footer}>
                <div className={style.button}>
                    <Button
                        type={'red'}
                        size={'lg'}
                        icon={'close'}
                        action={() => {
                            dispatch(setStake([]))
                            dispatch(deleteBetslip([]))
                            dispatch(setTicket(0))
                            setDisabled(true)
                        }}
                    />
                </div>
                <div className={style.button}>
                    <Button
                        type={'green'}
                        size={'lg'}
                        icon={'check'}
                    />
                </div>
                <div className={style.button}>
                    <Button
                        type={'olive'}
                        size={'lg'}
                        icon={'print'}
                        action={() => {
                            sendStake()
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default Betslip;
