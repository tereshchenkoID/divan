import {useRef} from "react";

import classNames from "classnames";

import style from './index.module.scss';

const TableChips = () => {
    const b = 36
    const r = 6
    const r_b = 23

    const chips = [
        {
            name: 0,
            type: null,
            color: "green",
            line: null,
            range: []
        },
        {
            name: 1,
            type: "odd",
            color: "red",
            line: 1,
            range: [
                '1-12',
                '1-18'
            ]
        },
        {
            name: 2,
            type: "even",
            color: "black",
            line: 2,
            range: [
                '1-12',
                '1-18'
            ]
        },
        {
            name: 3,
            type: "odd",
            color: "red",
            line: 3,
            range: [
                '1-12',
                '1-18'
            ]
        },
        {
            name: 4,
            type: "even",
            color: "black",
            line: 1,
            range: [
                '1-12',
                '1-18'
            ]
        },
        {
            name: 5,
            type: "odd",
            color: "red",
            line: 2,
            range: [
                '1-12',
                '1-18'
            ]
        },
        {
            name: 6,
            type: "even",
            color: "black",
            line: 3,
            range: [
                '1-12',
                '1-18'
            ]
        },
        {
            name: 7,
            type: "odd",
            color: "red",
            line: 1,
            range: [
                '1-12',
                '1-18'
            ]
        },
        {
            name: 8,
            type: "even",
            color: "black",
            line: 2,
            range: [
                '1-12',
                '1-18'
            ]
        },
        {
            name: 9,
            type: "odd",
            color: "red",
            line: 3,
            range: [
                '1-12',
                '1-18'
            ]
        },
        {
            name: 10,
            type: "even",
            color: "black",
            line: 1,
            range: [
                '1-12',
                '1-18'
            ]
        },
        {
            name: 11,
            type: "odd",
            color: "black",
            line: 2,
            range: [
                '1-12',
                '1-18'
            ]
        },
        {
            name: 12,
            type: "even",
            color: "red",
            line: 3,
            range: [
                '1-12',
                '1-18'
            ]
        },
        {
            name: 13,
            type: "odd",
            color: "black",
            line: 1,
            range: [
                '13-24',
                '1-18'
            ]
        },
        {
            name: 14,
            type: "even",
            color: "red",
            line: 2,
            range: [
                '13-24',
                '1-18'
            ]
        },
        {
            name: 15,
            type: "odd",
            color: "black",
            line: 3,
            range: [
                '13-24',
                '1-18'
            ]
        },
        {
            name: 16,
            type: "even",
            color: "red",
            line: 1,
            range: [
                '13-24',
                '1-18'
            ]
        },
        {
            name: 17,
            type: "odd",
            color: "black",
            line: 2,
            range: [
                '13-24',
                '1-18'
            ]
        },
        {
            name: 18,
            type: "even",
            color: "red",
            line: 3,
            range: [
                '13-24',
                '1-18'
            ]
        },
        {
            name: 19,
            type: "odd",
            color: "red",
            line: 1,
            range: [
                '13-24',
                '19-36'
            ]
        },
        {
            name: 20,
            type: "even",
            color: "black",
            line: 2,
            range: [
                '13-24',
                '19-36'
            ]
        },
        {
            name: 21,
            type: "odd",
            color: "red",
            line: 3,
            range: [
                '13-24',
                '19-36'
            ]
        },
        {
            name: 22,
            type: "even",
            color: "black",
            line: 1,
            range: [
                '13-24',
                '19-36'
            ]
        },
        {
            name: 23,
            type: "odd",
            color: "red",
            line: 2,
            range: [
                '13-24',
                '19-36'
            ]
        },
        {
            name: 24,
            type: "even",
            color: "black",
            line: 3,
            range: [
                '25-36',
                '19-36'
            ]
        },
        {
            name: 25,
            type: "odd",
            color: "red",
            line: 1,
            range: [
                '25-36',
                '19-36'
            ]
        },
        {
            name: 26,
            type: "even",
            color: "black",
            line: 2,
            range: [
                '25-36',
                '19-36'
            ]
        },
        {
            name: 27,
            type: "odd",
            color: "red",
            line: 3,
            range: [
                '25-36',
                '19-36'
            ]
        },
        {
            name: 28,
            type: "even",
            color: "black",
            line: 1,
            range: [
                '25-36',
                '19-36'
            ]
        },
        {
            name: 29,
            type: "odd",
            color: "black",
            line: 2,
            range: [
                '25-36',
                '19-36'
            ]
        },
        {
            name: 30,
            type: "even",
            color: "red",
            line: 3,
            range: [
                '25-36',
                '19-36'
            ]
        },
        {
            name: 31,
            type: "odd",
            color: "black",
            line: 1,
            range: [
                '25-36',
                '19-36'
            ]
        },
        {
            name: 32,
            type: "even",
            color: "red",
            line: 2,
            range: [
                '25-36',
                '19-36'
            ]
        },
        {
            name: 33,
            type: "odd",
            color: "black",
            line: 3,
            range: [
                '25-36',
                '19-36'
            ]
        },
        {
            name: 34,
            type: "even",
            color: "red",
            line: 1,
            range: [
                '25-36',
                '19-36'
            ]
        },
        {
            name: 35,
            type: "odd",
            color: "black",
            line: 2,
            range: [
                '25-36',
                '19-36'
            ]
        },
        {
            name: 36,
            type: "even",
            color: "red",
            line: 3,
            range: [
                '25-36',
                '19-36'
            ]
        }
    ];

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
        }
        else if(data.name > 12 && data.name < 25) {
            r_13_24.current[r_13_24.current.length] = i
        }
        else {
            r_25_36.current[r_25_36.current.length] = i
        }


        if (data.name <= 18) {
            r_1_18.current[r_1_18.current.length] = i
        }
        else {
            r_19_36.current[r_19_36.current.length] = i
        }
    }

    const onHoverRefs = (data, type) => {
        if (type === 0) {
            data.map(el => el.classList.add(style.hover))
            console.log('on hover')
        }
        else {
            data.map(el => el.classList.remove(style.hover))
            console.log('leave hover')
        }
    }

    return (
        <div className={style.block}>
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
                            >
                                {el.name}
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
                            <div />
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
                            <div />
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
