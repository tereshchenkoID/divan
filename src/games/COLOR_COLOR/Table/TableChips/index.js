import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";

import {colorType, gameType} from "constant/config";

import classNames from "classnames";

import {deleteBetslip} from "store/actions/betslipAction";

import Numbers from "../Numbers";
import Colors from "../Colors";
import Anaconda from "./Anaconda";
import Zero from "./Zero";
import Matched from "./Matched";

import style from './index.module.scss';

const getValue = (data, key) => {
    const r = []
    data.map(el => {
        r.push(el[key])
        return true
    })
    return r.join(', ')
}

const defaultProps = (id, start, roundId) => {
    return {
        roundId: roundId,
        id: id,
        start: start,
        stake: 100,
        type: gameType.COLOR_COLOR
    }
}

const findExists = (data, betslip) => {
    const r = []

    data.map(el => {
        const d = betslip.find(f => f.print === el.print && f.roundId === el.roundId)
        if (!d) {
            r.push(el)
        }

        return true
    })

    return r
}

const TableChips = ({random, t, data}) => {
    const dispatch = useDispatch()
    const {betslip} = useSelector((state) => state.betslip)
    const [colors, setColors] = useState([])
    const [numbers, setNumbers] = useState([])
    const [disabled, setDisabled] = useState(true)
    const [type, setType] = useState('')

    useEffect(() => {
        if(colors.length > 0) {
            setDisabled(false)
        }
        else if(type !== '') {
            setDisabled(false)
        }
        else {
            setDisabled(true)
        }
    }, [colors, numbers, type])

    const ANACONDA = () => {
        const o = getValue(numbers, 'id')
        const f = data.round.odds.markets[1].outcomes.find(el => el.a === `${numbers.length}_6`)

        return f
            ?
                {
                    ...defaultProps(f.id, data.start, data.id),
                    b: f.b || 0,
                    m_old: data.round.odds.markets[1].name,
                    o_old: o,
                    market: data.round.odds.markets[1].name,
                    print: `${data.round.odds.markets[1].printname}: ${o}`
                }
            :
                null
    }

    const MATCHED = () => {
        const r = []
        type.map(el => {
            const o = getValue(numbers, 'id')

            r.push({
                ...defaultProps(data.round.odds.markets[0].outcomes[el - 1].id, data.start, data.id),
                b: data.round.odds.markets[0].outcomes[el - 1].b || 0,
                m_old: data.round.odds.markets[0].name,
                o_old: o,
                market: data.round.odds.markets[0].name,
                print: `${data.round.odds.markets[0].printname}: (${data.round.odds.markets[0].outcomes[el - 1].a}) ${o}`
            })

            return true
        })

        return r
    }

    const BET_ZERO = () => {
        const r = []
        const f = data.round.odds.markets[2].outcomes.find(el => parseInt(el.a, 10) === numbers.length)

        if (f) {
            const o = getValue(numbers, 'id')

            r.push({
                ...defaultProps(f.id, data.start, data.id),
                b: f.b || 0,
                m_old: data.round.odds.markets[2].name,
                o_old: o,
                market: data.round.odds.markets[2].name,
                print: `${data.round.odds.markets[2].printname}: ${o}`
            })
        }
        return r
    }

    const COLOR = () => {
        const r = []

        colors.map(el => {
            r.push({
                ...defaultProps(el.id, data.start, data.id),
                b: el.b,
                m_old: el.market,
                o_old: el.outcome,
                market: el.market,
                print: `${colorType.COLOR}: ${el.outcome} ${el.color.toUpperCase()}`
            })

            return true
        })

        return r
    }

    const addStake = () => {
        const a = betslip.slice(0)
        let r = []

        if (type !== '') {

            if (typeof type !== 'string') {
                r = r.concat(MATCHED())
            }
            else if(type === colorType.BET_ZERO) {
                r = r.concat(BET_ZERO())
            }
            else if(type === colorType.ANACONDA) {
                r = r.concat(ANACONDA())
            }
        }

        if (colors.length > 0){
            r = r.concat(COLOR())
        }

        dispatch(deleteBetslip(a.concat(betslip.length > 0 ? findExists(r, betslip) : r)))
        setDisabled(true)
        setColors([])
        setNumbers([])
        setType('')

        console.log(betslip)
    }

    return (
        <div className={style.block}>
            <div className={style.wrapper}>
                <Numbers
                    numbers={numbers}
                    setNumbers={setNumbers}
                    random={random}
                    setType={setType}
                />

                <div className={style.labels}>
                    <div className={style.label}>{t('games.COLOR_COLOR.winning_colors')}</div>
                    <div className={style.label}>{t('games.COLOR_COLOR.number_of_colors')}</div>
                </div>

                <Colors
                    data={data}
                    colors={colors}
                    setColors={setColors}
                />
            </div>

            <div className={style.wrapper}>
                <div className={style.content}>
                    <button
                        className={
                            classNames(
                                style.button,
                                disabled && style.disabled
                            )
                        }
                        onClick={() => {
                            addStake()
                        }}
                    >
                        {t('games.COLOR_COLOR.place_bets')}
                    </button>
                </div>

                <Matched
                    numbers={numbers}
                    type={type}
                    setType={setType}
                    t={t}
                />
                <Anaconda
                    numbers={numbers}
                    type={type}
                    setType={setType}
                    t={t}
                />
                <Zero
                    numbers={numbers}
                    type={type}
                    setType={setType}
                    t={t}
                />
            </div>
        </div>
    );
}

export default TableChips;
