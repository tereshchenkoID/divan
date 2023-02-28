import {useRef, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {deleteBetslip} from "store/actions/betslipAction";

import Icon from "components/Icon";

import style from './index.module.scss';

const findBet = (data, id) => {
    return data.find(el => {
        return el.id === id
    })
}

const Bet = ({data, betslip}) => {
    const dispatch = useDispatch()
    const {settings} = useSelector((state) => state.settings)
    const [edit, setEdit] = useState(false)

    const buttonRef = useRef(null)
    const blockRef = useRef(null)

    const removeBet = () => {
        const a = betslip.slice(0);

        a.splice(a.indexOf(findBet(a, data.id)), 1)

        dispatch(deleteBetslip(a))
    }

    const updateBet = (stake) => {
        const a = betslip.slice(0);

        if (stake)
            findBet(a, data.id).stake += stake
        else
            findBet(a, data.id).stake = 0

        dispatch(deleteBetslip(a))
    }

    const changeBet = (stake) => {
        const a = betslip.slice(0);

        findBet(a, data.id).stake = stake

        dispatch(deleteBetslip(a))
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
            className={style.block}
            ref={blockRef}
        >
            <div className={style.bet}>
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
                <div>
                    <input
                        ref={buttonRef}
                        type={"number"}
                        className={style.field}
                        placeholder={'100'}
                        defaultValue={data.stake}
                        value={data.stake}
                        onChange={(e) => {
                            changeBet(parseInt(e.target.value, 10))
                        }}
                        onFocus={() => {
                            setEdit(true)
                        }}
                    />
                </div>
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
                <div
                    className={style.keyboard}
                >
                    {
                        Object.values(settings.f.h).map((el, idx) =>
                            <button
                                key={idx}
                                className={style.key}
                                aria-label={'Key'}
                                onClick={() => {
                                    updateBet(el)
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
                            updateBet(null)
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
