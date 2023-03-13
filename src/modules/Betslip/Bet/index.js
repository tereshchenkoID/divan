import {useRef, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import classNames from "classnames";

import {deleteBetslip} from "store/actions/betslipAction";
import {setStake} from "store/actions/stakeAction";

import Icon from "components/Icon";

import style from './index.module.scss';
import {getIcon} from "../../../helpers/getIcon";


const findBet = (data, id) => {
    return data.find(el => {
        return el.id === id
    })
}

const Bet = ({data, betslip, type, setInit, setDisabled}) => {
    const dispatch = useDispatch()
    const {settings} = useSelector((state) => state.settings)
    const [edit, setEdit] = useState(false)

    const buttonRef = useRef(null)
    const blockRef = useRef(null)

    const removeBet = () => {
        const a = betslip.slice(0);

        a.splice(a.indexOf(findBet(a, data.id)), 1)

        if (betslip.length === 1) {
            setInit(false)
            setDisabled(true)
            dispatch(setStake([]))
        }
        dispatch(deleteBetslip(a))
    }

    const updateBet = (val) => {
        let r
        const regex = /[^0-9.]|(?<=\..*)\./g
        const a = betslip.slice(0);
        const f = findBet(a, data.id)

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

            f.stake = r

            dispatch(deleteBetslip(a))
            setInit(true)
            // setLoad(true)
        }
    }

    const changeBet = (val) => {
        const a = betslip.slice(0)
        const f = (data.type === 0) ? a[0] : findBet(a, data.id)
        let v

        if (val) {
            if (f.stake.toString().indexOf('.') !== -1) {
                const a = f.stake.split('.')
                a[0] = parseInt(a[0]) + val
                a[1] = a[1] === '' ? 0 : a[1]
                v = a.join('.')
            }
            else {
                v = f.stake + parseInt(val, 10)
            }
        }
        else {
            v = 0
        }

        f.stake = v
        dispatch(deleteBetslip(a))
        setInit(true)
        // setLoad(true)
    }

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

    return (
        <div
            className={
                classNames(
                    style.block,
                    type === 0 ? style.lg : style.sm
                )
            }
            ref={blockRef}
        >
            <div className={style.bet}>
                <div>
                    <div className={style.icon}>
                        <Icon id={getIcon(data.type)} />
                    </div>
                </div>
                <div>
                    <div className={style.meta}>
                        {data.pos}
                        .
                        {data.teams.home.name}
                        -
                        {data.teams.away.name}
                    </div>
                </div>
                <div className={style.market}>
                    {data.market.replaceAll('_', ' ')}
                    :
                    {data.c || data.a}
                </div>
                <div className={style.odd}>{data.b}</div>
                {
                    type === 0 &&
                    <div>
                        <input
                            ref={buttonRef}
                            type={"text"}
                            className={style.field}
                            placeholder={'100'}
                            value={data.stake}
                            onChange={(e) => {
                                updateBet(e.target.value || 0)
                            }}
                            onFocus={() => {
                                setEdit(true)
                            }}
                        />
                    </div>
                }
                <div>
                    <button
                        aria-label={'Close'}
                        className={style.close}
                        onClick={() => {
                            removeBet()
                        }}
                    >
                        <Icon id={'close'} />
                    </button>
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
                                    changeBet(el)
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
                            changeBet(null)
                        }}
                    >
                        Clear
                    </button>
                </div>
            }
        </div>
    );
}

export default Bet;
