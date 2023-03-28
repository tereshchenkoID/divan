import {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";

import classNames from "classnames";

import Button from "components/Button";

import Amount from "games/ROULETTE/Amount";

import style from './index.module.scss';

const COLORS = ['violet', 'blue', 'green', 'red', 'black', 'orange']

const setStepsValue = (data) => {
    const a = []

    // eslint-disable-next-line array-callback-return
    data.map((el, idx) =>
        a.push({
            id: idx,
            amount: el,
            color: COLORS[idx],
            active: idx === 0
        })
    )

    return a
}

const onHoverRefs = (data, type) => {
    if (type === 0) {
        data.map(el => el.classList.add(style.hover))
    }
    else {
        data.map(el => el.classList.remove(style.hover))
    }
}

const TableChips = ({random}) => {
    const r = 6
    const r_b = 23

    const {settings} = useSelector((state) => state.settings)
    const [steps, setSteps] = useState([])

    const [data, setData] = useState({
        dozen: {
            '1_12': {
                odd: 3,
                stake: 'Dozen: 1-12',
                value: '1_12',
                amount_value: 0,
                amount_color: null,
                refs: useRef([])
            },
            '13_24': {
                odd: 3,
                stake: 'Dozen: 13-24',
                value: '13_24',
                amount_value: 0,
                amount_color: null,
                refs: useRef([])
            },
            '25_36': {
                odd: 3,
                stake: 'Dozen: 25-36',
                value: '25_36',
                amount_value: 0,
                amount_color: null,
                refs: useRef([])
            }
        },
        color: {
            'red': {
                odd: 2,
                stake: 'Color: Red',
                value: 'red',
                amount_value: 0,
                amount_color: null,
                refs: useRef([])
            },
            'black': {
                odd: 2,
                stake: 'Color: Black',
                value: 'black',
                amount_value: 0,
                amount_color: null,
                refs: useRef([])
            }
        },
        line: {
            '1': {
                odd: 3,
                stake: 'Column: 1',
                value: '1',
                amount_value: 0,
                amount_color: null,
                refs: useRef([])
            },
            '2': {
                odd: 3,
                stake: 'Column: 2',
                value: '2',
                amount_value: 0,
                amount_color: null,
                refs: useRef([])
            },
            '3': {
                odd: 3,
                stake: 'Column: 3',
                value: '3',
                amount_value: 0,
                amount_color: null,
                refs: useRef([])
            }
        },
        even_odd: {
            'even': {
                odd: 2,
                stake: 'Even/Odd: Even',
                value: 'even',
                amount_value: 0,
                amount_color: null,
                refs: useRef([])
            },
            'odd': {
                odd: 2,
                name: 'Even/Odd: Odd',
                value: 'odd',
                amount_value: 0,
                amount_color: null,
                refs: useRef([])
            }
        },
        low_high: {
            '1_18': {
                odd: 2,
                stake: 'Low/High 1-18',
                value: '1_18',
                amount_value: 0,
                amount_color: null,
                refs: useRef([])
            },
            '19_36': {
                odd: 2,
                stake: 'Low/High 19-36',
                value: '19_36',
                amount_value: 0,
                amount_color: null,
                refs: useRef([])
            }
        },
        chips: [
            {
                stake: 'Number: 0',
                odd: 36,
                value: 0,
                name: 0,
                type: null,
                color: "green",
                line: null,
                range: [],
                amount_value: 0,
                amount_color: null
            },
            {
                stake: 'Number: 1',
                odd: 36,
                value: 1,
                name: 1,
                type: "odd",
                color: "red",
                line: 1,
                range: [
                    '1-12',
                    '1-18'
                ],
                amount_value: 0,
                amount_color: null
            },
            {
                stake: 'Number: 2',
                odd: 36,
                value: 2,
                name: 2,
                type: "even",
                color: "black",
                line: 2,
                range: [
                    '1-12',
                    '1-18'
                ],
                amount_value: 0,
                amount_color: null
            },
            {
                stake: 'Number: 3',
                odd: 36,
                value: 3,
                name: 3,
                type: "odd",
                color: "red",
                line: 3,
                range: [
                    '1-12',
                    '1-18'
                ],
                amount_value: 0,
                amount_color: null
            },
            {
                stake: 'Number: 4',
                odd: 36,
                value: 4,
                name: 4,
                type: "even",
                color: "black",
                line: 1,
                range: [
                    '1-12',
                    '1-18'
                ],
                amount_value: 0,
                amount_color: null
            },
            {
                stake: 'Number: 5',
                odd: 36,
                value: 5,
                name: 5,
                type: "odd",
                color: "red",
                line: 2,
                range: [
                    '1-12',
                    '1-18'
                ],
                amount_value: 0,
                amount_color: null
            },
            {
                stake: 'Number: 6',
                odd: 36,
                value: 6,
                name: 6,
                type: "even",
                color: "black",
                line: 3,
                range: [
                    '1-12',
                    '1-18'
                ],
                amount_value: 0,
                amount_color: null
            },
            {
                stake: 'Number: 7',
                odd: 36,
                value: 7,
                name: 7,
                type: "odd",
                color: "red",
                line: 1,
                range: [
                    '1-12',
                    '1-18'
                ],
                amount_value: 0,
                amount_color: null
            },
            {
                stake: 'Number: 8',
                odd: 36,
                value: 8,
                name: 8,
                type: "even",
                color: "black",
                line: 2,
                range: [
                    '1-12',
                    '1-18'
                ],
                amount_value: 0,
                amount_color: null
            },
            {
                stake: 'Number: 9',
                odd: 36,
                value: 9,
                name: 9,
                type: "odd",
                color: "red",
                line: 3,
                range: [
                    '1-12',
                    '1-18'
                ],
                amount_value: 0,
                amount_color: null
            },
            {
                stake: 'Number: 10',
                odd: 36,
                value: 10,
                name: 10,
                type: "even",
                color: "black",
                line: 1,
                range: [
                    '1-12',
                    '1-18'
                ],
                amount_value: 0,
                amount_color: null
            },
            {
                stake: 'Number: 11',
                odd: 36,
                value: 11,
                name: 11,
                type: "odd",
                color: "black",
                line: 2,
                range: [
                    '1-12',
                    '1-18'
                ],
                amount_value: 0,
                amount_color: null
            },
            {
                stake: 'Number: 12',
                odd: 36,
                value: 12,
                name: 12,
                type: "even",
                color: "red",
                line: 3,
                range: [
                    '1-12',
                    '1-18'
                ],
                amount_value: 0,
                amount_color: null
            },
            {
                stake: 'Number: 13',
                odd: 36,
                value: 13,
                name: 13,
                type: "odd",
                color: "black",
                line: 1,
                range: [
                    '13-24',
                    '1-18'
                ],
                amount_value: 0,
                amount_color: null
            },
            {
                stake: 'Number: 14',
                odd: 36,
                value: 14,
                name: 14,
                type: "even",
                color: "red",
                line: 2,
                range: [
                    '13-24',
                    '1-18'
                ],
                amount_value: 0,
                amount_color: null
            },
            {
                stake: 'Number: 15',
                odd: 36,
                value: 15,
                name: 15,
                type: "odd",
                color: "black",
                line: 3,
                range: [
                    '13-24',
                    '1-18'
                ],
                amount_value: 0,
                amount_color: null
            },
            {
                stake: 'Number: 16',
                odd: 36,
                value: 16,
                name: 16,
                type: "even",
                color: "red",
                line: 1,
                range: [
                    '13-24',
                    '1-18'
                ],
                amount_value: 0,
                amount_color: null
            },
            {
                stake: 'Number: 17',
                odd: 36,
                value: 17,
                name: 17,
                type: "odd",
                color: "black",
                line: 2,
                range: [
                    '13-24',
                    '1-18'
                ],
                amount_value: 0,
                amount_color: null
            },
            {
                stake: 'Number: 18',
                odd: 36,
                value: 18,
                name: 18,
                type: "even",
                color: "red",
                line: 3,
                range: [
                    '13-24',
                    '1-18'
                ],
                amount_value: 0,
                amount_color: null
            },
            {
                stake: 'Number: 19',
                odd: 36,
                value: 19,
                name: 19,
                type: "odd",
                color: "red",
                line: 1,
                range: [
                    '13-24',
                    '19-36'
                ],
                amount_value: 0,
                amount_color: null
            },
            {
                stake: 'Number: 20',
                odd: 36,
                value: 20,
                name: 20,
                type: "even",
                color: "black",
                line: 2,
                range: [
                    '13-24',
                    '19-36'
                ],
                amount_value: 0,
                amount_color: null
            },
            {
                stake: 'Number: 21',
                odd: 36,
                value: 21,
                name: 21,
                type: "odd",
                color: "red",
                line: 3,
                range: [
                    '13-24',
                    '19-36'
                ],
                amount_value: 0,
                amount_color: null
            },
            {
                stake: 'Number: 22',
                odd: 36,
                value: 22,
                name: 22,
                type: "even",
                color: "black",
                line: 1,
                range: [
                    '13-24',
                    '19-36'
                ],
                amount_value: 0,
                amount_color: null
            },
            {
                stake: 'Number: 23',
                odd: 36,
                value: 23,
                name: 23,
                type: "odd",
                color: "red",
                line: 2,
                range: [
                    '13-24',
                    '19-36'
                ],
                amount_value: 0,
                amount_color: null
            },
            {
                stake: 'Number: 24',
                odd: 36,
                value: 24,
                name: 24,
                type: "even",
                color: "black",
                line: 3,
                range: [
                    '25-36',
                    '19-36'
                ],
                amount_value: 0,
                amount_color: null
            },
            {
                stake: 'Number: 25',
                odd: 36,
                value: 25,
                name: 25,
                type: "odd",
                color: "red",
                line: 1,
                range: [
                    '25-36',
                    '19-36'
                ],
                amount_value: 0,
                amount_color: null
            },
            {
                stake: 'Number: 26',
                odd: 36,
                value: 26,
                name: 26,
                type: "even",
                color: "black",
                line: 2,
                range: [
                    '25-36',
                    '19-36'
                ],
                amount_value: 0,
                amount_color: null
            },
            {
                stake: 'Number: 27',
                odd: 36,
                value: 27,
                name: 27,
                type: "odd",
                color: "red",
                line: 3,
                range: [
                    '25-36',
                    '19-36'
                ],
                amount_value: 0,
                amount_color: null
            },
            {
                stake: 'Number: 28',
                odd: 36,
                value: 28,
                name: 28,
                type: "even",
                color: "black",
                line: 1,
                range: [
                    '25-36',
                    '19-36'
                ],
                amount_value: 0,
                amount_color: null
            },
            {
                stake: 'Number: 29',
                odd: 36,
                value: 29,
                name: 29,
                type: "odd",
                color: "black",
                line: 2,
                range: [
                    '25-36',
                    '19-36'
                ],
                amount_value: 0,
                amount_color: null
            },
            {
                stake: 'Number: 30',
                odd: 36,
                value: 30,
                name: 30,
                type: "even",
                color: "red",
                line: 3,
                range: [
                    '25-36',
                    '19-36'
                ],
                amount_value: 0,
                amount_color: null
            },
            {
                stake: 'Number: 31',
                odd: 36,
                value: 31,
                name: 31,
                type: "odd",
                color: "black",
                line: 1,
                range: [
                    '25-36',
                    '19-36'
                ],
                amount_value: 0,
                amount_color: null
            },
            {
                stake: 'Number: 32',
                odd: 36,
                value: 32,
                name: 32,
                type: "even",
                color: "red",
                line: 2,
                range: [
                    '25-36',
                    '19-36'
                ],
                amount_value: 0,
                amount_color: null
            },
            {
                stake: 'Number: 33',
                odd: 36,
                value: 33,
                name: 33,
                type: "odd",
                color: "black",
                line: 3,
                range: [
                    '25-36',
                    '19-36'
                ],
                amount_value: 0,
                amount_color: null
            },
            {
                stake: 'Number: 34',
                odd: 36,
                value: 34,
                name: 34,
                type: "even",
                color: "red",
                line: 1,
                range: [
                    '25-36',
                    '19-36'
                ],
                amount_value: 0,
                amount_color: null
            },
            {
                stake: 'Number: 35',
                odd: 36,
                value: 35,
                name: 35,
                type: "odd",
                color: "black",
                line: 2,
                range: [
                    '25-36',
                    '19-36'
                ],
                amount_value: 0,
                amount_color: null
            },
            {
                stake: 'Number: 36',
                odd: 36,
                value: 36,
                name: 36,
                type: "even",
                color: "red",
                line: 3,
                range: [
                    '25-36',
                    '19-36'
                ],
                amount_value: 0,
                amount_color: null
            }
        ]
    })

    useEffect(() => {
        setSteps(setStepsValue(settings.betslip.steps))
    }, [settings])

    useEffect(() => {
        if (random.length > 0) {
            addRandomChips()
        }
    }, [random])

    const setRefs = (date, i) => {
        data.color[date.color].refs.current[data.color[date.color].refs.current.length] = i
        data.line[date.line].refs.current[data.line[date.line].refs.current.length] = i
        data.even_odd[date.type].refs.current[data.even_odd[date.type].refs.current.length] = i

        if (date.name <= 12) {
            data.dozen['1_12'].refs.current[data.dozen['1_12'].refs.current.length] = i
        } else if (date.name > 12 && date.name < 25) {
            data.dozen['13_24'].refs.current[data.dozen['13_24'].refs.current.length] = i
        } else {
            data.dozen['25_36'].refs.current[data.dozen['25_36'].refs.current.length] = i
        }

        if (date.name <= 18) {
            data.low_high['1_18'].refs.current[data.low_high['1_18'].refs.current.length] = i
        } else {
            data.low_high['19_36'].refs.current[data.low_high['19_36'].refs.current.length] = i
        }
    }

    const currentStakeColor = (value) => {
        let previous = null;

        for (let i = 0; i < steps.length; i++) {
            if (value < steps[i].amount) {
                return previous;
            }
            previous = steps[i].color;

        }

        return previous.color;
    }

    const buttonAmountSet = (name, type) => {
        let a = Object.assign({}, data);

        a[type][name].amount_value = a[type][name].amount_value + buttonStepGet().amount
        a[type][name].amount_color = currentStakeColor(a[type][name].amount_value)

        setData(a)
    }

    const buttonStepSet = (id) => {
        setSteps(prevState =>
            prevState.map(item =>
                item.id === id ? {...item, active: true} : {...item, active: false}
            )
        )
    }

    const buttonStepGet = () => {
        return steps.find(el => el.active === true)
    }

    const closeChips = () => {
        let a = Object.assign({}, data);

        Object.values(a).map(c => {
            Object.values(c).map(i => {
                i.amount_value = 0
                i.amount_color = null
            })

        })

        setData(a)
    }

    const doubleChips = () => {
        let a = Object.assign({}, data);

        Object.values(a).map(c => {
            Object.values(c).map(i => {
                i.amount_value = i.amount_value * 2
                i.amount_color = currentStakeColor(i.amount_value)
            })

        })

        setData(a)
    }

    const addRandomChips = () => {
        data.chips.map(i => {
            i.amount_value = 0
            i.amount_color = null
        })

        let a = Object.assign({}, data);

        for (let i = 0; i < a.chips.length; i++) {
            if (random.includes(a.chips[i].value)) {
                a.chips[i].amount_value = a.chips[i].amount_value + buttonStepGet().amount
                a.chips[i].amount_color = currentStakeColor(a.chips[i].amount_value)
            }
        }

        setData(a)
    }

    return (
        <div className={style.block}>
            <div className={style.body}>
                <div className={style.top}>
                    <div />
                    <div className={style.dozens}>
                        {
                            Object.values(data.dozen).map((el, idx) =>
                                <button
                                    key={idx}
                                    className={style.button}
                                    onMouseEnter = {() => {
                                        onHoverRefs(el.refs.current, 0)
                                    }}
                                    onMouseLeave = {() => {
                                        onHoverRefs(el.refs.current, 1)
                                    }}
                                    onClick={() => {
                                        buttonAmountSet(el.value, 'dozen')
                                    }}
                                >
                                    <Amount
                                        data={el}
                                        step={buttonStepGet()}
                                    />
                                    {el.value.replace('_', '-')}
                                </button>
                            )
                        }
                    </div>
                    <div />
                </div>

                <div className={style.middle}>
                    <div className={style.zero}>
                        <button
                            className={style.button}
                            onClick={() => {
                                buttonAmountSet(data.chips[0].name, 'chips')
                            }}
                        >
                            <Amount
                                data={data.chips[0]}
                                step={buttonStepGet()}
                            />
                            <span>{data.chips[0].name}</span>
                        </button>
                    </div>
                    <div className={style.numbers}>
                        {
                            data.chips.map((el, idx) =>
                                idx !== 0 &&
                                <button
                                    key={idx}
                                    ref={(i) => {
                                        i && setRefs(el, i)
                                    }}
                                    className={
                                        classNames(
                                            style.button,
                                            style[el.color]
                                        )
                                    }
                                    onClick={() => {
                                        buttonAmountSet(el.value, 'chips')
                                    }}
                                >
                                    <Amount
                                        data={el}
                                        step={buttonStepGet()}
                                    />
                                    <span>{el.name}</span>
                                </button>
                            )
                        }
                    </div>
                    <div className={style.rows}>
                        {
                            Object.values(data.line).map((el, idx) =>
                                <button
                                    key={idx}
                                    className={style.button}
                                    onMouseEnter = {() => {
                                        onHoverRefs(el.refs.current, 0)
                                    }}
                                    onMouseLeave = {() => {
                                        onHoverRefs(el.refs.current, 1)
                                    }}
                                    onClick={() => {
                                        buttonAmountSet(el.value, 'line')
                                    }}
                                >
                                    <Amount
                                        data={el}
                                        step={buttonStepGet()}
                                    />
                                    <p>2 to 1</p>
                                    <p>{el.value}</p>
                                </button>
                            )
                        }
                    </div>
                    {/*<div className={style.coordinate}>*/}
                    {/*    {*/}
                    {/*        Array.from({length: r}, (el_r, idx_r) =>*/}
                    {/*            <div*/}
                    {/*                key={idx_r}*/}
                    {/*                className={*/}
                    {/*                    classNames(*/}
                    {/*                        style.row,*/}
                    {/*                        style[`row-${idx_r + 1}`]*/}
                    {/*                    )*/}
                    {/*                }*/}
                    {/*            >*/}
                    {/*                {*/}
                    {/*                    Array.from({length: r_b}, (el_r_b, idx_r_b) =>*/}
                    {/*                        <button*/}
                    {/*                            key={idx_r_b}*/}
                    {/*                            className={*/}
                    {/*                                classNames(*/}
                    {/*                                    style.button,*/}
                    {/*                                    style[`button-${idx_r_b + 1}`]*/}
                    {/*                                )*/}
                    {/*                            }*/}
                    {/*                        />*/}
                    {/*                    )*/}
                    {/*                }*/}
                    {/*            </div>*/}
                    {/*        )*/}
                    {/*    }*/}
                    {/*</div>*/}
                </div>

                <div className={style.bottom}>
                    <div />
                    <div className={style.extra}>
                        <button
                            className={style.button}
                            onMouseEnter = {() => {
                                onHoverRefs(data.low_high['1_18'].refs.current, 0)
                            }}
                            onMouseLeave = {() => {
                                onHoverRefs(data.low_high['1_18'].refs.current, 1)
                            }}
                            onClick={() => {
                                buttonAmountSet('1_18', 'low_high')
                            }}
                        >
                            <Amount
                                data={data.low_high['1_18']}
                                step={buttonStepGet()}
                            />
                            {data.low_high['1_18'].value.replace('_', ' to ')}
                        </button>
                        <button
                            className={style.button}
                            onMouseEnter = {() => {
                                onHoverRefs(data.even_odd.even.refs.current, 0)
                            }}
                            onMouseLeave = {() => {
                                onHoverRefs(data.even_odd.even.refs.current, 1)
                            }}
                            onClick={() => {
                                buttonAmountSet('even', 'even_odd')
                            }}
                        >
                            <Amount
                                data={data.even_odd['even']}
                                step={buttonStepGet()}
                            />
                            {data.even_odd.even.value}
                        </button>

                        {
                            Object.values(data.color).map((el, idx) =>
                                <button
                                    key={idx}
                                    className={style.button}
                                    onMouseEnter = {() => {
                                        onHoverRefs(el.refs.current, 0)
                                    }}
                                    onMouseLeave = {() => {
                                        onHoverRefs(el.refs.current, 1)
                                    }}
                                    onClick={() => {
                                        buttonAmountSet(el.value, 'color')
                                    }}
                                >
                                    <Amount
                                        data={el}
                                        step={buttonStepGet()}
                                    />
                                    <div
                                        className={
                                            classNames(
                                                style.diamond,
                                                style[el.value]
                                            )
                                        }
                                    >
                                        <div/>
                                    </div>
                                </button>
                            )
                        }

                        <button
                            className={style.button}
                            onMouseEnter = {() => {
                                onHoverRefs(data.even_odd.odd.refs.current, 0)
                            }}
                            onMouseLeave = {() => {
                                onHoverRefs(data.even_odd.odd.refs.current, 1)
                            }}
                            onClick={() => {
                                buttonAmountSet('odd', 'even_odd')
                            }}
                        >
                            <Amount
                                data={data.even_odd['odd']}
                                step={buttonStepGet()}
                            />
                            {data.even_odd.odd.value}
                        </button>
                        <button
                            className={style.button}
                            onMouseEnter = {() => {
                                onHoverRefs(data.low_high['19_36'].refs.current, 0)
                            }}
                            onMouseLeave = {() => {
                                onHoverRefs(data.low_high['19_36'].refs.current, 1)
                            }}
                            onClick={() => {
                                buttonAmountSet('19_36', 'low_high')
                            }}
                        >
                            <Amount
                                data={data.low_high['19_36']}
                                step={buttonStepGet()}
                            />
                            {data.low_high['19_36'].value.replace('_', ' to ')}
                        </button>
                    </div>
                    <div />
                </div>
            </div>

            <div className={style.footer}>
                <div className={style.coins}>
                    {
                        steps.map((el, idx) =>
                            <button
                                key={idx}
                                className={
                                    classNames(
                                        style.coin,
                                        style[el.color],
                                        el.active && style.active
                                    )
                                }
                                onClick={() => {
                                    buttonStepSet(el.id)
                                }}
                            >
                                {el.amount}
                            </button>
                        )
                    }
                </div>

                <div className={style.actions}>
                    <Button
                        type={'blue'}
                        size={'lg'}
                        text={'2x'}
                        action={() => {
                            doubleChips()
                        }}
                    />
                    <Button
                        type={'red'}
                        size={'lg'}
                        icon={'close'}
                        action={() => {
                            closeChips()
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default TableChips;
