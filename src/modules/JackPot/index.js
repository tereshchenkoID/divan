import {useDispatch, useSelector} from "react-redux";
import {useState, useEffect} from "react";

import {sendMessage} from "store/actions/socketAction";

import checkCmd from "helpers/checkCmd";
import {getData} from "helpers/api";
import {getDifferent} from "helpers/getDifferent";
import checkData from "helpers/checkData";

import Banner from "./Banner";

import style from './index.module.scss';

const JackPot = () => {
    const dispatch = useDispatch()
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const [timer, setTimer] = useState('')

    const {delta} = useSelector((state) => state.delta)
    const {socket, receivedMessage} = useSelector((state) => state.socket);

    useEffect(() => {

        if (socket && socket.readyState === WebSocket.OPEN) {
            dispatch(sendMessage({cmd:`account/${sessionStorage.getItem('authToken')}/jackpots`}))
        }
        else {
            getData(`/jackpots`).then((json) => {
                if (!checkData(json)) {
                    setData(json)
                    setLoading(false)
                }
            })
        }
    }, [socket]);

    useEffect(() => {
        if (receivedMessage !== '' && checkCmd('jackpots', receivedMessage.cmd)) {
            setData(receivedMessage)
            setLoading(false)
        }
    }, [receivedMessage])

    useEffect(() => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            const a = setInterval(() => {
                let r = getDifferent(data.nextUpdate, delta)
                setTimer(r)

                if (r === '0') {
                    clearInterval(a)
                    dispatch(sendMessage({cmd: `account/${sessionStorage.getItem('authToken')}/jackpots`}))
                }
            }, 1000)

            return () => {
                setTimer('')
                clearInterval(a);
            }
        }
        else {
            const a = setInterval(() => {
                let r = getDifferent(data.nextUpdate, delta)
                setTimer(r)
                
                if (r === '0') {
                    clearInterval(a)
                    getData(`/jackpots`).then((json) => {
                        setData(json)
                    })
                }
            },1000)

            return () => {
                setTimer('')
                clearInterval(a);
            }
        }
    }, [socket, data])

    return (
        <div className={style.block}>
            {
                !loading &&
                <>
                    {
                        data &&
                        data.jackpots.map((el, idx) =>
                            <div
                                key={idx}
                                className={style.banner}
                            >
                                <Banner
                                    data={el}
                                    timer={timer}
                                />
                            </div>
                        )
                    }
                </>
            }
        </div>
    );
}

export default JackPot;
