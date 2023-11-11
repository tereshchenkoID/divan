import {matchStatus} from "constant/config";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {setProgress} from "store/LIVE/actions/progressAction";
import {setModal} from "store/actions/modalAction";
import {setTv} from "store/LIVE/actions/tvAction";

import {getDifferent} from "helpers/getDifferent";

const StartTimer = ({start, delta, type}) => {
    const dispatch = useDispatch()
    const [timer, setTimer] = useState('')
    const {game} = useSelector((state) => state.game)

    useEffect(() => {
        setTimer(getDifferent(start, delta))
    }, [start, delta])

    useEffect(() => {
        const a = setInterval(() => {
            let r = getDifferent(start, delta)
            const diff = (start - (new Date().getTime() + delta)) / 1000
            
            setTimer(r)
            
            if (diff < 4 && diff > 1) {
                dispatch(setModal(1))
            }
            
            if (r === '0') {
                dispatch(setTv(`${type}/${game.id}`)).then((json) => {
                    console.log(json.event.status)

                    if (json.event.status === matchStatus.PROGRESS) {
                        // console.log("Start 1")
                        dispatch(setProgress(2))
                        dispatch(setModal(0))
                        clearInterval(a)
                    }
                })
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
