import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";

import {setLive} from "store/actions/liveAction";
import {setModal} from "store/actions/modalAction";

const getDifferent = (data) => {
    const c = new Date().getTime(),
        n = new Date(data).getTime()
    let r = 0,
        result = '0'

    if (n > c) {
        r = new Date(n - c)
        result = `${('0' + r.getMinutes()).slice(-2)}:${('0' + r.getSeconds()).slice(-2)}`
    }

    return result
}

const StartTimer = ({start}) => {
    const dispatch = useDispatch()
    const [timer, setTimer] = useState('')

    useEffect(() => {
        const a = setInterval(() => {
            let r = getDifferent(start)
            setTimer(r)
            if (r === '0') {
                dispatch(setLive(1))
                clearInterval(a)
            }

            if (r === '00:05') {
                dispatch(setModal(1))
            }
        },1000)

        return () => {
            setTimer('')
            clearInterval(a);
        }
    }, [start]);

    return timer;
}

export default StartTimer;
