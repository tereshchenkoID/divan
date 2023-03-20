import {useEffect, useState, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import { useReactToPrint } from 'react-to-print';

import {getMinMaxOdd, getBetMaxSingle, getTotalStakeSystem, getTotalStakeSingle, getSystemCombination, getSystemBetMinMaxSystem} from 'hooks/useStake'

import {deleteBetslip} from "store/actions/betslipAction";
import {setStake} from "store/actions/stakeAction";
import {setTicket} from "store/actions/ticketAction";
import {setBalance} from "store/actions/balanceAction";
import {postData} from "helpers/api";

import {setNotification} from "store/actions/notificationAction";

import TicketModal from "modules/TicketModal";
import Button from "components/Button";

import Tickets from "./Tickets";
import Stakes from "./Stakes";
import Bets from "./Bets";
import Types from "./Types";

import style from './index.module.scss';

import {Print} from './Print';


const Betslip = () => {
    const dispatch = useDispatch()
    const {betslip} = useSelector((state) => state.betslip)
    const {stake} = useSelector((state) => state.stake)
    const {ticket} = useSelector((state) => state.ticket)
    const {setting} = useSelector((state) => state.setting)
    const {settings} = useSelector((state) => state.settings)
    const {balance} = useSelector((state) => state.balance)

    const componentRef = useRef();

    const [init, setInit] = useState(false)
    const [disabled, setDisabled] = useState(true)
    const [type, setType] = useState(0)
    const [checkTicket, setCheckTicket] = useState(false)

    const [response, setResponse] = useState(null)

    const sendStake = () => {
        const max = 200

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

        postData('/placebet', JSON.stringify(a))
            .then((json) => {
                if (json) {
                    setResponse(json)

                    dispatch(setBalance())
                    dispatch(deleteBetslip([]))
                    dispatch(setStake([]))
                    // dispatch(setNotification('Bet was successful!'))
                    // setTimeout(() => {
                    //     dispatch(setNotification(null))
                    // }, 2000)
                }
                else {
                    dispatch(setNotification('Stake per bet is lower than minimum $300'))
                }
            })
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

    const a = useReactToPrint({
        content: () => componentRef.current,
    })

    useEffect(() => {
        response && a()
    }, [response])

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
                response &&
                <div className={style.print}>
                    <Print data={response} ref={componentRef} />
                </div>
            }
            {
                checkTicket &&
                <TicketModal
                    id={0}
                    action={setCheckTicket}
                />
            }
            <div className={style.body}>
            {
                ticket.toggle === 0
                    ?
                        betslip.length > 0 &&
                        <>
                            <Bets
                                betslip={betslip}
                                stake={stake}
                                type={type}
                                setInit={setInit}
                                setDisabled={setDisabled}
                            />
                            <Types
                                type={type}
                                setType={setType}
                                disabled={disabled}
                            />
                            <Stakes
                                stake={stake}
                                setInit={setInit}
                            />
                        </>
                    :
                        <div className={style.list}>
                            <Tickets />
                        </div>
            }
            </div>
            {
                (ticket.toggle === 0 && betslip.length) &&
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
            }
            <div className={style.footer}>
                <div className={style.button}>
                    <Button
                        type={'red'}
                        size={'lg'}
                        icon={'trash'}
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
                        icon={'search'}
                        action={() => {
                            setCheckTicket(true)
                        }}
                    />
                </div>
                <div className={style.button}>
                    <Button
                        type={'blue'}
                        size={'lg'}
                        icon={'repeat-print'}
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
