import {gameType, matchStatus} from "constant/config";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import useSocket from "hooks/useSocket";

import {setLive} from "store/actions/liveAction";
import {setLiveTimer} from "store/actions/liveTimerAction";
import {setUpdate} from "store/actions/updateAction";

import {getDifferent} from "helpers/getDifferent";

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

const checkType = (start, end, delta, type) => {
    if (type === gameType.FOOTBALL_LEAGUE) {
        return getDifferentPeriod(start, end, delta)
    }
    else {
        return getDifferent(end, delta)
    }
}

const MatchTimer = ({data, delta, type}) => {
    const dispatch = useDispatch()
    const { sendMessage } = useSocket()
    const {isConnected} = useSelector((state) => state.socket)
    const [timer, setTimer] = useState('')

    useEffect(() => {
        let r = checkType(data.event.start, data.event.nextUpdate, delta, type)
        type === gameType.FOOTBALL_LEAGUE && dispatch(setLiveTimer(r))
        setTimer(r)
    }, [data.event.start, delta])

    useEffect(() => {
        const a = setInterval(() => {
            let r = checkType(data.event.start, data.event.nextUpdate, delta, type)

            if (r === '0') {
                if (isConnected) {
                    sendMessage({cmd:`feed/${sessionStorage.getItem('authToken')}/EVENT/${data.id}`})
                }
                else {
                    dispatch(setUpdate(data.event.id, null)).then((json) => {
                        if (json.event.status === matchStatus.COMPLETED || json.event.status === matchStatus.RESULTS) {
                            dispatch(setLive(3))
                            clearInterval(a)
                        }
                    })
                }
            }
            else {
                type === gameType.FOOTBALL_LEAGUE && dispatch(setLiveTimer(r))
                setTimer(r)
            }
        },1000)

        return () => {
            setTimer('')
            dispatch(setLiveTimer('0'))
            clearInterval(a);
        }
    }, [data.event.start, delta]);

    return <div>{timer === '0' ? '00:00' : timer}</div>
}

export default MatchTimer;
