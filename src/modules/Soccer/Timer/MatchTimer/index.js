import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";

import {setLive} from "store/actions/liveAction";

const MAX = '90'

const getDifferent = (start, end) => {
    const c = new Date().getTime(),
          n = new Date(end).getTime()
    let r = 0,
        result = '0'

    if (n > c) {
        r = new Date(n - c)
        result = MAX - (r.getSeconds() + (r.getMinutes() * 60))
    }

    return result
}

const MatchTimer = ({start, end}) => {
    const dispatch = useDispatch()
    const [timer, setTimer] = useState('')

    useEffect(() => {
        const a = setInterval(() => {
            let r = getDifferent(start, end)
            setTimer(`${r}'`)

            if (r === '0') {
                dispatch(setLive(2))
                clearInterval(a)
            }
        },1000)

        return () => {
            setTimer('')
            clearInterval(a);
        }
    }, [start]);

    return timer
}

export default MatchTimer;
