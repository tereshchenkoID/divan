import {useEffect, useState} from "react";
import convertTime from "helpers/convertTime";

import style from './index.module.scss';

const getDifferent = (data) => {
    const date = new Date(data);
    return ('0' + date.getMinutes()).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2);
}

const Timer = ({start, next}) => {
    const [timer, setTimer] = useState()

    useEffect(() => {
        const a = setInterval(()=>{
            setTimer(getDifferent((start - new Date().getTime())))
        },1000)

        return () => {
            clearInterval(a);
        }
    }, [start, next]);

    return (
        <div className={style.block}>
            <div className={style.top}>
                {timer}
            </div>
            <div className={style.bottom}>
                <div>{convertTime(start)}</div>
            </div>
        </div>
    );
}

export default Timer;
