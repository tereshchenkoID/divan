import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {dogsType, gameType} from "constant/config";

import {deleteBetslip, setBetslip} from "store/actions/betslipAction";

import classNames from "classnames";

import Number from "../../Number";

import style from './index.module.scss';

const findBet = (data, id) => {
    return data.find(el => {
        return el.print === id
    })
}

const findBets = (data, id) => {
    const r = data.filter(el => {
        return el.a.indexOf(id) === 0
    })

    if (id.length > 1) {
        if (id[0] < id[2]) {
            r.splice(id[0] - 1, 0, {})
            r.splice(id[2] - 1, 0, {})
        }
        else {
            r.splice(id[2] - 1, 0, {})
            r.splice(id[0] - 1, 0, {})
        }
    }
    else {
        r.splice(id - 1, 0, {})
    }

    return r
}

const ForecastTrincast = ({data}) => {
    const dispatch = useDispatch()
    const {betslip} = useSelector((state) => state.betslip)
    const [selectForecast, setForecastSelect] = useState()
    const [selectTrincast, setTrincastSelect] = useState()
    const [forecast, setForecast] = useState([])
    const [trincast, setTrincast] = useState([])


    const addStake = (market, el, step) => {
        const a = betslip.slice(0)
        const p = `${dogsType[market]}: ${el.a}`

        if (step === 2) {
            if (!findBet(a, p)) {
                dispatch(setBetslip({
                    start: null,
                    id: null,
                    b: el.b,
                    market: market,
                    print: `${dogsType[market]}: ${el.a}`,
                    m_old: market,    // Remove after
                    o_old: el.a,      // Remove after
                    stake: 100,
                    type: gameType.DOGS_6
                }))
            }
        }

        if (step === 3) {
            const f = a.find(e => {
                return e.type === gameType.DOGS_6 && el.a.indexOf(e.print.split(': ')[1]) !== -1
            })

            f.b = el.b
            f.market = el.market
            f.print = `${dogsType[market]}: ${el.a}`
            f.m_old = el.market
            f.o_old = el.a

            dispatch(deleteBetslip(a))

            setForecast([])
            setForecastSelect([])
            setTrincast([])
            setTrincastSelect([])
        }
    }

    const addForecastStake = (el) => {
        setForecastSelect(el)

        setTrincast([])
        setTrincastSelect([])
        setForecast(findBets(data.event.g.e.g.b, el.a))
    }

    const addTrincastStake = (el) => {
        addStake(data.event.g.e.h.a, el, 2)
        setTrincastSelect(el)
        setTrincast(findBets(data.event.g.e.h.b, el.a))
    }

    const addFullStake = (el) => {
        addStake(data.event.g.e.h.a, el, 3)
    }

    return (
        <div className={style.block}>
            <div className={style.table}>
                <div className={style.row}>
                    <div className={style.cell}>1</div>
                    {
                        data.event.g.e.a.b.map((el, idx) =>
                            <div
                                key={idx}
                                className={
                                    classNames(
                                        style.cell,
                                        (selectForecast && selectForecast.a) === el.a && style.active
                                    )
                                }
                                onClick={() => {
                                    addForecastStake(el)
                                }}
                            >
                                <Number
                                    key={idx}
                                    color={idx}
                                    data={idx + 1}
                                />
                                {el.b}
                            </div>
                        )
                    }
                </div>
                <div className={style.row}>
                    <div className={style.cell}>2</div>
                    {
                        forecast.map((el, idx) =>
                            el.b
                                ?
                                    <div
                                        key={idx}
                                        className={
                                            classNames(
                                                style.cell,
                                                (selectTrincast && selectTrincast.a) === el.a && style.active
                                            )
                                        }
                                        onClick={() => {
                                            addTrincastStake(el)
                                        }}
                                    >
                                        <Number
                                            key={idx}
                                            color={idx}
                                            data={idx + 1}
                                        />
                                        {el.b}
                                    </div>
                                :
                                    <div
                                        key={idx}
                                        className={
                                            classNames(
                                                style.cell,
                                                style.disabled
                                            )
                                        }
                                    >
                                        <Number
                                            key={idx}
                                            color={idx}
                                            data={idx + 1}
                                        />
                                    </div>

                        )
                    }
                </div>
                <div className={style.row}>
                    <div className={style.cell}>3</div>
                    {
                        trincast.map((el, idx) =>
                            el.b
                                ?
                                    <div
                                        key={idx}
                                        className={style.cell}
                                        onClick={() => {
                                            addFullStake(el)
                                        }}
                                    >
                                        <Number
                                            key={idx}
                                            color={idx}
                                            data={idx + 1}
                                        />
                                        {el.b}
                                    </div>
                                :
                                    <div
                                        key={idx}
                                        className={
                                            classNames(
                                                style.cell,
                                                style.disabled
                                            )
                                        }
                                    >
                                        <Number
                                            key={idx}
                                            color={idx}
                                            data={idx + 1}
                                        />
                                    </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default ForecastTrincast;
