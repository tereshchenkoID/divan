import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";

import {gameType} from "constant/config";

import {setLive} from "store/actions/liveAction";
import {setLiveTimer} from "store/actions/liveTimerAction";

const getDifferentPeriod = (start, end, delta) => {
    const MAX = 90
    const c = new Date().getTime() + delta

    let r = 0,
        result = '0'

    if (end > c) {
        r = new Date(end - c)
        result = MAX - (r.getSeconds() + (r.getMinutes() * 60))
    }

    return result
}

const getDifferentGame = (end, delta) => {
    const c = new Date().getTime() + delta
    let r = 0, result = '0'

    if (end > c) {
        r = new Date(end - c)
        result = `${('0' + r.getMinutes()).slice(-2)}:${('0' + r.getSeconds()).slice(-2)}`
    }

    return result
}

const checkType = (start, end, delta, type) => {
    if (type === gameType.FOOTBALL_LEAGUE) {
        return getDifferentPeriod(start, end, delta)
    }
    else {
        return getDifferentGame(end, delta)
    }
}

const MatchTimer = ({start, end, delta, type}) => {
    const dispatch = useDispatch()
    const [timer, setTimer] = useState('')

    useEffect(() => {
        let r = checkType(start, end, delta, type)
        type === gameType.FOOTBALL_LEAGUE && dispatch(setLiveTimer(r))
        setTimer(`${r}'`)
    }, [start, delta])

    useEffect(() => {
        const a = setInterval(() => {
            let r = checkType(start, end, delta, type)
            type === gameType.FOOTBALL_LEAGUE && dispatch(setLiveTimer(r))
            setTimer(`${r}'`)

            if (r === '0') {
                dispatch(setLive(3))
                clearInterval(a)
            }
        },1000)

        return () => {
            setTimer('')
            dispatch(setLiveTimer('0'))
            clearInterval(a);
        }
    }, [start, delta]);

    return timer
}

export default MatchTimer;
