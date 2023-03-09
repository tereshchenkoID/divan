import {useRef, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {setStake} from "store/actions/stakeAction";

import {useMinMaxOdd} from "../useMinMaxOdd";
import {
    getOdds,
    getUniquePermutations,
    getBetMinMaxSystem,
    getCoverBetMaxSingle,
    getBetMaxSingle
} from 'modules/Betslip/useStake'

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

    const updateStake = (val) => {
        const a = stake.slice(0);

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

        dispatch(setStake(a))
    }

    useEffect(() => {

    }, [data])

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
                    <input
                        type={"number"}
                        className={style.field}
                        placeholder={'100'}
                        defaultValue={data.stake.toFixed(2)}
                        onFocus={() => {
                            setEdit(true)
                        }}
                        onChange={(e) => {
                            updateStake(parseInt(e.target.value, 10) || 0)
                        }}
                        ref={buttonRef}
                    />
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
                        }}
                    >
                        Clear
                    </button>
                </div>
            }
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
        </div>
    );
}

export default Stake;
