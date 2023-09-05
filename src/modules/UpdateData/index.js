import {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import useSocket from "hooks/useSocket";

import {matchStatus} from "constant/config";

import {setUpdate} from "store/actions/updateAction";
import {setData} from "store/actions/dataAction";
import {setLive} from "store/actions/liveAction";

import {checkCmd} from "helpers/checkCmd";
import {getDifferent} from "helpers/getDifferent";

const UpdateData = ({find, setActive, setFind}) => {
    const dispatch = useDispatch()
    const { sendMessage } = useSocket()

    const {delta} = useSelector((state) => state.delta)
    const {game} = useSelector((state) => state.game)
    const {isConnected, receivedMessage} = useSelector((state) => state.socket)
    let a = useRef()

    useEffect(() => {
        if (isConnected) {
            sendMessage({cmd:`feed/${sessionStorage.getItem('authToken')}/EVENT/${find.id}`})
        }
    }, [])

    useEffect(() => {
        if (!isConnected) {
            a.current = setInterval(() => {
                const t = getDifferent(find.nextUpdate, delta)

                console.log(t)

                if (t === '0') {

                    if (find.status === matchStatus.COMPLETE || find.status === matchStatus.RESULTS) {
                        dispatch(setData(game, null)).then((json) => {
                            setFind(null)
                            dispatch(setLive(1))
                            setActive(json.events[0])
                        })
                    }
                    else {
                        dispatch(setUpdate(find.id)).then((json) => {
                            setFind(json.event)
                        })
                    }

                    clearInterval(a.current)
                }
            }, 1000)
        }

        return () => {
            clearInterval(a.current);
        }
    }, [find])

    useEffect(() => {

        if (receivedMessage !== '' && checkCmd('event', receivedMessage.cmd)) {
            clearInterval(a.current)

            dispatch(setUpdate(null, receivedMessage))

            // console.log(find)

            a.current = setInterval(() => {
                const t = getDifferent(receivedMessage.event.nextUpdate, delta)

                console.log(t)

                if (t === '0') {

                    if (receivedMessage.event.status === matchStatus.COMPLETE || receivedMessage.event.status === matchStatus.RESULTS) {
                        sendMessage({cmd:`feed/${sessionStorage.getItem('authToken')}/${game.type}/${game.id}`})

                        // console.log("FEED")
                    }
                    else {
                        sendMessage({cmd:`feed/${sessionStorage.getItem('authToken')}/EVENT/${find.id}`})

                        // console.log("EVENT")
                    }

                    clearInterval(a.current)
                }
            }, 1000)
        }
    }, [receivedMessage])
}

export default UpdateData;
