import {useRef, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {setStake} from "store/actions/stakeAction";

import {useMinMaxOdd} from "../useMinMaxOdd";
import {
    getOdds,
    getUniquePermutations,
    getBetMinMaxSystem,
    getBetMaxSingle
} from 'modules/Betslip/useStake'

import Calculator from "modules/Calculator";
import Icon from "components/Icon";

import style from './index.module.scss';


const findStake = (data, id) => {
    return data.find(el => {
        return el.id === id
    })
}

const Stake = ({data}) => {
    const dispatch = useDispatch()
    const {betslip} = useSelector((state) => state.betslip)
    const {settings} = useSelector((state) => state.settings)
    const {stake} = useSelector((state) => state.stake)
    const [edit, setEdit] = useState(false)
    const [calculate, setCalculate] = useState(false)
    const [value, setValue] = useState(0)

    const buttonRef = useRef(null)
    const blockRef = useRef(null)

    const useOutsideClick = (elementRef, handler, attached = true) => {
        useEffect(() => {
            if (!attached) return;

            const handleClick = (e) => {

                if (e.target === buttonRef.current) return;
                if (!elementRef.current && !buttonRef.current) return
                if (!elementRef.current.contains(e.target)) {
                    handler()
                    setEdit(false)
                }
            }

            document.addEventListener('click', handleClick)

            return () => {
                document.removeEventListener('click', handleClick)
            }

        }, [elementRef, handler, attached])
    }

    useOutsideClick(blockRef, setEdit, data)

    const changeProps = (a, val) => {
        if (data.type === 0) {
            const f = a[0]

            // eslint-disable-next-line react-hooks/rules-of-hooks
            const minOdd = useMinMaxOdd(betslip, 0)
            const maxWin = getBetMaxSingle(betslip)

            f.stake = val
            f.minWin = minOdd * val
            f.maxWin = maxWin * val
        }

        if (data.type === 1) {
            const f = findStake(a, data.id)
            const m = getUniquePermutations(getOdds(betslip), f.id)
            const maxWin = getBetMinMaxSystem(m, 2)

            f.stake = val
            f.minWin = f.min * val
            f.maxWin = maxWin * val
        }
    }

    const updateStake = (val) => {
        let r
        const regex = /[^0-9.]|(?<=\..*)\./g
        const a = stake.slice(0);

        if (!regex.test(val)) {
            r = val

            if (val.length > 1) {
                if (val[0] === '0' && val[1] !== '.') {
                    r = val.substr(1)
                }
            }

            if (val === '') {
                r = 0
            }

            changeProps(a, r)
            dispatch(setStake(a))
        }
    }

    const changeStake = (val) => {
        const a = stake.slice(0);
        const f = (data.type === 0) ? a[0] : findStake(a, data.id)
        let v

        if (val) {
            if (f.stake.toString().indexOf('.') !== -1) {
                const a = f.stake.split('.')
                a[0] = parseInt(a[0]) + val
                a[1] = a[1] === '' ? 0 : a[1]
                v = a.join('.')
            }
            else {
                v = parseInt(f.stake, 10) + val
            }
        }
        else {
            v = 0
        }

        changeProps(a, v)
        dispatch(setStake(a))
    }

    useEffect(() => {
        updateStake(value)
    }, [value])

    return (
        <div
            className={style.block}
            ref={blockRef}
        >
            <div className={style.tr}>
                <div className={style.th}>{data.gr}</div>
                <div className={style.th}>{data.combi}</div>
                <div className={style.th}>{data.min.toFixed(1)}</div>
                <div className={style.th}>{data.max.toFixed(1)}</div>
                <div className={style.th}>
                    <div className={style.input}>
                        <input
                            ref={buttonRef}
                            type={"text"}
                            className={style.field}
                            placeholder={'100'}
                            // defaultValue={data.stake.toFixed(2).replace(',', '.')}
                            value={data.stake}
                            onFocus={() => {
                                setEdit(true)
                            }}
                            onChange={(e) => {
                                updateStake(e.target.value || 0)
                            }}
                        />
                        <button
                            className={style.calculate}
                            onClick={() => {
                                setCalculate(true)
                            }}
                        >
                            <Icon id={'calculate'} />
                        </button>
                    </div>
                </div>
            </div>
            {
                edit &&
                <div className={style.keyboard}>
                    {
                        Object.values(settings.f.h).map((el, idx) =>
                            <button
                                key={idx}
                                className={style.key}
                                aria-label={'Key'}
                                onClick={() => {
                                    changeStake(el)
                                }}
                            >
                                {el}
                            </button>
                        )
                    }
                    <button
                        aria-label={'Clear'}
                        className={style.key}
                        onClick={() => {
                            changeStake(null)
                        }}
                    >
                        Clear
                    </button>
                </div>
            }
            {
                data.stake > 0 &&
                <div>
                    <div className={style.stake}>
                        <div>Potential MIN Win</div>
                        <div>{data.minWin.toFixed(2)}</div>
                    </div>
                    <div className={style.stake}>
                        <div>Potential MAX Win</div>
                        <div>{data.maxWin.toFixed(2)}</div>
                    </div>
                </div>
            }
            {
                calculate &&
                <Calculator
                    data={data.stake}
                    action={setValue}
                    toggle={setCalculate}
                />
            }
        </div>
    );
}

export default Stake;
