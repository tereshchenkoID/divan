import {useEffect, useState} from "react";

import style from './index.module.scss';

const getTime = () => {
    const date = new Date(),
          hours = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours(),
          minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes(),
          seconds = (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds();

    return {hours, minutes, seconds}
}
const Clock = () => {
    const [dateNow, setDate] = useState(getTime())

    useEffect(() => {
        setInterval(()=>{
            setDate(getTime())
        },1000)

    }, []);

    return (
        <div className={style.block}>
            {`${dateNow.hours}:${dateNow.minutes}:${dateNow.seconds}`}
        </div>
    );
}

export default Clock;
