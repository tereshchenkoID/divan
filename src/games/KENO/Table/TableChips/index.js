import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

import classNames from "classnames";

import {gameType} from "constant/config";

import {deleteBetslip} from "store/actions/betslipAction";

import {checkTime} from "helpers/checkTime";

import Numbers from "../Numbers";

import style from './index.module.scss';

const findExists = (data, betslip) => {
    const r = []

    data.map(el => {
        const d = betslip.find(f => `${f.market} ${f.o_old}` === `${el.market} ${el.o_old}` && f.roundId === el.roundId)

        if (!d) {
            r.push(el)
        }

        return true
    })

    return r
}

const TableChips = ({events, repeat, random, data, setRepeat}) => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const {betslip} = useSelector((state) => state.betslip)
    const {delta} = useSelector((state) => state.delta)

    const [disabled, setDisabled] = useState(true)
    const [numbers, setNumbers] = useState([])
    const [event, setEvent] = useState(repeat === 1 ? [data] : events)

    useEffect(() => {

        if(numbers.length > 0 && numbers.length < 9) {
            setDisabled(false)
        }
        else {
            setDisabled(true)
        }

    }, [numbers])

    useEffect(() => {
        setNumbers(random.sort((a, b) => a - b))
    }, [random])

    useEffect(() => {
        setEvent(repeat === 1 ? [data] : events)
    }, [repeat, data])

    const MATCHED = () => {
        let r = []

        event.map((round, idx) => {
            if (idx <= repeat && checkTime(round.start, delta)) {
                const f = round.round.odds.markets[0].outcomes.filter(el => el.a.indexOf(`${numbers.length}_`) !== -1)
                const s = f.sort((a, b) => b.b - a.b)[0];

                r.push({
                    id: s.id,
                    roundId: round.id,
                    start: round.start,
                    b: s.b || 0,
                    m_old: round.round.odds.markets[0].name,
                    o_old: numbers.join(', '),
                    market: round.round.odds.markets[0].name,
                    circles: numbers,
                    print: round.round.odds.markets[0].printname,
                    stake: 100,
                    type: gameType.KENO
                })
            }
        })

        return r
    }

    const addStake = () => {
        const a = betslip.slice(0)
        let r = MATCHED()

        dispatch(deleteBetslip(a.concat(betslip.length > 0 ? findExists(r, betslip) : r)))
        setDisabled(true)
        setNumbers([])
        setRepeat(1)
    }

    return (
        <div className={style.block}>
            <div className={style.header}>
                <button
                    className={
                        classNames(
                            style.button,
                            numbers.length === 0 && style.disabled
                        )
                    }
                    onClick={() => {
                        setNumbers([])
                    }}
                >
                    {t('games.KENO.reset_numbers')}
                </button>
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
                    {t('games.KENO.place_bets')}
                </button>
            </div>
            <div className={style.wrapper}>
                <Numbers
                    numbers={numbers}
                    setNumbers={setNumbers}
                    random={random}
                />
            </div>
        </div>
    );
}

export default TableChips;
