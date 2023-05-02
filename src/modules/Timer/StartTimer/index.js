import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";

import {setLive} from "store/actions/liveAction";
import {setModal} from "store/actions/modalAction";

const getDifferent = (data, delta) => {
    const c = new Date().getTime() + delta
    let r = 0, result = '0'

    if (data > c) {
        r = new Date(data - c)
        result = `${('0' + r.getMinutes()).slice(-2)}:${('0' + r.getSeconds()).slice(-2)}`
    }

    return result
}

const StartTimer = ({start, delta}) => {
    const dispatch = useDispatch()
    const [timer, setTimer] = useState('')

    useEffect(() => {
        setTimer(getDifferent(start, delta))
    }, [start, delta])

    useEffect(() => {
        const a = setInterval(() => {
            let r = getDifferent(start, delta)
            setTimer(r)

            if (r === '0') {
                dispatch(setLive(2))
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
    }, [start, delta]);

    return timer;
}

export default StartTimer;
