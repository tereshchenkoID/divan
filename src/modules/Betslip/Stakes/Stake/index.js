import {useRef, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {useOutsideClick} from "hooks/useOutsideClick";
import {getBetMaxSingle, getMinMaxOdd } from 'hooks/useStake'

import {setStake} from "store/actions/stakeAction";

import CalculatorModal from "modules/CalculatorModal";
import Icon from "components/Icon";
import Button from "components/Button";

import {oddsType} from "constant/config";

import {deleteBetslip} from "store/actions/betslipAction";

import style from './index.module.scss';

const Stake = ({data}) => {
    const dispatch = useDispatch()
    const {betslip} = useSelector((state) => state.betslip)
    const {settings} = useSelector((state) => state.settings)
    const {stake} = useSelector((state) => state.stake)
    const [edit, setEdit] = useState(false)
    const [calculate, setCalculate] = useState(false)
    const [value, setValue] = useState(data.stake)
    const [init, setInit] = useState(false)

    const buttonRef = useRef(null)
    const blockRef = useRef(null)

    useOutsideClick(blockRef, buttonRef, setEdit, data)

    const updateBetslip = (stake) => {
        console.log("Update Stake", stake)

        for(let i = 0; i < betslip.length; i++) {
            betslip[i].stake = settings.betting.type === oddsType.PER_BET ? parseFloat(stake).toFixed(2) : parseFloat(stake / betslip.length).toFixed(2)
        }

        dispatch(deleteBetslip(betslip))
    }

    const changeProps = (a, val) => {
        if (data.type === 0) {
            const f = a[0]
            const minOdd = getMinMaxOdd(betslip, 0)
            const maxWin = getBetMaxSingle(betslip)

            f.stake = val
            f.minWin = minOdd * val
            f.maxWin = maxWin * val
        }

        if (data.type === 1) {
            data.stake = val
            data.minWin = data.min * val
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
            data.type === 0 && updateBetslip(r)
            setInit(true)
        }
    }

    const changeStake = (val) => {
        const a = stake.slice(0)
        const f = (data.type === 0) ? a[0] : data
        let r

        if (val) {
            if (f.stake.toString().indexOf('.') !== -1) {
                const a = f.stake.toString().split('.')
                a[0] = parseInt(a[0]) + val
                a[1] = a[1] === '' ? 0 : a[1]
                r = a.join('.')
            }
            else {
                r = parseInt(f.stake, 10) + val
            }
        }
        else {
            r = 0
        }

        changeProps(a, r)
        dispatch(setStake(a))
        data.type === 0 && updateBetslip(r)
    }

    useEffect(() => {
        init && updateStake(value)
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
                        Object.values(settings.betslip.steps).map((el, idx) =>
                            <div
                                className={style.key}
                                key={idx}
                            >
                                <Button
                                    type={'green'}
                                    size={'sm'}
                                    text={el}
                                    action={() => {
                                        changeStake(el)
                                    }}
                                />
                            </div>
                        )
                    }
                    <div className={style.key}>
                        <Button
                            type={'green'}
                            size={'sm'}
                            text={'Clear'}
                            action={() => {
                                changeStake(null)
                            }}
                        />
                    </div>
                </div>
            }
            {
                calculate &&
                <CalculatorModal
                    data={data.stake}
                    action={setValue}
                    toggle={setCalculate}
                />
            }
        </div>
    );
}

export default Stake;
