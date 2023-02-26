import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";

import {setLive} from "store/actions/liveAction";

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

const ResultTimer = ({end}) => {
    const dispatch = useDispatch()
    const [timer, setTimer] = useState('')

    useEffect(() => {
        const a = setInterval(() => {
            let r = getDifferent(end)
            setTimer(r)
            if (r === '0') {
                dispatch(setLive(3))
                clearInterval(a)
            }
        },1000)

        return () => {
            setTimer('')
            clearInterval(a);
        }
    }, [end]);

    return (
        <>
            <div>{timer}</div>
            <div>Results</div>
        </>
    );
}

export default ResultTimer;
