import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import useSocket from "hooks/useSocket";

import {setLive} from "store/actions/liveAction";
import {setModal} from "store/actions/modalAction";
import {setData} from "store/actions/dataAction";

import {getDifferent} from "helpers/getDifferent";

const StartTimer = ({start, delta}) => {
    const { sendMessage } = useSocket()
    const dispatch = useDispatch()
    const {game} = useSelector((state) => state.game)
    const {isConnected} = useSelector((state) => state.socket);
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

                if (isConnected) {
                    sendMessage({cmd:`feed/${sessionStorage.getItem('authToken')}/${game.type}/${game.id}`})
                }
                else {
                    dispatch(setData(game))
                }
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
