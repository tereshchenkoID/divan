import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";

import {setLive} from "store/actions/liveAction";
import {setLiveTimer} from "store/actions/liveTimerAction";

const MAX = 90

const getDifferent = (start, end, delta) => {
    const c = new Date().getTime() + delta

    let r = 0,
        result = '0'

    if (end > c) {
        r = new Date(end - c)
        result = MAX - (r.getSeconds() + (r.getMinutes() * 60))
    }

    return result
}

const MatchTimer = ({start, end, delta}) => {
    const dispatch = useDispatch()
    const [timer, setTimer] = useState('')

    useEffect(() => {
        let r = getDifferent(start, end, delta)
        dispatch(setLiveTimer(r))
        setTimer(`${r}'`)
    }, [start, delta])

    useEffect(() => {
        const a = setInterval(() => {
            let r = getDifferent(start, end, delta)
            dispatch(setLiveTimer(r))
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
