import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";

import {setLive} from "store/actions/liveAction";

const getDifferent = (data, delta) => {
    const c = new Date().getTime() + delta
    let r = 0, result = '0'

    if (data > c) {
        r = new Date(data - c)
        result = `${('0' + r.getMinutes()).slice(-2)}:${('0' + r.getSeconds()).slice(-2)}`
    }

    return result
}

const ResultTimer = ({end, delta}) => {
    const dispatch = useDispatch()
    const [timer, setTimer] = useState('')

    useEffect(() => {
        // console.log("Results")

        const a = setInterval(() => {
            // console.log('Results', delta)
            let r = getDifferent(end, delta)
            setTimer(r)
            if (r === '0') {
                dispatch(setLive(4))
                clearInterval(a)
            }
        },1000)

        return () => {
            setTimer('')
            clearInterval(a);
        }
    }, [end, delta]);

    return (
        <>
            <div>{timer}</div>
            <div>Results</div>
        </>
    );
}

export default ResultTimer;
