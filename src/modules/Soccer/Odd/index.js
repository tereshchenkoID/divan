import {useDispatch, useSelector} from "react-redux";

import classNames from "classnames";

import {deleteBetslip, setBetslip} from "store/actions/betslipAction";

import style from './index.module.scss';

const Odd = ({data, label = false}) => {
    const dispatch = useDispatch()
    const {betslip} = useSelector((state) => state.betslip)

    const handleClick = (data) => {
        const a = betslip.slice(0);
        const find = a.find(el => {
            return el.id === data.id
        })

        if (find) {
            a.splice(a.indexOf(find), 1)
            dispatch(deleteBetslip(a))
        }
        else {
            dispatch(setBetslip({
                sid: data.sid,
                mid: data.mid,
                id: data.id,
                a: data.a,
                b: data.b || 1.00,
                pos: data.pos,
                market: data.market || "OVER_UNDER",
                c: data.c,
                stake: 0,
                teams: {
                    home: data.home,
                    away: data.away
                }
            }))
        }
    }

    const activeClass = (id) => {
        return betslip.find(el => {
            return el.id === id
        })
    }

    return (
        <div
            className={
                classNames(
                    style.block,
                    label && style.sm,
                    (!data.b || data.b === 1.00) && style.disabled,
                    betslip.length > 0 && activeClass(data.id) && style.active
                )
            }
            onClick={() => {
                handleClick(data)
            }}
        >
            {
                label &&
                <div className={style.label}>{label}</div>
            }
            <div className={style.odd}>{data.b || '1.00'}</div>
        </div>
    );
}

export default Odd;
