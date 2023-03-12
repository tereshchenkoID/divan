import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {clearActiveBets} from "helpers/clearActiveBets";

import {setLive} from "store/actions/liveAction";
import {setModal} from "store/actions/modalAction";
import {deleteBetslip} from "store/actions/betslipAction";

const getDifferent = (data, delta) => {
    const c = new Date().getTime() + delta
    let r = 0, result = '0'

    if (data > c) {
        r = new Date(data - c)
        result = `${('0' + r.getMinutes()).slice(-2)}:${('0' + r.getSeconds()).slice(-2)}`
    }

    return result
}

const StartTimer = ({start, delta, id}) => {
    const dispatch = useDispatch()
    const {betslip} = useSelector((state) => state.betslip)
    const [timer, setTimer] = useState('')

    useEffect(() => {
        // console.log('Start')

        const a = setInterval(() => {
            // console.log('Start', delta)
            let r = getDifferent(start, delta)
            setTimer(r)
            if (r === '0') {
                dispatch(setLive(2))
                clearInterval(a)
            }

            if (r === '00:05') {
                let a = clearActiveBets(betslip, id)
                if (a) {
                    dispatch(deleteBetslip(a))
                }
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
