import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";

import {deleteBetslip} from "store/actions/betslipAction";

import Icon from "components/Icon";

import style from './index.module.scss';

const getTime = (data, delta) => {
    const current = data ? new Date(data).getTime() : new Date().getTime() + delta, date = new Date(current)
    return ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2);
}

const deleteBets = (data, now) => {
    const a = []

    for(let i = 0; i < data.length; i++) {
        if(getTime(data[i].start) !== now) {
            a.push(data[i])
        }
    }

    return a
}

const clearActiveBets = (data, now) => {
    const f = data.find(el => {
        return getTime(el.start) === now
    })

    return f ? deleteBets(data, now) : null
}


const Clock = () => {
    const dispatch = useDispatch()
    const {delta} = useSelector((state) => state.delta)
    const {betslip} = useSelector((state) => state.betslip)
    const [date, setDate] = useState('00:00:00')

    useEffect(() => {
        setInterval(() => {
            setDate(getTime(null, delta))
        },1000)

    }, [betslip]);

    useEffect(() => {
        if(betslip.length > 0) {
            const a = clearActiveBets(betslip, date)
            if (a) {
                dispatch(deleteBetslip(a))
            }
        }
    }, [betslip, date])

    return (
        <div className={style.block}>
            <div className={style.icon}>
                <Icon id={'clock'} />
            </div>
            <div>{date}</div>
        </div>
    );
}

export default Clock;
