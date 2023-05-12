import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useReactToPrint} from 'react-to-print';
import {useTranslation} from "react-i18next";

import {gameType, oddsType, printMode} from "constant/config";

import {
    getBetMaxSingle,
    getMinMaxOdd,
    getSystemBetMinMaxSystem,
    getSystemCombination,
    getTotalStakeSingle,
    getTotalStakeSystem
} from 'hooks/useStake'

import {deleteBetslip} from "store/actions/betslipAction";
import {setStake} from "store/actions/stakeAction";
import {setTicket} from "store/actions/ticketAction";
import {setBalance} from "store/actions/balanceAction";
import {getData, postData} from "helpers/api";

import {setNotification} from "store/actions/notificationAction";

import TicketModal from "modules/TicketModal";
import Button from "components/Button";

import Tickets from "./Tickets";
import Stakes from "./Stakes";
import Bets from "./Bets";
import Types from "./Types";
import {TicketPrint} from 'modules/TicketPrint';

import style from './index.module.scss';

const Betslip = () => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const {betslip} = useSelector((state) => state.betslip)
    const {stake} = useSelector((state) => state.stake)
    const {ticket} = useSelector((state) => state.ticket)
    const {settings} = useSelector((state) => state.settings)
    const {balance} = useSelector((state) => state.balance)

    const componentRef = useRef();

    const [init, setInit] = useState(false)
    const [disabled, setDisabled] = useState(true)
    const [type, setType] = useState(0)
    const [checkTicket, setCheckTicket] = useState(false)
    const [response, setResponse] = useState(null)

    const sendStake = () => {
        if (stake.length) {
            let type = 0

            const a = {
                a: balance.account.currency,
                b: settings.betting.type,
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

            const min = stake[0].type === 1 ? settings.betslip.system.min : settings.betslip.single.min
            const max = stake[0].type === 1 ? settings.betslip.system.max : settings.betslip.single.max

            postData('/placebet', JSON.stringify(a))
                .then((json) => {
                    if (!json.data) {
                        if (settings.print.mode === printMode.WEB_PRINT && settings.print.payout) {
                            setResponse(json)
                        }

                        dispatch(setBalance())
                        dispatch(deleteBetslip([]))
                        dispatch(setStake([]))
                    }
                    else {
                        dispatch(setNotification(t('notification.stake_lower_upper')
                            .replaceAll('${symbol}', settings.account.symbol)
                            .replace('${min}', min)
                            .replace('${max}', max)
                        ))
                    }
                })
        }
        else {
            dispatch(setNotification(t('notification.please_pick_up_bet')))
        }
    }

    const repeatPrint = () => {
        getData(`/reprint`).then((json) => {
            if (json.hasOwnProperty('stake')) {
                if (settings.print.mode === printMode.WEB_PRINT && settings.print.payout) {
                    setResponse(json)
                }
            }
            else {
                dispatch(setNotification(t('notification.ticket_not_found')))
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
            const st = settings.betslip.system.default

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

    const checkGames = () => {
        if(betslip.length) {
            const t = betslip[0].type
            return betslip.find(el => {
                return el.type !== t
            })
        }
        else {
            return null
        }
    }

    const singleHandler = () => {
        const minOdd = getMinMaxOdd(betslip, 0)
        const maxOdd = getMinMaxOdd(betslip, 1)
        const maxWin = getBetMaxSingle(betslip)
        let s

        const f = checkGames()

        if (f) {
            s = getTotalStakeSingle(betslip)
        }
        else {
            if (!init) {

                if (betslip[0].type === gameType.FOOTBALL_LEAGUE) {
                    s = settings.betting.type === oddsType.PER_BET ? settings.betslip.single.default: settings.betslip.single.default / betslip.length
                }
                else {
                    s = getTotalStakeSingle(betslip)
                }
            }
            else {
                s = getTotalStakeSingle(betslip)
            }
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
            const f = betslip.find(el => { return el.type !== gameType.FOOTBALL_LEAGUE })
            if (f) {
                setDisabled(true)
                setType(0)
            }
            else {
                let e = betslip[0].mid
                const c = betslip.find(el => { return el.mid !== e })

                if (!c) {
                    setDisabled(true)
                    setType(0)
                }
                else {
                    setDisabled(false)
                }
            }
        }
        else {
            setType(0)
            setDisabled(true)
        }
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
            if (type === 0) {
                dispatch(setStake(singleHandler()))
            }
            else {
                dispatch(setStake(systemHandler()))
            }
        }
    }, [betslip, type])

    useEffect(() => {
        if (betslip.length === 0 && stake.length === 0) {
            setDisabled(true)
            setInit(false)
        }
    }, [betslip])

    return (
        <div className={style.block}>
            {
                response &&
                <div className={style.print}>
                    <TicketPrint
                        data={response}
                        ref={componentRef}
                    />
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
                            <Stakes stake={stake} />
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
                    <div>{t('interface.total_stake')}</div>
                    {
                        type === 0 &&
                        <div>{balance.account.symbol} {getTotalStakeSingle(betslip).toFixed(2)}</div>
                    }
                    {
                        type === 1 &&
                        <div>{balance.account.symbol} {getTotalStakeSystem(stake, settings.betting.type).toFixed(2)}</div>
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
                            setInit(false)
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
                        action={() => {
                            repeatPrint()
                        }}
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
