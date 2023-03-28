import {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";

import classNames from "classnames";

import Button from "components/Button";

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

const TableChips = () => {
    const r = 6
    const r_b = 23

    const {settings} = useSelector((state) => state.settings)
    const [steps, setSteps] = useState([])

    useEffect(() => {
        setSteps(setStepsValue(settings.betslip.steps))
    }, [settings])

    const [data, setData] = useState({
        dozen: {
            '1_12': {
                id: 0,
                stake: 'Dozen: 1-12',
                value: '1_12',
                amount_value: 0,
                amount_color: null,
                refs: useRef([])
            },
            '13_24': {
                id: 1,
                stake: 'Dozen: 13-24',
                value: '13_24',
                amount_value: 0,
                amount_color: null,
                refs: useRef([])
            },
            '25_36': {
                id: 2,
                stake: 'Dozen: 25-36',
                value: '25_36',
                amount_value: 0,
                amount_color: null,
                refs: useRef([])
            }
        },
        color: {
            'red': {
                id: 0,
                stake: 'Color: Red',
                value: 'red',
                amount_value: 0,
                amount_color: null,
                refs: useRef([])
            },
            'black': {
                id: 1,
                stake: 'Color: Black',
                value: 'black',
                amount_value: 0,
                amount_color: null,
                refs: useRef([])
            }
        },
        line: {
            '1': {
                id: 0,
                stake: 'Column: 1',
                value: '1',
                amount_value: 0,
                amount_color: null,
                refs: useRef([])
            },
            '2': {
                id: 1,
                stake: 'Column: 2',
                value: '2',
                amount_value: 0,
                amount_color: null,
                refs: useRef([])
            },
            '3': {
                id: 2,
                stake: 'Column: 3',
                value: '3',
                amount_value: 0,
                amount_color: null,
                refs: useRef([])
            }
        },
        even_odd: {
            'even': {
                id: 0,
                stake: 'Even/Odd: Even',
                value: 'even',
                amount_value: 0,
                amount_color: null,
                refs: useRef([])
            },
            'odd': {
                id: 1,
                name: 'Even/Odd: Odd',
                value: 'odd',
                amount_value: 0,
                amount_color: null,
                refs: useRef([])
            }
        },
        low_high: {
            '1_18': {
                id: 0,
                stake: 'Low/High 1-18',
                value: '1_18',
                amount_value: 0,
                amount_color: null,
                refs: useRef([])
            },
            '19_36': {
                id: 1,
                stake: 'Low/High 19-36',
                value: '19_36',
                amount_value: 0,
                amount_color: null,
                refs: useRef([])
            }
        },
        chips: [
            {
                name: 0,
                type: null,
                color: "green",
                line: null,
                range: [],
                amount_value: 0,
                amount_color: null
            },
            {
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

    const onHoverRefs = (data, type) => {
        if (type === 0) {
            data.map(el => el.classList.add(style.hover))
        }
        else {
            data.map(el => el.classList.remove(style.hover))
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

        a.map(item => {
            item.amount_value = 0
            item.amount_color = null
        })

        setData(a)
    }

    const doubleChips = () => {
        // let a = chips.slice(0)
        //
        // a.map(item => {
        //     item.amount_value = item.amount_value * 2
        //     item.amount_color = currentStakeColor(item.amount_value)
        // })
        //
        // setChips(a)
    }

    return (
        <div className={style.block}>
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
                        // doubleChips()
                    }}
                />
                <Button
                    type={'red'}
                    size={'lg'}
                    icon={'close'}
                    action={() => {
                        // closeChips()
                    }}
                />
            </div>

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
                                {
                                    el.amount_value > 0 &&
                                    <span
                                        className={
                                            classNames(
                                                style.amount,
                                                style[el.amount_color]
                                            )
                                        }
                                    >
                                        {el.amount_value}
                                    </span>
                                }
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
                        {
                            data.chips[0].amount_value > 0 &&
                            <span
                                className={
                                    classNames(
                                        style.amount,
                                        style[data.chips[0].amount_color]
                                    )
                                }
                            >
                                {data.chips[0].amount_value}
                            </span>
                        }
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
                                    setRefs(el, i)
                                }}
                                className={
                                    classNames(
                                        style.button,
                                        style[el.color]
                                    )
                                }
                                onClick={() => {
                                    buttonAmountSet(el.name, 'chips')
                                }}
                            >
                                <span>{el.name}</span>
                                {
                                    el.amount_value > 0 &&
                                    <span
                                        className={
                                            classNames(
                                                style.amount,
                                                style[el.amount_color]
                                            )
                                        }
                                    >
                                        {el.amount_value}
                                    </span>
                                }
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
                                {
                                    el.amount_value > 0 &&
                                    <span
                                        className={
                                            classNames(
                                                style.amount,
                                                style[el.amount_color]
                                            )
                                        }
                                    >
                                        {el.amount_value}
                                    </span>
                                }
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
                        {
                            data.low_high['1_18'].amount_value > 0 &&
                            <span
                                className={
                                    classNames(
                                        style.amount,
                                        style[data.low_high['1_18'].amount_color]
                                    )
                                }
                            >
                                {data.low_high['1_18'].amount_value}
                            </span>
                        }
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
                        {
                            data.even_odd['even'].amount_value > 0 &&
                            <span
                                className={
                                    classNames(
                                        style.amount,
                                        style[data.even_odd['even'].amount_color]
                                    )
                                }
                            >
                                {data.even_odd['even'].amount_value}
                            </span>
                        }
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
                                {
                                    el.amount_value > 0 &&
                                    <span
                                        className={
                                            classNames(
                                                style.amount,
                                                style[el.amount_color]
                                            )
                                        }
                                    >
                                        {el.amount_value}
                                    </span>
                                }
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
                        {
                            data.even_odd['odd'].amount_value > 0 &&
                            <span
                                className={
                                    classNames(
                                        style.amount,
                                        style[data.even_odd['odd'].amount_color]
                                    )
                                }
                            >
                                {data.even_odd['odd'].amount_value}
                            </span>
                        }
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
                        {
                            data.low_high['19_36'].amount_value > 0 &&
                            <span
                                className={
                                    classNames(
                                        style.amount,
                                        style[data.low_high['19_36'].amount_color]
                                    )
                                }
                            >
                                {data.low_high['19_36'].amount_value}
                            </span>
                        }
                        {data.low_high['19_36'].value.replace('_', ' to ')}
                    </button>
                </div>
                <div />
            </div>
        </div>
    );
}

export default TableChips;
