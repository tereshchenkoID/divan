import {useState} from "react";

import classNames from "classnames";

import Odd from "../../Odd";

import Number from "../../Number";

import style from './index.module.scss';

const findBets = (data, id) => {
    const r = data.filter(el => {
        return el.a.indexOf(id) === 0
    })

    if (id.length > 1) {
        r.splice(id[0] - 1, 0, {})
        r.splice(id[2] - 1, 0, {})
    }
    else {
        r.splice(id - 1, 0, {})
    }

    return r
}

const ForecastTrincast = ({data}) => {
    const [selectForecast, setForecastSelect] = useState([])
    const [selectTrincast, setTrincastSelect] = useState([])
    const [forecast, setForecast] = useState([])
    const [trincast, setTrincast] = useState([])

    const addForecastStake = (el) => {
        setForecastSelect([el])

        setTrincast([])
        setTrincastSelect([])
        setForecast(findBets(data.event.g.e.g.b, el.a))
    }

    const addTrincastStake = (el) => {
        setTrincastSelect([el])

        setTrincast(findBets(data.event.g.e.h.b, el.a))
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
                                className={style.cell}
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
                                        className={style.cell}
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
