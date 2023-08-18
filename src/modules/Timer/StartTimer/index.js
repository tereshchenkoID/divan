import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";

import {setLive} from "store/actions/liveAction";
import {setModal} from "store/actions/modalAction";

import {getDifferent} from "helpers/getDifferent";

const StartTimer = ({start, delta}) => {
    const dispatch = useDispatch()
    const [timer, setTimer] = useState('')

    useEffect(() => {
        setTimer(getDifferent(start, delta))
    }, [start, delta])

    useEffect(() => {
        const a = setInterval(() => {
            let r = getDifferent(start, delta)
            const diff = (start - (new Date().getTime() + delta)) / 1000
            setTimer(r)

            if (r === '0') {
                dispatch(setLive(2))
                clearInterval(a)
            }

            if (diff < 6 && diff > 1) {
                dispatch(setModal(1))
            }
        },1000)

        return () => {
            setTimer('')
            clearInterval(a);
        }
    }, [start, delta]);

    return <div>{timer}</div>
}

export default StartTimer;
