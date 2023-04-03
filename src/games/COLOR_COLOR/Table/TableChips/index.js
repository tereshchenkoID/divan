import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";

import classNames from "classnames";

import {colorType, gameType} from "constant/config";

import {deleteBetslip} from "store/actions/betslipAction";

import style from './index.module.scss';

const getNumbers = () => {
    const a = 49
    const s = []

    for (let i = 1; i <= a; i++) {
        if(i === a) {
            s.push({
                id: i,
                color: "draw"
            })
        }
        else if (i % 3 === 1) {
            s.push({
                id: i,
                color: "red"
            })
        }
        else if (i % 3 === 2) {
            s.push({
                id: i,
                color: "yellow"
            })
        }
        else {
            s.push({
                id: i,
                color: "blue"
            })
        }
    }

    return s
}

const TableChips = ({random}) => {
    const [data, setData] = useState({
        "event": {
            "d": {
                "a": "WINNING_COLOR",
                "b": [
                    {
                        "a": "BLUE",
                        "b": 3.60,
                        "d": "+260"
                    },
                    {
                        "a": "RED",
                        "b": 3.60,
                        "d": "+260"
                    },
                    {
                        "a": "YELLOW",
                        "b": 3.60,
                        "d": "+260"
                    },
                    {
                        "a": "DRAW",
                        "b": 3.80,
                        "d": "+280"
                    }
                ]
            },
            "e": {
                "a": "NUMBER_OF_COLORS_BLUE",
                "b": [
                    {
                        "a": "0",
                        "b": 10,
                        "d": "+900"
                    },
                    {
                        "a": "2+",
                        "b": 1.43,
                        "d": "-233"
                    },
                    {
                        "a": "3+",
                        "b": 3,
                        "d": "+200"
                    },
                    {
                        "a": "4+",
                        "b": 10,
                        "d": "+900"
                    },
                    {
                        "a": "5+",
                        "b": 75,
                        "d": "+7400"
                    },
                    {
                        "a": "6",
                        "b": 1000,
                        "d": "+99900"
                    }
                ]
            },
            "f": {
                "a": "NUMBER_OF_COLORS_RED",
                "b": [
                    {
                        "a": "0",
                        "b": 10,
                        "d": "+900"
                    },
                    {
                        "a": "2+",
                        "b": 1.43,
                        "d": "-233"
                    },
                    {
                        "a": "3+",
                        "b": 3,
                        "d": "+200"
                    },
                    {
                        "a": "4+",
                        "b": 10,
                        "d": "+900"
                    },
                    {
                        "a": "5+",
                        "b": 75,
                        "d": "+7400"
                    },
                    {
                        "a": "6",
                        "b": 1000,
                        "d": "+99900"
                    }
                ]
            },
            "g": {
                "a": "NUMBER_OF_COLORS_YELLOW",
                "b": [
                    {
                        "a": "0",
                        "b": 10,
                        "d": "+900"
                    },
                    {
                        "a": "2+",
                        "b": 1.43,
                        "d": "-233"
                    },
                    {
                        "a": "3+",
                        "b": 3,
                        "d": "+200"
                    },
                    {
                        "a": "4+",
                        "b": 10,
                        "d": "+900"
                    },
                    {
                        "a": "5+",
                        "b": 75,
                        "d": "+7400"
                    },
                    {
                        "a": "6",
                        "b": 1000,
                        "d": "+99900"
                    }
                ]
            }
        }
    })

    const dispatch = useDispatch()
    const {betslip} = useSelector((state) => state.betslip)
    const [selected, setSelected] = useState([])
    const [disabled, setDisabled] = useState(true)

    useEffect(() => {
        selected.length > 0 && setDisabled(false)
    }, [selected])

    const addSingleStake = (el, outcome, color = '') => {
        // console.log(el, outcome)

        setSelected([...selected, {
            id: null,
            start: null,
            b: el.b,
            m_old: el.a,
            o_old: outcome,
            market: el.a,
            print: `${outcome}: ${el.a} ${color}`,
            stake: 100,
            type: gameType.COLOR_COLOR
        }]);
    }

    const addStake = () => {
        const a = betslip.slice(0)
        const r = a.concat(selected);
        dispatch(deleteBetslip(r))
        setDisabled(true)
        setSelected([])
    }

    return (
        <div className={style.block}>
            <div className={style.wrapper}>
                <div className={style.numbers}>
                    {
                        getNumbers().map((el, idx) =>
                            <div
                                key={idx}
                                className={style.cell}
                            >
                                <button
                                    className={
                                        classNames(
                                            style.button,
                                            style.bet
                                        )
                                    }

                                    onClick={() => {
                                        addSingleStake(el, colorType.COLOR)
                                    }}
                                >
                                    <div
                                        className={
                                            classNames(
                                                style.color,
                                                style[el.color]
                                            )
                                        }
                                    >
                                        {el.id}
                                    </div>
                                </button>
                            </div>
                        )
                    }
                    <div className={style.cell}>
                        <button
                            className={style.button}
                        >
                            RESET NUMBERS
                        </button>
                    </div>
                </div>

                <div className={style.labels}>
                    <div className={style.label}>Winning color</div>
                    <div className={style.label}>Number of colors</div>
                </div>
                <div className={style.colors}>
                    <div>
                        {
                            data.event.d.b.map((el, idx) =>
                                <div
                                    key={idx}
                                    className={style.cell}
                                >
                                    <button
                                        className={
                                            classNames(
                                                style.button,
                                                style.bet
                                            )
                                        }
                                        onClick={() => {
                                            addSingleStake(el, colorType.COLOR)
                                        }}
                                    >
                                        <div
                                            className={
                                                classNames(
                                                    style.color,
                                                    style.lg,
                                                    style[el.a.toLowerCase()]
                                                )
                                            }
                                        />
                                    </button>
                                </div>
                            )
                        }
                    </div>
                    <div>
                        <div>
                            {
                                data.event.e.b.map((el, idx) =>
                                    <div
                                        key={idx}
                                        className={style.cell}
                                    >
                                        <button
                                            className={
                                                classNames(
                                                    style.button,
                                                    style.bet
                                                )
                                            }

                                            onClick={() => {
                                                addSingleStake(el, colorType.COLOR, 'BLUE')
                                            }}
                                        >
                                            <div
                                                className={
                                                    classNames(
                                                        style.color,
                                                        style.blue
                                                    )
                                                }
                                            >
                                                {el.a}
                                            </div>
                                        </button>
                                    </div>
                                )
                            }
                        </div>
                        <div>
                            {
                                data.event.f.b.map((el, idx) =>
                                    <div
                                        key={idx}
                                        className={style.cell}
                                    >
                                        <button
                                            className={
                                                classNames(
                                                    style.button,
                                                    style.bet
                                                )
                                            }

                                            onClick={() => {
                                                addSingleStake(el, colorType.COLOR, 'RED')
                                            }}
                                        >
                                            <div
                                                className={
                                                    classNames(
                                                        style.color,
                                                        style.red
                                                    )
                                                }
                                            >
                                                {el.a}
                                            </div>
                                        </button>
                                    </div>
                                )
                            }
                        </div>
                        <div>
                            {
                                data.event.g.b.map((el, idx) =>
                                    <div
                                        key={idx}
                                        className={style.cell}
                                    >
                                        <button
                                            className={
                                                classNames(
                                                    style.button,
                                                    style.bet
                                                )
                                            }

                                            onClick={() => {
                                                addSingleStake(el, colorType.COLOR, 'YELLOW')
                                            }}
                                        >
                                            <div
                                                className={
                                                    classNames(
                                                        style.color,
                                                        style.yellow
                                                    )
                                                }
                                            >
                                                {el.a}
                                            </div>
                                        </button>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
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
                        PLACE BETS
                    </button>
                </div>

                <div>
                    <div className={style.content}>
                        <div className={style.label}>MATCHED NUMBERS</div>
                    </div>
                    <div className={style.panel}>
                        <div className={style.subtitle}>QUANTITY OF MATCHED NUMBERS</div>
                        <div className={style.quantity}>
                            <button
                                className={style.button}
                            >
                                1
                            </button>
                            <button
                                className={style.button}
                            >
                                2
                            </button>
                            <button
                                className={style.button}
                            >
                                3
                            </button>
                            <button
                                className={style.button}
                            >
                                4
                            </button>
                            <button
                                className={style.button}
                            >
                                5
                            </button>
                        </div>
                    </div>
                </div>

                <div>
                    <div className={style.content}>
                        <div className={style.label}>ANACONDA</div>
                    </div>
                    <div className={style.panel}>
                        <div className={style.subtitle}>З TO 6 NUMBERS WILL BE MATCHED</div>
                        <button
                            className={style.button}
                        >
                            ANACONDA
                        </button>
                    </div>
                </div>

                <div>
                    <div className={style.content}>
                        <div className={style.label}>BET ZERO</div>
                    </div>
                    <div className={style.panel}>
                        <div className={style.subtitle}>SELECTED NUMBERS WON T BE MATCHED</div>
                        <button
                            className={style.button}
                        >
                            BET ZERO
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TableChips;
