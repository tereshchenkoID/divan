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
            "a": {
                "a": "MATCHED_NUMBERS",
                "b": [
                    {
                        "a": "1",
                        "b": 7
                    },
                    {
                        "a": "2",
                        "b": 65
                    },
                    {
                        "a": "3",
                        "b": 650
                    },
                    {
                        "a": "4",
                        "b": 7000
                    },
                    {
                        "a": "5",
                        "b": 10000
                    }
                ]
            },
            "b": {
                "a": "ANACONDA",
                "b": [
                    {
                        "a": "6_3",
                        "b": 24
                    },
                    {
                        "a": "6_4",
                        "b": 300
                    },
                    {
                        "a": "6_5",
                        "b": 5000
                    },
                    {
                        "a": "6_6",
                        "b": 500000
                    },
                    {
                        "a": "7_3",
                        "b": 15
                    },
                    {
                        "a": "7_4",
                        "b": 120
                    },
                    {
                        "a": "7_5",
                        "b": 2000
                    },
                    {
                        "a": "7_6",
                        "b": 50000
                    },
                    {
                        "a": "8_3",
                        "b": 10
                    },
                    {
                        "a": "8_4",
                        "b": 75
                    },
                    {
                        "a": "8_5",
                        "b": 500
                    },
                    {
                        "a": "8_6",
                        "b": 10000
                    },
                    {
                        "a": "9_3",
                        "b": 6
                    },
                    {
                        "a": "9_4",
                        "b": 50
                    },
                    {
                        "a": "9_5",
                        "b": 300
                    },
                    {
                        "a": "9_6",
                        "b": 5000
                    },
                    {
                        "a": "10_3",
                        "b": 5
                    },
                    {
                        "a": "10_4",
                        "b": 25
                    },
                    {
                        "a": "10_5",
                        "b": 225
                    },
                    {
                        "a": "10_6",
                        "b": 2000
                    },
                    {
                        "a": "15_3",
                        "b": 1
                    },
                    {
                        "a": "15_4",
                        "b": 4
                    },
                    {
                        "a": "15_5",
                        "b": 50
                    },
                    {
                        "a": "15_6",
                        "b": 175
                    },
                    {
                        "a": "20_3",
                        "b": 0.5
                    },
                    {
                        "a": "20_4",
                        "b": 2
                    },
                    {
                        "a": "20_5",
                        "b": 7.5
                    },
                    {
                        "a": "20_6",
                        "b": 60
                    }
                ]
            },
            "c": {
                "a": "BET_ZERO",
                "b": [
                    {
                        "a": "1",
                        "b": 1.11,
                        "d": "-909"
                    },
                    {
                        "a": "2",
                        "b": 1.26,
                        "d": "-385"
                    },
                    {
                        "a": "3",
                        "b": 1.45,
                        "d": "-222"
                    },
                    {
                        "a": "4",
                        "b": 1.66,
                        "d": "-152"
                    },
                    {
                        "a": "5",
                        "b": 1.89,
                        "d": "-112"
                    },
                    {
                        "a": "6",
                        "b": 2.12,
                        "d": "+112"
                    },
                    {
                        "a": "7",
                        "b": 2.44,
                        "d": "+144"
                    },
                    {
                        "a": "8",
                        "b": 2.76,
                        "d": "+176"
                    },
                    {
                        "a": "9",
                        "b": 3.27,
                        "d": "+227"
                    },
                    {
                        "a": "10",
                        "b": 3.77,
                        "d": "+277"
                    },
                    {
                        "a": "15",
                        "b": 8.6,
                        "d": "+760"
                    },
                    {
                        "a": "20",
                        "b": 25,
                        "d": "+2400"
                    }
                ]
            },
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

        console.log(colors, numbers, type)
    }, [colors, numbers, type])

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
                    setType={setType}
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

                <Matched
                    numbers={numbers}
                    type={type}
                    setType={setType}
                />
                <Anaconda
                    numbers={numbers}
                    type={type}
                    setType={setType}
                />
                <Zero
                    numbers={numbers}
                    type={type}
                    setType={setType}
                />
            </div>
        </div>
    );
}

export default TableChips;
