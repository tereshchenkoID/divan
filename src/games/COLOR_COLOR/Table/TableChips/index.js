import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";

import classNames from "classnames";

import {deleteBetslip} from "store/actions/betslipAction";

import Numbers from "games/COLOR_COLOR/Table/Numbers";
import Colors from "games/COLOR_COLOR/Table/Colors";
import Anaconda from "./Anaconda";
import Zero from "./Zero";
import Matched from "./Matched";

import style from './index.module.scss';

const TableChips = ({random}) => {
    const dispatch = useDispatch()

    const {betslip} = useSelector((state) => state.betslip)
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
    const [colors, setColors] = useState([])
    const [numbers, setNumbers] = useState([])
    const [disabled, setDisabled] = useState(true)

    useEffect(() => {
        (colors.length > 0) && setDisabled(false)

        console.log(colors, numbers)
    }, [colors, numbers])

    const addStake = () => {
        const a = betslip.slice(0)
        const r = a.concat(colors);
        dispatch(deleteBetslip(r))
        setDisabled(true)
        setColors([])
    }

    return (
        <div className={style.block}>
            <div className={style.wrapper}>
                <Numbers
                    data={data}
                    numbers={numbers}
                    setNumbers={setNumbers}
                    random={random}
                />

                <div className={style.labels}>
                    <div className={style.label}>Winning color</div>
                    <div className={style.label}>Number of colors</div>
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
                        PLACE BETS
                    </button>
                </div>

                <Matched numbers={numbers} />
                <Anaconda numbers={numbers} />
                <Zero numbers={numbers} />
            </div>
        </div>
    );
}

export default TableChips;
