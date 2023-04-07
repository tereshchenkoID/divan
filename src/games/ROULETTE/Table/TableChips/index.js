import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {gameType, rouletteType, rouletteColor} from "constant/config";

import classNames from "classnames";
import {deleteBetslip} from "store/actions/betslipAction";

import {setStake} from "store/actions/stakeAction";

import Button from "components/Button";
import Odd from "games/ROULETTE/Table/Odd";

import style from './index.module.scss';

const setStepsValue = (data) => {
    const a = []

    // eslint-disable-next-line array-callback-return
    data.map((el, idx) =>
        a.push({
            id: idx,
            amount: el,
            color: rouletteColor[idx],
            active: idx === 0
        })
    )

    return a
}

const generateArrayFromRange = (range, filter) => {
    const [start, end] = range.split('-').map(num => parseInt(num));
    const arr = [];

    for (let i = start; i <= end; i++) {
        arr.push(i);
    }

    if (filter === 'even') {
        return arr.filter(num => num !== 0 && num % 2 === 0);
    } else if (filter === 'odd') {
        return arr.filter(num => num % 2 !== 0);
    } else {
        return arr;
    }
}

const generateIncreasingArray = (startNum, length)=>  {
    const arr = [startNum];

    for (let i = 1; i < length; i++) {
        arr.push(arr[i-1] + 3);
    }

    return arr;
}

const getRouletteValues = (color)=>  {
    const redValues = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    const blackValues = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];

    if (color === 'red') {
        return redValues;
    } else {
        return blackValues;
    }
}

const onHoverChips = (el, type, data, value) => {
    const a = el.stake
    let b;

    switch (value) {
        case 'range':
            b = generateArrayFromRange(el.name)
            break;
        case 'even':
            b = generateArrayFromRange('0-36', value)
            break;
        case 'odd':
            b = generateArrayFromRange('0-36', value)
            break;
        case 'counts':
            b = a.slice(a.indexOf(':') + 1, a.length).replaceAll(' ', '').split(',')
            break;
        case 'line':
            b = generateIncreasingArray(el.name, 12)
            break;
        case 'color':
            b = getRouletteValues(el.name)
            break;
        default:
            b = []
            break;
    }

    if (type === 0) {
        b.map(el => data.current[el].classList.add(style.hover))
    }
    else {
        b.map(el => data.current[el].classList.remove(style.hover))
    }
}

