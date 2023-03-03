import {useSelector} from "react-redux";
import {useEffect, useState} from "react";

import style from './index.module.scss';

const getTime = (delta) => {
    const current = new Date().getTime() + delta, date = new Date(current)

    return ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2);
}
const Clock = () => {
    const {delta} = useSelector((state) => state.delta)
    const [dateNow, setDate] = useState('00:00:00')

    useEffect(() => {
        setInterval(()=>{
            setDate(getTime(delta))
        },1000)

    }, []);

    return (
        <div className={style.block}>
            {dateNow}
        </div>
    );
}

export default Clock;
