import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

import classNames from "classnames";

import style from './index.module.scss';

const CalculatorModal = ({data, action, toggle}) => {
    const [date, setDate] = useState(data)
    const {settings} = useSelector((state) => state.settings)

    const set = (n) => {
        setDate(n)
    }

    const handleClickSymbol = (n) => {
        if (n === '0') {
            if (date === 0) {
                setDate(0)
            }
            else {
                set(`${date}${n}`)
            }
        }

        if (n === '.') {
            if (date === 0) {
                set(`0${n}`)
            }
            else {
                if (date.toString().indexOf(n) === -1) {
                    set(`${date}${n}`)
                }
            }
        }
    }

    const handleClickNumber = (n) => {
        set(`${date}${n}`)
    }

    const handleClickStake = (n) => {
        if (date.toString().indexOf('.') !== -1) {
            const a = date.split('.')
            a[0] = parseInt(a[0]) + n
            a[1] = a[1] === '' ? 0 : a[1]
            const r = a.join('.')

            set(r)
        }
        else {
            set(parseInt(date, 10) + n)
        }
    }

    const handleClickDelete = () => {
        const n = date.toString()
        const r = n.slice(0, n.length - 1) || 0

        set(r)
    }

    const handleTextChange = (val) => {
        const regex = /[^0-9.]|(?<=\..*)\./g
        if (!regex.test(val)) {
            set(val)
        }
    }

    useEffect(() => {
        if (date.length > 1) {
            if (date[0] === '0' && date[1] !== '.') {
                set(date.substr(1))
            }
        }

        if (date === '') {
            set(0)
        }
    }, [date])

    return (
        <div className={style.block}>
            <div className={style.content}>
                <div className={style.header}>
                    <input
                        type={"text"}
                        className={style.field}
                        value={date}
                        onChange={(e) => {
                            handleTextChange(e.target.value)
                        }}
                    />
                    <button
                        className={style.key}
                        aria-label={'.'}
                        onClick={() => {
                            handleClickDelete()
                        }}
                    >
                        CA
                    </button>
                </div>
                <div className={style.body}>
                    <div className={style.keyboard}>
                        <button
                            className={style.key}
                            aria-label={'7'}
                            onClick={() => {
                                handleClickNumber('7')
                            }}
                        >
                            7
                        </button>
                        <button
                            className={style.key}
                            aria-label={'8'}
                            onClick={() => {
                                handleClickNumber('8')
                            }}
                        >
                            8
                        </button>
                        <button
                            className={style.key}
                            aria-label={'9'}
                            onClick={() => {
                                handleClickNumber('9')
                            }}
                        >
                            9
                        </button>
                        <button
                            className={style.key}
                            aria-label={'4'}
                            onClick={() => {
                                handleClickNumber('4')
                            }}
                        >
                            4
                        </button>
                        <button
                            className={style.key}
                            aria-label={'5'}
                            onClick={() => {
                                handleClickNumber('5')
                            }}
                        >
                            5
                        </button>
                        <button
                            className={style.key}
                            aria-label={'6'}
                            onClick={() => {
                                handleClickNumber('6')
                            }}
                        >
                            6
                        </button>
                        <button
                            className={style.key}
                            aria-label={'1'}
                            onClick={() => {
                                handleClickNumber('1')
                            }}
                        >
                            1
                        </button>
                        <button
                            className={style.key}
                            aria-label={'2'}
                            onClick={() => {
                                handleClickNumber('2')
                            }}
                        >
                            2
                        </button>
                        <button
                            className={style.key}
                            aria-label={'3'}
                            onClick={() => {
                                handleClickNumber('3')
                            }}
                        >
                            3
                        </button>
                        <button
                            className={style.key}
                            aria-label={'c'}
                            onClick={() => {
                                setDate(0)
                            }}
                        >
                            C
                        </button>
                        <button
                            className={style.key}
                            aria-label={'0'}
                            onClick={() => {
                                handleClickSymbol('0')
                            }}
                        >
                            0
                        </button>
                        <button
                            className={style.key}
                            aria-label={'.'}
                            onClick={() => {
                                handleClickSymbol('.')
                            }}
                        >
                            .
                        </button>
                    </div>

                    <div className={style.keys}>
                        {
                            Object.values(settings.betslip.steps).map((el, idx) =>
                                <button
                                    key={idx}
                                    className={style.key}
                                    aria-label={'Key'}
                                    onClick={() => {
                                        handleClickStake(el)
                                    }}
                                >
                                    {el}
                                </button>
                            )
                        }
                    </div>
                </div>
                <div className={style.footer}>
                    <div className={style.keys}>
                        <button
                            className={
                                classNames(
                                    style.key,
                                    style.red
                                )
                            }
                            onClick={() => {
                                toggle(false)
                            }}
                        >
                            Close
                        </button>
                        <button
                            className={
                                classNames(
                                    style.key,
                                    style.green
                                )
                            }
                            onClick={() => {
                                action(parseFloat(date))
                                toggle(false)
                            }}
                        >
                            Accept
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CalculatorModal;