const TableChips = ({random}) => {
    const dispatch = useDispatch()
    const {settings} = useSelector((state) => state.settings)
    const {betslip} = useSelector((state) => state.betslip)

    const [steps, setSteps] = useState([])
    const numbers = useRef([])

    const data= {
        chips: [
            {
                stake: `${rouletteType.NUMBER}: 0`,
                odd: 36,
                value: 0,
                name: 0,
                type: null,
                color: "green",
                line: null
            },
            {
                stake: `${rouletteType.NUMBER}: 1`,
                odd: 36,
                value: 1,
                name: 1,
                type: "odd",
                color: "red",
                line: 1
            },
            {
                stake: `${rouletteType.NUMBER}: 2`,
                odd: 36,
                value: 2,
                name: 2,
                type: "even",
                color: "black",
                line: 2
            },
            {
                stake: `${rouletteType.NUMBER}: 3`,
                odd: 36,
                value: 3,
                name: 3,
                type: "odd",
                color: "red",
                line: 3
            },
            {
                stake: `${rouletteType.NUMBER}: 4`,
                odd: 36,
                value: 4,
                name: 4,
                type: "even",
                color: "black",
                line: 1
            },
            {
                stake: `${rouletteType.NUMBER}: 5`,
                odd: 36,
                value: 5,
                name: 5,
                type: "odd",
                color: "red",
                line: 2
            },
            {
                stake: `${rouletteType.NUMBER}: 6`,
                odd: 36,
                value: 6,
                name: 6,
                type: "even",
                color: "black",
                line: 3
            },
            {
                stake: `${rouletteType.NUMBER}: 7`,
                odd: 36,
                value: 7,
                name: 7,
                type: "odd",
                color: "red",
                line: 1
            },
            {
                stake: `${rouletteType.NUMBER}: 8`,
                odd: 36,
                value: 8,
                name: 8,
                type: "even",
                color: "black",
                line: 2
            },
            {
                stake: `${rouletteType.NUMBER}: 9`,
                odd: 36,
                value: 9,
                name: 9,
                type: "odd",
                color: "red",
                line: 3
            },
            {
                stake: `${rouletteType.NUMBER}: 10`,
                odd: 36,
                value: 10,
                name: 10,
                type: "even",
                color: "black",
                line: 1
            },
            {
                stake: `${rouletteType.NUMBER}: 11`,
                odd: 36,
                value: 11,
                name: 11,
                type: "odd",
                color: "black",
                line: 2
            },
            {
                stake: `${rouletteType.NUMBER}: 12`,
                odd: 36,
                value: 12,
                name: 12,
                type: "even",
                color: "red",
                line: 3
            },
            {
                stake: `${rouletteType.NUMBER}: 13`,
                odd: 36,
                value: 13,
                name: 13,
                type: "odd",
                color: "black",
                line: 1
            },
            {
                stake: `${rouletteType.NUMBER}: 14`,
                odd: 36,
                value: 14,
                name: 14,
                type: "even",
                color: "red",
                line: 2
            },
            {
                stake: `${rouletteType.NUMBER}: 15`,
                odd: 36,
                value: 15,
                name: 15,
                type: "odd",
                color: "black",
                line: 3
            },
            {
                stake: `${rouletteType.NUMBER}: 16`,
                odd: 36,
                value: 16,
                name: 16,
                type: "even",
                color: "red",
                line: 1
            },
            {
                stake: `${rouletteType.NUMBER}: 17`,
                odd: 36,
                value: 17,
                name: 17,
                type: "odd",
                color: "black",
                line: 2
            },
            {
                stake: `${rouletteType.NUMBER}: 18`,
                odd: 36,
                value: 18,
                name: 18,
                type: "even",
                color: "red",
                line: 3
            },
            {
                stake: `${rouletteType.NUMBER}: 19`,
                odd: 36,
                value: 19,
                name: 19,
                type: "odd",
                color: "red",
                line: 1
            },
            {
                stake: `${rouletteType.NUMBER}: 20`,
                odd: 36,
                value: 20,
                name: 20,
                type: "even",
                color: "black",
                line: 2
            },
            {
                stake: `${rouletteType.NUMBER}: 21`,
                odd: 36,
                value: 21,
                name: 21,
                type: "odd",
                color: "red",
                line: 3
            },
            {
                stake: `${rouletteType.NUMBER}: 22`,
                odd: 36,
                value: 22,
                name: 22,
                type: "even",
                color: "black",
                line: 1
            },
            {
                stake: `${rouletteType.NUMBER}: 23`,
                odd: 36,
                value: 23,
                name: 23,
                type: "odd",
                color: "red",
                line: 2
            },
            {
                stake: `${rouletteType.NUMBER}: 24`,
                odd: 36,
                value: 24,
                name: 24,
                type: "even",
                color: "black",
                line: 3
            },
            {
                stake: `${rouletteType.NUMBER}: 25`,
                odd: 36,
                value: 25,
                name: 25,
                type: "odd",
                color: "red",
                line: 1
            },
            {
                stake: `${rouletteType.NUMBER}: 26`,
                odd: 36,
                value: 26,
                name: 26,
                type: "even",
                color: "black",
                line: 2
            },
            {
                stake: `${rouletteType.NUMBER}: 27`,
                odd: 36,
                value: 27,
                name: 27,
                type: "odd",
                color: "red",
                line: 3
            },
            {
                stake: `${rouletteType.NUMBER}: 28`,
                odd: 36,
                value: 28,
                name: 28,
                type: "even",
                color: "black",
                line: 1
            },
            {
                stake: `${rouletteType.NUMBER}: 29`,
                odd: 36,
                value: 29,
                name: 29,
                type: "odd",
                color: "black",
                line: 2
            },
            {
                stake: `${rouletteType.NUMBER}: 30`,
                odd: 36,
                value: 30,
                name: 30,
                type: "even",
                color: "red",
                line: 3
            },
            {
                stake: `${rouletteType.NUMBER}: 31`,
                odd: 36,
                value: 31,
                name: 31,
                type: "odd",
                color: "black",
                line: 1
            },
            {
                stake: `${rouletteType.NUMBER}: 32`,
                odd: 36,
                value: 32,
                name: 32,
                type: "even",
                color: "red",
                line: 2
            },
            {
                stake: `${rouletteType.NUMBER}: 33`,
                odd: 36,
                value: 33,
                name: 33,
                type: "odd",
                color: "black",
                line: 3
            },
            {
                stake: `${rouletteType.NUMBER}: 34`,
                odd: 36,
                value: 34,
                name: 34,
                type: "even",
                color: "red",
                line: 1
            },
            {
                stake: `${rouletteType.NUMBER}: 35`,
                odd: 36,
                value: 35,
                name: 35,
                type: "odd",
                color: "black",
                line: 2
            },
            {
                stake: `${rouletteType.NUMBER}: 36`,
                odd: 36,
                value: 36,
                name: 36,
                type: "even",
                color: "red",
                line: 3
            }
        ],
        s_color: [
            {
                odd: 2,
                stake: `${rouletteType.COLOR}: RED`,
                print: `${rouletteType.COLOR}: RED`,
                name: 'red'
            },
            {
                odd: 2,
                stake: `${rouletteType.COLOR}: BLACK`,
                print: `${rouletteType.COLOR}: BLACK`,
                name: 'black'
            }
        ],
        s_line: [
            {
                odd: 3,
                stake: `${rouletteType.COLUMN}: 1`,
                print: `${rouletteType.COLUMN}: 1`,
                name: 1,
            },
            {
                odd: 3,
                stake: `${rouletteType.COLUMN}: 2`,
                print: `${rouletteType.COLUMN}: 2`,
                name: 2
            },
            {
                odd: 3,
                stake: `${rouletteType.COLUMN}: 3`,
                print: `${rouletteType.COLUMN}: 3`,
                name: 3
            }
        ],
        s_even_odd: [
            {
                odd: 2,
                stake: `${rouletteType.EVEN_ODD}: EVEN`,
                print: `${rouletteType.EVEN_ODD}: EVEN`,
                name: 'Even'
            },
            {
                odd: 2,
                stake: `${rouletteType.EVEN_ODD}: ODD`,
                print: `${rouletteType.EVEN_ODD}: ODD`,
                name: 'Odd'
            }
        ],
        s_low_high: [
            {
                odd: 2,
                stake: `${rouletteType.LOW_HIGH}: LOW`,
                print: `${rouletteType.LOW_HIGH}: 1-18`,
                name: '1-18'
            },
            {
                odd: 2,
                stake: `${rouletteType.LOW_HIGH}: HIGH`,
                print: `${rouletteType.LOW_HIGH}: 1-18`,
                name: '19-36'
            }
        ],
        s_dozen: [
            {
                odd: 3,
                stake: `${rouletteType.DOZEN}: FIRST_DOZEN`,
                print: `${rouletteType.DOZEN}: 1-12`,
                name: '1-12'
            },
            {
                odd: 3,
                stake: `${rouletteType.DOZEN}: SECOND_DOZEN`,
                print: `${rouletteType.DOZEN}: 13-24`,
                name: '13-24'
            },
            {
                odd: 3,
                stake: `${rouletteType.DOZEN}: THIRD_DOZEN`,
                print: `${rouletteType.DOZEN}: 25-36`,
                name: '25-36'
            }
        ],
        h_zero: [
            {
                stake: `${rouletteType.SPLIT}: 0, 3`,
                odd: 18
            },
            {
                stake: `${rouletteType.TRIO}: 0, 2, 3`,
                odd: 12
            },
            {
                stake: `${rouletteType.SPLIT}: 0, 2`,
                odd: 18
            },
            {
                stake: `${rouletteType.TRIO}: 0, 1, 2`,
                odd: 12
            },
            {
                stake: `${rouletteType.SPLIT}: 0, 1`,
                odd: 18
            },
            {
                stake: `${rouletteType.BASKET}: 0, 1, 2, 3`,
                odd: 9
            }
        ],
        h_chips: [
            [
                {
                    stake: `${rouletteType.NUMBER}: 3`,
                    odd: 36
                },
                {
                    stake: `${rouletteType.SPLIT}: 3, 6`,
                    odd: 18
                },
                {
                    stake: `${rouletteType.NUMBER}: 6`,
                    odd: 36
                },
                {
                    stake: `${rouletteType.SPLIT}: 6, 9`,
                    odd: 18
                },
                {
                    stake: `${rouletteType.NUMBER}: 9`,
                    odd: 36
                },
                {
                    stake: `${rouletteType.SPLIT}: 9, 12`,
                    odd: 18,
                },
                {
                    stake: `${rouletteType.NUMBER}: 12`,
                    odd: 36
                },
                {
                    stake: `${rouletteType.SPLIT}: 12, 15`,
                    odd: 18
                },
                {
                    stake: `${rouletteType.NUMBER}: 15`,
                    odd: 36
                },
                {
                    stake: `${rouletteType.SPLIT}: 15, 18`,
                    odd: 18
                },
                {
                    stake: `${rouletteType.NUMBER}: 18`,
                    odd: 36
                },
                {
                    stake: `${rouletteType.SPLIT}: 18, 21`,
                    odd: 18
                },
                {
                    stake: `${rouletteType.NUMBER}: 21`,
                    odd: 36
                },
                {
                    stake: `${rouletteType.SPLIT}: 21, 24`,
                    odd: 18
                },
                {
                    stake: `${rouletteType.NUMBER}: 24`,
                    odd: 36
                },
                {
                    stake: `${rouletteType.SPLIT}: 24, 27`,
                    odd: 18
                },
                {
                    stake: `${rouletteType.NUMBER}: 27`,
                    odd: 36
                },
                {
                    stake: `${rouletteType.SPLIT}: 27, 30`,
                    odd: 18
                },
                {
                    stake: `${rouletteType.NUMBER}: 30`,
                    odd: 36
                },
                {
                    stake: `${rouletteType.SPLIT}: 30, 33`,
                    odd: 18
                },
                {
                    stake: `${rouletteType.NUMBER}: 33`,
                    odd: 36
                },
                {
                    stake: `${rouletteType.SPLIT}: 33, 36`,
                    odd: 18
                },
                {
                    stake: `${rouletteType.NUMBER}: 36`,
                    odd: 36
                }
            ],
            [
                {
                    stake: `${rouletteType.SPLIT}: 2, 3`,
                    odd: 18
                },
                {
                    stake: `${rouletteType.CORNER}: 2, 3, 5, 6`,
                    odd: 9
                },
                {
                    stake: `${rouletteType.SPLIT}: 5, 6`,
                    odd: 18
                },
                {
                    stake: `${rouletteType.CORNER}: 5, 6, 8, 9`,
                    odd: 9
                },
                {
                    stake: `${rouletteType.SPLIT}: 8, 9`,
                    odd: 18
                },
                {
                    stake: `${rouletteType.CORNER}: 8, 9, 11, 12`,
                    odd: 9
                },
                {
                    stake: `${rouletteType.SPLIT}: 11, 12`,
                    odd: 18
                },
                {
                    stake: `${rouletteType.CORNER}: 11, 12, 14, 15`,
                    odd: 9
                },
                {
                    stake: `${rouletteType.SPLIT}: 14, 15`,
                    odd: 18
                },
                {
                    stake: `${rouletteType.CORNER}: 14, 15, 17, 18`,
                    odd: 9
                },
                {
                    stake: `${rouletteType.SPLIT}: 17, 18`,
                    odd: 18
                },
                {
                    stake: `${rouletteType.CORNER}: 17, 18, 20, 21`,
                    odd: 9
                },
                {
                    stake: `${rouletteType.SPLIT}: 20, 21`,
                    odd: 18
                },
                {
                    stake: `${rouletteType.CORNER}: 20, 21, 23, 24`,
                    odd: 9
                },
                {
                    stake: `${rouletteType.SPLIT}: 23, 24`,
                    odd: 18
                },
                {
                    stake: `${rouletteType.CORNER}: 23, 24, 26, 27`,
                    odd: 9
                },
                {
                    stake: `${rouletteType.SPLIT}: 26, 27`,
                    odd: 18
                },
                {
                    stake: `${rouletteType.CORNER}: 26, 27, 29, 30`,
                    odd: 9
                },
                {
                    stake: `${rouletteType.SPLIT}: 29, 30`,
                    odd: 18
                },
                {
                    stake: `${rouletteType.CORNER}: 29, 30, 32, 33`,
                    odd: 9
                },
                {
                    stake: `${rouletteType.SPLIT}: 32, 33`,
                    odd: 18
                },
                {
                    stake: `${rouletteType.CORNER}: 32, 33, 35, 36`,
                    odd: 9
                },
                {
                    stake: `${rouletteType.SPLIT}: 35, 36`,
                    odd: 18
                }
            ],
            [
                {
                    stake: `${rouletteType.NUMBER}: 2`,
                    odd: 36
                },
                {
                    stake: `${rouletteType.SPLIT}: 2, 5`,
                    odd: 18
                },
                {
                    stake: `${rouletteType.NUMBER}: 5`,
                    odd: 36
                },
                {
                    stake: `${rouletteType.SPLIT}: 5, 8`,
                    odd: 18
                },
                {
                    stake: `${rouletteType.NUMBER}: 8`,
                    odd: 36
                },
                {
                    stake: `${rouletteType.SPLIT}: 8, 11`,
                    odd: 18
                },
                {
                    stake: `${rouletteType.NUMBER}: 11`,
                    odd: 36
                },
                {
                    stake: `${rouletteType.SPLIT}: 11, 14`,
                    odd: 18
                },
                {
                    stake: `${rouletteType.NUMBER}: 14`,
                    odd: 36
                },
                {
                    stake: `${rouletteType.SPLIT}: 14, 17`,
                    odd: 18
                },
                {
                    stake: `${rouletteType.NUMBER}: 17`,
                    odd: 36
                },
                {
                    stake: `${rouletteType.SPLIT}: 17, 20`,
                    odd: 18
                },
                {
                    stake: `${rouletteType.NUMBER}: 20`,
                    odd: 36
                },
                {
                    stake: `${rouletteType.SPLIT}: 20, 23`,
                    odd: 18
                },
                {
                    stake: `${rouletteType.NUMBER}: 23`,
                    odd: 36
                },
                {
                    stake: `${rouletteType.SPLIT}: 23, 26`,
                    odd: 18
                },
                {
                    stake: `${rouletteType.NUMBER}: 26`,
                    odd: 36
                },
                {
                    stake: `${rouletteType.SPLIT}: 26, 29`,
                    odd: 18
                },
                {
                    stake: `${rouletteType.NUMBER}: 29`,
                    odd: 36
                },
                {
                    stake: `${rouletteType.SPLIT}: 29, 32`,
                    odd: 18
                },
                {
                    stake: `${rouletteType.NUMBER}: 32`,
                    odd: 36
                },
                {
                    stake: `${rouletteType.SPLIT}: 32, 35`,
                    odd: 18
                },
                {
                    stake: `${rouletteType.NUMBER}: 35`,
                    odd: 36
                }
            ],
            [
                {
                    stake: `${rouletteType.SPLIT}: 1, 2`,
                    odd: 18
                },
                {
                    stake: `${rouletteType.CORNER}: 1, 2, 4, 5`,
                    odd: 9
                },
                {
                    stake: `${rouletteType.SPLIT}: 4, 5`,
                    odd: 18
                },
                {
                    stake: `${rouletteType.CORNER}: 4, 5, 7, 8`,
                    odd: 9
                },
                {
                    stake: `${rouletteType.SPLIT}: 7, 8`,
                    odd: 18
                },
                {
                    stake: `${rouletteType.CORNER}: 7, 8, 10, 11`,
                    odd: 9
                },
                {
                    stake: `${rouletteType.SPLIT}: 10, 11`,
                    odd: 18
                },
                {
                    stake: `${rouletteType.CORNER}: 10, 11, 13, 14`,
                    odd: 9
                },
                {
                    stake: `${rouletteType.SPLIT}: 13, 14`,
                    odd: 18
                },
                {
                    stake: `${rouletteType.CORNER}: 13, 14, 16, 17`,
                    odd: 9
                },
                {
                    stake: `${rouletteType.SPLIT}: 16, 17`,
                    odd: 18
                },
                {
                    stake: `${rouletteType.CORNER}: 16, 17, 19, 20`,
                    odd: 9
                },
                {
                    stake: `${rouletteType.SPLIT}: 19, 20`,
                    odd: 18
                },
                {
                    stake: `${rouletteType.CORNER}: 19, 20, 22, 23`,
                    odd: 9
                },
                {
                    stake: `${rouletteType.SPLIT}: 22, 23`,
                    odd: 18
                },
                {
                    stake: `${rouletteType.CORNER}: 22, 23, 25, 26`,
                    odd: 9
                },
                {
                    stake: `${rouletteType.SPLIT}: 25, 26`,
                    odd: 18
                },
                {
                    stake: `${rouletteType.CORNER}: 25, 26, 28, 29`,
                    odd: 9
                },
                {
                    stake: `${rouletteType.SPLIT}: 28, 29`,
                    odd: 18
                },
                {
                    stake: `${rouletteType.CORNER}: 28, 29, 31, 32`,
                    odd: 9
                },
                {
                    stake: `${rouletteType.SPLIT}: 31, 32`,
                    odd: 18
                },
                {
                    stake: `${rouletteType.CORNER}: 31, 32, 34, 35`,
                    odd: 9
                },
                {
                    stake: `${rouletteType.SPLIT}: 34, 35`,
                    odd: 18
                }
            ],
            [
                {
                    stake: `${rouletteType.NUMBER}: 1`,
                    odd: 36
                },
                {
                    stake: `${rouletteType.SPLIT}: 1, 4`,
                    odd: 18
                },
                {
                    stake: `${rouletteType.NUMBER}: 4`,
                    odd: 36
                },
                {
                    stake: `${rouletteType.SPLIT}: 4, 7`,
                    odd: 18
                },
                {
                    stake: `${rouletteType.NUMBER}: 7`,
                    odd: 36
                },
                {
                    stake: `${rouletteType.SPLIT}: 7, 10`,
                    odd: 18
                },
                {
                    stake: `${rouletteType.NUMBER}: 10`,
                    odd: 36
                },
                {
                    stake: `${rouletteType.SPLIT}: 10, 13`,
                    odd: 18
                },
                {
                    stake: `${rouletteType.NUMBER}: 13`,
                    odd: 36
                },
                {
                    stake: `${rouletteType.SPLIT}: 13, 16`,
                    odd: 18
                },
                {
                    stake: `${rouletteType.NUMBER}: 16`,
                    odd: 36
                },
                {
                    stake: `${rouletteType.SPLIT}: 16, 19`,
                    odd: 18
                },
                {
                    stake: `${rouletteType.NUMBER}: 19`,
                    odd: 36
                },
                {
                    stake: `${rouletteType.SPLIT}: 19, 22`,
                    odd: 18
                },
                {
                    stake: `${rouletteType.NUMBER}: 22`,
                    odd: 36
                },
                {
                    stake: `${rouletteType.SPLIT}: 22, 25`,
                    odd: 18
                },
                {
                    stake: `${rouletteType.NUMBER}: 25`,
                    odd: 36
                },
                {
                    stake: `${rouletteType.SPLIT}: 25, 28`,
                    odd: 18
                },
                {
                    stake: `${rouletteType.NUMBER}: 28`,
                    odd: 36
                },
                {
                    stake: `${rouletteType.SPLIT}: 28, 31`,
                    odd: 18
                },
                {
                    stake: `${rouletteType.NUMBER}: 31`,
                    odd: 36
                },
                {
                    stake: `${rouletteType.SPLIT}: 31, 34`,
                    odd: 18
                },
                {
                    stake: `${rouletteType.NUMBER}: 34`,
                    odd: 36,
                }
            ],
            [
                {
                    stake: `${rouletteType.STREET}: 1, 2, 3`,
                    odd: 12
                },
                {
                    stake: `${rouletteType.SIX_LINE}: 1, 2, 3, 4, 5, 6`,
                    odd: 6
                },
                {
                    stake: `${rouletteType.STREET}: 4, 5, 6`,
                    odd: 12
                },
                {
                    stake: `${rouletteType.SIX_LINE}: 4, 5, 6, 7, 8, 9`,
                    odd: 6
                },
                {
                    stake: `${rouletteType.STREET}: 7, 8, 9`,
                    odd: 12
                },
                {
                    stake: `${rouletteType.SIX_LINE}: 7, 8, 9, 10, 11, 12`,
                    odd: 6
                },
                {
                    stake: `${rouletteType.STREET}: 10, 11, 12`,
                    odd: 12
                },
                {
                    stake: `${rouletteType.SIX_LINE}: 10, 11, 12, 13, 14, 15`,
                    odd: 6
                },
                {
                    stake: `${rouletteType.STREET}: 13, 14, 15`,
                    odd: 12
                },
                {
                    stake: `${rouletteType.SIX_LINE}: 13, 14, 15, 16, 17, 18`,
                    odd: 6
                },
                {
                    stake: `${rouletteType.STREET}: 16, 17, 18`,
                    odd: 12
                },
                {
                    stake: `${rouletteType.SIX_LINE}: 16, 17, 18, 19, 20, 21`,
                    odd: 6
                },
                {
                    stake: `${rouletteType.STREET}: 19, 20, 21`,
                    odd: 12
                },
                {
                    stake: `${rouletteType.SIX_LINE}: 19, 20, 21, 22, 23, 24`,
                    odd: 6
                },
                {
                    stake: `${rouletteType.STREET}: 22, 23, 24`,
                    odd: 12
                },
                {
                    stake: `${rouletteType.SIX_LINE}: 22, 23, 24, 25, 26, 27`,
                    odd: 6
                },
                {
                    stake: `${rouletteType.STREET}: 25, 26, 27`,
                    odd: 12
                },
                {
                    stake: `${rouletteType.SIX_LINE}: 25, 26, 27, 28, 29, 30`,
                    odd: 6
                },
                {
                    stake: `${rouletteType.STREET}: 28, 29, 30`,
                    odd: 12
                },
                {
                    stake: `${rouletteType.SIX_LINE}: 28, 29, 30, 31, 32, 33`,
                    odd: 6
                },
                {
                    stake: `${rouletteType.STREET}: 31, 32, 33`,
                    odd: 12
                },
                {
                    stake: `${rouletteType.SIX_LINE}: 31, 32, 33, 34, 35, 36`,
                    odd: 6
                },
                {
                    stake: `${rouletteType.STREET}: 34, 35, 36`,
                    odd: 12
                }
            ]
        ]
    }

    useEffect(() => {
        setSteps(setStepsValue(settings.betslip.steps))
    }, [settings])

    useEffect(() => {
        if (random.length > 0) {
            addRandomChips()
        }
    }, [random])

    const setRefs = (date, i) => {
        numbers.current[date.value] = i
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

    const doubleChips = () => {
        const a = betslip.slice(0)

        for (let i = 0; i < a.length; i++) {

            if (a[i].type === gameType.ROULETTE) {
                a[i].stake =  (a[i].stake * 2).toFixed(2)
            }
        }

        dispatch(deleteBetslip(a))
    }

    const addRandomChips = () => {
        const a = betslip.slice(0)
        const r = a.filter(el => el.type !== gameType.ROULETTE)

        for (let i = 0; i < random.length; i++) {
            r.push({
                start: null,
                id: data.chips[random[i]].stake,
                b: data.chips[random[i]].odd,
                market: data.chips[random[i]].stake,
                print: data.print,
                m_old: data.chips[random[i]].stake.split(":")[0],             // Remove after
                o_old: data.chips[random[i]].stake.split(":")[1].slice(1),    // Remove after
                stake: buttonStepGet().amount.toFixed(2),
                type: "ROULETTE"
            })
        }

        dispatch(deleteBetslip(r))

        console.log("Add")
    }

    const clearBets = () => {
        const r = betslip.filter(el => el.type !== gameType.ROULETTE)
        dispatch(deleteBetslip(r))
        dispatch(setStake([]))
    }

    return (
        <div className={style.block}>
            <div className={style.body}>
                <div className={style.top}>
                    <div />
                    <div className={style.dozens}>
                        {
                            data.s_dozen.map((el, idx) =>
                                <div
                                    key={idx}
                                    className={style.button}
                                    onMouseEnter = {() => {
                                        onHoverChips(el, 0, numbers, 'range')
                                    }}
                                    onMouseLeave = {() => {
                                        onHoverChips(el, 1, numbers, 'range')
                                    }}
                                >
                                    <Odd
                                        data={el}
                                        step={buttonStepGet()}
                                        steps={steps}
                                    />
                                </div>
                            )
                        }
                    </div>
                    <div />
                </div>

                <div className={style.middle}>
                    <div className={style['hidden-zero']}>
                        {
                            data.h_zero.map((el, idx) =>
                                <div
                                    key={idx}
                                    className={style.button}
                                    onMouseEnter = {() => {
                                        onHoverChips(el, 0, numbers, 'counts')
                                    }}
                                    onMouseLeave = {() => {
                                        onHoverChips(el, 1, numbers, 'counts')
                                    }}
                                >
                                    <Odd
                                        data={el}
                                        step={buttonStepGet()}
                                        steps={steps}
                                    />
                                </div>
                            )
                        }
                    </div>
                    <div className={style['hidden-chips']}>
                        {
                            data.h_chips.map((el_a, idx_a) =>
                                <div
                                    key={idx_a}
                                    className={style['h-row']}
                                >
                                    {
                                        el_a.map((el, idx) =>
                                            <div
                                                key={idx}
                                                className={style.button}
                                                onMouseEnter = {() => {
                                                    onHoverChips(el, 0, numbers, 'counts')
                                                }}
                                                onMouseLeave = {() => {
                                                    onHoverChips(el, 1, numbers, 'counts')
                                                }}
                                            >
                                                <Odd
                                                    data={el}
                                                    step={buttonStepGet()}
                                                    steps={steps}
                                                />
                                            </div>
                                        )
                                    }
                                </div>
                            )
                        }
                    </div>

                    <div className={style.zero}>
                        <div
                            className={style.button}
                            ref={(i) => {
                                numbers.current[data.chips[0].value] = i
                            }}
                        >
                            <Odd
                                data={data.chips[0]}
                                step={buttonStepGet()}
                                steps={steps}
                            />
                        </div>
                    </div>
                    <div className={style.numbers}>
                        {
                            data.chips.map((el, idx) =>
                                idx !== 0 &&
                                <div
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
                                >
                                    {el.name}
                                </div>
                            )
                        }
                    </div>
                    <div className={style.rows}>
                        {
                            data.s_line.map((el, idx) =>
                                <div
                                    key={idx}
                                    className={style.button}
                                    onMouseEnter = {() => {
                                        onHoverChips(el, 0, numbers, 'line')
                                    }}
                                    onMouseLeave = {() => {
                                        onHoverChips(el, 1, numbers, 'line')
                                    }}
                                >
                                    <Odd
                                        data={el}
                                        step={buttonStepGet()}
                                        steps={steps}
                                    />
                                </div>
                            )
                        }
                    </div>
                </div>

                <div className={style.bottom}>
                    <div />
                    <div className={style.extra}>
                        <div
                            className={style.button}
                            onMouseEnter = {() => {
                                onHoverChips(data.s_low_high[0], 0, numbers, 'range')
                            }}
                            onMouseLeave = {() => {
                                onHoverChips(data.s_low_high[0], 1, numbers, 'range')
                            }}
                        >
                            <Odd
                                data={data.s_low_high[0]}
                                step={buttonStepGet()}
                                steps={steps}
                            />
                        </div>
                        <div
                            className={style.button}
                            onMouseEnter = {() => {
                                onHoverChips(data.s_even_odd[0], 0, numbers, 'even')
                            }}
                            onMouseLeave = {() => {
                                onHoverChips(data.s_even_odd[0], 1, numbers, 'even')
                            }}
                        >
                            <Odd
                                data={data.s_even_odd[0]}
                                step={buttonStepGet()}
                                steps={steps}
                            />
                        </div>
                        {
                            data.s_color.map((el, idx) =>
                                <button
                                    key={idx}
                                    className={style.button}
                                    onMouseEnter = {() => {
                                        onHoverChips(el, 0, numbers, 'color')
                                    }}
                                    onMouseLeave = {() => {
                                        onHoverChips(el, 1, numbers, 'color')
                                    }}
                                >
                                    <Odd
                                        data={el}
                                        step={buttonStepGet()}
                                        steps={steps}
                                    />
                                </button>
                            )
                        }
                        <div
                            className={style.button}
                            onMouseEnter = {() => {
                                onHoverChips(data.s_even_odd[1], 0, numbers, 'odd')
                            }}
                            onMouseLeave = {() => {
                                onHoverChips(data.s_even_odd[1], 1, numbers, 'odd')
                            }}
                        >
                            <Odd
                                data={data.s_even_odd[1]}
                                step={buttonStepGet()}
                                steps={steps}
                            />
                        </div>
                        <div
                            className={style.button}
                            onMouseEnter = {() => {
                                onHoverChips(data.s_low_high[1], 0, numbers, 'range')
                            }}
                            onMouseLeave = {() => {
                                onHoverChips(data.s_low_high[1], 1, numbers, 'range')
                            }}
                        >
                            <Odd
                                data={data.s_low_high[1]}
                                step={buttonStepGet()}
                                steps={steps}
                            />
                        </div>
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
                                <img
                                    src={`/img/ROULETTE/chips/${el.color}.png`}
                                    alt={'Chips'}
                                />
                                <p>{el.amount}</p>
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
                            clearBets()
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default TableChips;
