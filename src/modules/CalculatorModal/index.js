import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

import classNames from "classnames";

import Button from "components/Button";

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
                    <Button
                        type={'grey'}
                        size={'lg'}
                        text={'CA'}
                        action={() => {
                            handleClickDelete()
                        }}
                    />
                </div>
                <div className={style.body}>
                    <div className={style.keyboard}>
                        <div className={style.key}>
                            <Button
                                type={'green'}
                                size={'lg'}
                                text={'7'}
                                action={() => {
                                    handleClickNumber('7')
                                }}
                            />
                        </div>
                        <div className={style.key}>
                            <Button
                                type={'green'}
                                size={'lg'}
                                text={'8'}
                                action={() => {
                                    handleClickNumber('8')
                                }}
                            />
                        </div>
                        <div className={style.key}>
                            <Button
                                type={'green'}
                                size={'lg'}
                                text={'9'}
                                action={() => {
                                    handleClickNumber('9')
                                }}
                            />
                        </div>
                        <div className={style.key}>
                            <Button
                                type={'green'}
                                size={'lg'}
                                text={'4'}
                                action={() => {
                                    handleClickNumber('4')
                                }}
                            />
                        </div>
                        <div className={style.key}>
                            <Button
                                type={'green'}
                                size={'lg'}
                                text={'5'}
                                action={() => {
                                    handleClickNumber('5')
                                }}
                            />
                        </div>
                        <div className={style.key}>
                            <Button
                                type={'green'}
                                size={'lg'}
                                text={'6'}
                                action={() => {
                                    handleClickNumber('6')
                                }}
                            />
                        </div>
                        <div className={style.key}>
                            <Button
                                type={'green'}
                                size={'lg'}
                                text={'1'}
                                action={() => {
                                    handleClickNumber('1')
                                }}
                            />
                        </div>
                        <div className={style.key}>
                            <Button
                                type={'green'}
                                size={'lg'}
                                text={'2'}
                                action={() => {
                                    handleClickNumber('2')
                                }}
                            />
                        </div>
                        <div className={style.key}>
                            <Button
                                type={'green'}
                                size={'lg'}
                                text={'3'}
                                action={() => {
                                    handleClickNumber('3')
                                }}
                            />
                        </div>
                        <div className={style.key}>
                            <Button
                                type={'green'}
                                size={'lg'}
                                text={'c'}
                                action={() => {
                                    setDate(0)
                                }}
                            />
                        </div>
                        <div className={style.key}>
                            <Button
                                type={'green'}
                                size={'lg'}
                                text={'0'}
                                action={() => {
                                    handleClickSymbol('0')
                                }}
                            />
                        </div>
                        <div className={style.key}>
                            <Button
                                type={'green'}
                                size={'lg'}
                                text={'.'}
                                action={() => {
                                    handleClickSymbol('.')
                                }}
                            />
                        </div>
                    </div>

                    <div className={style.keys}>
                        {
                            Object.values(settings.betslip.steps).map((el, idx) =>
                                <div
                                    key={idx}
                                    className={style.key}
                                >
                                    <Button
                                        type={'green'}
                                        size={'lg'}
                                        text={el}
                                        action={() => {
                                            handleClickStake(el)
                                        }}
                                    />
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className={style.footer}>
                    <div className={style.keys}>
                        <div className={style.key}>
                            <Button
                                type={'red'}
                                size={'lg'}
                                text={'Close'}
                                action={() => {
                                    toggle(false)
                                }}
                            />
                        </div>
                        <div className={style.key}>
                            <Button
                                type={'green'}
                                size={'lg'}
                                text={'Accept'}
                                action={() => {
                                    action(parseFloat(date))
                                    toggle(false)
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CalculatorModal;
