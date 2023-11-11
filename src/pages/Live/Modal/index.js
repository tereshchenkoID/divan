import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

import style from './index.module.scss';

const useCountdown = (onDone, initialSeconds) => {
    const [seconds, setSeconds] = useState(initialSeconds);
    const [timeout, _setTimeout] = useState();
    const [render, rerender] = useState();
    
    const countDown = () => {
        setSeconds((prev) => prev - 1);
    };
    
    const runTimer = () => {
        if (seconds === 0) return onDone();
        const timer = setTimeout(() => {
            countDown();
        }, 1000);
        _setTimeout(timer);
    };
    
    const reset = () => {
        setSeconds(initialSeconds);
        clearTimeout(timeout);
        rerender({});
    };
    
    useEffect(() => {
        runTimer();
    }, [seconds, render]);
    
    return { seconds, reset };
};

const Modal = () => {
    const {tv} =  useSelector((state) => state.tv)
    
    const { seconds } = useCountdown(() => {}, 3);
    
    return (
        <div className={style.block}>
            <div className={style.decor}>
                <img
                    src={`/img/decor/LIVE/TIMER/light.png`}
                    alt="Decor"
                />
            </div>
            <div className={style.title}>Bets close in</div>
            <div className={style.timer}>
                <img
                    src={`/img/decor/LIVE/TIMER/circle.png`}
                    alt="Decor"
                />
                <span>{seconds}</span>
            </div>
            <div className={style.subtitle}>Place your bets</div>
            <div className={style.id}>#{tv.event.id}</div>
        </div>
    );
}

export default Modal;
