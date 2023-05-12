import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";

import {gameType} from "constant/config";

import classNames from "classnames";

import {deleteBetslip} from "store/actions/betslipAction";
import {setNotification} from "store/actions/notificationAction";

import Numbers from "../Numbers";

import style from './index.module.scss';

const TableChips = ({random, t}) => {
    const dispatch = useDispatch()
    const {betslip} = useSelector((state) => state.betslip)
    const [data, setData] = useState({
        "event": {
            "b": "KENO",
            "h": {
                "a": "KENO",
                "b": {
                    "a": {
                        "a": "CARD",
                        "b": [
                            {
                                "a": "1_1",
                                "b": 3
                            },
                            {
                                "a": "2_2",
                                "b": 8
                            },
                            {
                                "a": "2_1",
                                "b": 1
                            },
                            {
                                "a": "3_2",
                                "b": 3
                            },
                            {
                                "a": "3_3",
                                "b": 30
                            },
                            {
                                "a": "3_1",
                                "b": 0
                            },
                            {
                                "a": "4_3",
                                "b": 8
                            },
                            {
                                "a": "4_4",
                                "b": 80
                            },
                            {
                                "a": "4_2",
                                "b": 1
                            },
                            {
                                "a": "4_1",
                                "b": 0
                            },
                            {
                                "a": "5_5",
                                "b": 150
                            },
                            {
                                "a": "5_3",
                                "b": 3
                            },
                            {
                                "a": "5_2",
                                "b": 1
                            },
                            {
                                "a": "5_4",
                                "b": 15
                            },
                            {
                                "a": "5_1",
                                "b": 0
                            },
                            {
                                "a": "6_4",
                                "b": 11
                            },
                            {
                                "a": "6_6",
                                "b": 600
                            },
                            {
                                "a": "6_5",
                                "b": 50
                            },
                            {
                                "a": "6_3",
                                "b": 2
                            },
                            {
                                "a": "6_2",
                                "b": 0
                            },
                            {
                                "a": "6_1",
                                "b": 0
                            },
                            {
                                "a": "7_5",
                                "b": 10
                            },
                            {
                                "a": "7_6",
                                "b": 25
                            },
                            {
                                "a": "7_4",
                                "b": 4
                            },
                            {
                                "a": "7_7",
                                "b": 800
                            },
                            {
                                "a": "7_3",
                                "b": 3
                            },
                            {
                                "a": "7_2",
                                "b": 0
                            },
                            {
                                "a": "7_1",
                                "b": 0
                            },
                            {
                                "a": "8_7",
                                "b": 200
                            },
                            {
                                "a": "8_8",
                                "b": 3000
                            },
                            {
                                "a": "8_6",
                                "b": 50
                            },
                            {
                                "a": "8_4",
                                "b": 4
                            },
                            {
                                "a": "8_5",
                                "b": 16
                            },
                            {
                                "a": "8_3",
                                "b": 0
                            },
                            {
                                "a": "8_2",
                                "b": 0
                            },
                            {
                                "a": "8_1",
                                "b": 0
                            }
                        ]
                    }
                }
            }
        }
    })
    const [disabled, setDisabled] = useState(true)
    const [numbers, setNumbers] = useState([])

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

    const addStake = () => {
        const a = betslip.slice(0)
        const f = data.event.h.b.a.b.filter(el => el.a.indexOf(`${numbers.length}_`) !== -1 )
        const s = f.sort((a, b) => b.b - a.b)[0];

        const d = betslip.find(el => el.print === numbers.join(', '))

        if (!d) {
            let r = {
                id: null,
                start: new Date().getTime() + 30000,
                b: s.b || 0,
                m_old: data.event.h.b.a.a,
                o_old: numbers.join(', '),
                market: data.event.h.b.a.a,
                print: numbers.join(', '),
                stake: 100,
                type: gameType.KENO
            }

            dispatch(deleteBetslip(a.concat(r)))
            setDisabled(true)
            setNumbers([])
        }
        else {
            dispatch(setNotification(t('notification.stake_already_exists')))
        }
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
