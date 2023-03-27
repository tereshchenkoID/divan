import {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";

import classNames from "classnames";

import style from './index.module.scss';
import Button from "../../../../components/Button";


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

    const [chips, setChips] = useState([
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
    ])

    const line_1 = useRef([])
    const line_2 = useRef([])
    const line_3 = useRef([])
    const zero = useRef([])

    const even = useRef([])
    const odd = useRef([])

    const color_red = useRef([])
    const color_black = useRef([])

    const r_1_12 = useRef([])
    const r_13_24 = useRef([])
    const r_25_36 = useRef([])
    const r_1_18 = useRef([])
    const r_19_36 = useRef([])

    const setLines = (data) => {
        switch (data) {
            case 1:
                return line_1
            case 2:
                return line_2
            case 3:
                return line_3
            default:
                return zero
        }
    }

    const setColor = (data) => {
        switch (data) {
            case 'red':
                return color_red
            case 'black':
                return color_black
            default:
                return color_red
        }
    }

    const setType = (data) => {
        switch (data) {
            case 'odd':
                return odd
            case 'even':
                return even
            default:
                return odd
        }
    }

    const setRefs = (data, i) => {
        const lines = setLines(data.line)
        lines.current[lines.current.length] = i

        zero.current[0] = chips[0]

        const colors = setColor(data.color)
        colors.current[colors.current.length] = i


        const type = setType(data.type)
        type.current[type.current.length] = i


        if (data.name <= 12) {
            r_1_12.current[r_1_12.current.length] = i
        } else if (data.name > 12 && data.name < 25) {
            r_13_24.current[r_13_24.current.length] = i
        } else {
            r_25_36.current[r_25_36.current.length] = i
        }


        if (data.name <= 18) {
            r_1_18.current[r_1_18.current.length] = i
        } else {
            r_19_36.current[r_19_36.current.length] = i
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

    const buttonAmountSet = (name) => {
        setChips(prevState =>
            prevState.map(item =>
                item.name === name
                    ?
                        {
                            ...item,
                            amount_value: item.amount_value + buttonStepGet().amount,
                            amount_color: currentStakeColor(item.amount_value + buttonStepGet().amount)
                        }
                    :
                        item
            )
        )
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
        let a = chips.slice(0)

        a.map(item => {
            item.amount_value = 0
            item.amount_color = null
        })

        setChips(a)
    }

    const doubleChips = () => {
        let a = chips.slice(0)

        a.map(item => {
            item.amount_value = item.amount_value * 2
            item.amount_color = currentStakeColor(item.amount_value)
        })

        setChips(a)
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

            <div className={style.top}>
                <div />
                <div className={style.dozens}>
                    <button
                        className={style.button}
                        onMouseEnter = {() => {
                            onHoverRefs(r_1_12.current, 0)
                        }}
                        onMouseLeave = {() => {
                            onHoverRefs(r_1_12.current, 1)
                        }}
                    >
                        1-12
                    </button>
                    <button
                        className={style.button}
                        onMouseEnter = {() => {
                            onHoverRefs(r_13_24.current, 0)
                        }}
                        onMouseLeave = {() => {
                            onHoverRefs(r_13_24.current, 1)
                        }}
                    >
                        13-24
                    </button>
                    <button
                        className={style.button}
                        onMouseEnter = {() => {
                            onHoverRefs(r_25_36.current, 0)
                        }}
                        onMouseLeave = {() => {
                            onHoverRefs(r_25_36.current, 1)
                        }}
                    >
                        25-36
                    </button>
                </div>
                <div />
            </div>

            <div className={style.middle}>
                <div className={style.zero}>
                    <button
                        className={style.button}
                    >
                        0
                    </button>
                </div>
                <div className={style.numbers}>
                    {
                        chips.map((el, idx) =>
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
                                    buttonAmountSet(el.name)
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
                    <button
                        className={style.button}
                        onMouseEnter = {() => {
                            onHoverRefs(line_3.current, 0)
                        }}
                        onMouseLeave = {() => {
                            onHoverRefs(line_3.current, 1)
                        }}
                    >
                        <p>2 to 1</p>
                        <p>|||</p>
                    </button>
                    <button
                        className={style.button}
                        onMouseEnter = {() => {
                            onHoverRefs(line_2.current, 0)
                        }}
                        onMouseLeave = {() => {
                            onHoverRefs(line_2.current, 1)
                        }}
                    >
                        <p>2 to 1</p>
                        <p>||</p>
                    </button>
                    <button
                        className={style.button}
                        onMouseEnter = {() => {
                            onHoverRefs(line_1.current, 0)
                        }}
                        onMouseLeave = {() => {
                            onHoverRefs(line_1.current, 1)
                        }}
                    >
                        <p>2 to 1</p>
                        <p>|</p>
                    </button>
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
                            onHoverRefs(r_1_18.current, 0)
                        }}
                        onMouseLeave = {() => {
                            onHoverRefs(r_1_18.current, 1)
                        }}
                    >
                        1 to 18
                    </button>
                    <button
                        className={style.button}
                        onMouseEnter = {() => {
                            onHoverRefs(even.current, 0)
                        }}
                        onMouseLeave = {() => {
                            onHoverRefs(even.current, 1)
                        }}
                    >
                        Even
                    </button>
                    <button
                        className={style.button}
                        onMouseEnter = {() => {
                            onHoverRefs(color_red.current, 0)
                        }}
                        onMouseLeave = {() => {
                            onHoverRefs(color_red.current, 1)
                        }}
                    >
                        <div
                            className={
                                classNames(
                                    style.diamond,
                                    style.red
                                )
                            }
                        >
                            <div/>
                        </div>
                    </button>
                    <button
                        className={style.button}
                        onMouseEnter = {() => {
                            onHoverRefs(color_black.current, 0)
                        }}
                        onMouseLeave = {() => {
                            onHoverRefs(color_black.current, 1)
                        }}
                    >
                        <div
                            className={
                                classNames(
                                    style.diamond,
                                    style.black
                                )
                            }
                        >
                            <div/>
                        </div>
                    </button>
                    <button
                        className={style.button}
                        onMouseEnter = {() => {
                            onHoverRefs(odd.current, 0)
                        }}
                        onMouseLeave = {() => {
                            onHoverRefs(odd.current, 1)
                        }}
                    >
                        Odd
                    </button>
                    <button
                        className={style.button}
                        onMouseEnter = {() => {
                            onHoverRefs(r_19_36.current, 0)
                        }}
                        onMouseLeave = {() => {
                            onHoverRefs(r_19_36.current, 1)
                        }}
                    >
                        19 to 36
                    </button>
                </div>
                <div />
            </div>
        </div>
    );
}

export default TableChips;
