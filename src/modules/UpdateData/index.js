import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {setUpdate} from "store/actions/updateAction";
import {setData} from "store/actions/dataAction";
import {setLive} from "store/actions/liveAction";

import {matchStatus} from "constant/config";

import announcementTimer from './announcementTimer'
import resultTimer from "./resultsTimer";
import progressTimer from "./progressTimer";

const UpdateData = ({find, active, setActive, setFind, setRepeat}) => {
    const dispatch = useDispatch()
    const {delta} = useSelector((state) => state.delta)
    const {game} = useSelector((state) => state.game)

    const updateGame = () => {
        let a

        dispatch(setData(game)).then((json) => {
            if (json.events[0].status === matchStatus.ANNOUNCEMENT) {
                setFind(null)
                dispatch(setLive(1))
                setActive(json.events[0])
                setRepeat(1)

                clearInterval(a)
                return true
            }
        })

        a = setTimeout(() => {
            updateGame()
        }, 2000)
    }

    useEffect(() => {
        let a, b, c
        if (find.status === matchStatus.ANNOUNCEMENT) {
            a = setInterval(() => {
                const at = announcementTimer(find.start, delta)

                console.log(at)

                if (at === '0') {

                    dispatch(setUpdate(find.id)).then((json) => {
                        b = setInterval(() => {
                            const pt = progressTimer(json.event.nextUpdate, delta)

                            console.log(pt)

                            if (pt === '0') {

                                dispatch(setUpdate(find.id)).then((json) => {
                                    c = setInterval(() => {
                                        const rt = resultTimer(json.event.nextUpdate, delta)

                                        console.log(rt)

                                        if (rt === '0') {
                                            updateGame()
                                            clearInterval(c)
                                        }
                                    }, 1000)
                                })

                                clearInterval(b)
                            }
                        },1000)
                    })

                    clearInterval(a)
                }
            }, 1000)
        }
        else if (find.status === matchStatus.PROGRESS) {
            a = setInterval(() => {
                const pt = progressTimer(find.nextUpdate, delta)

                console.log(pt)

                if (pt === '0') {
                    dispatch(setUpdate(find.id)).then((json) => {

                        b = setInterval(() => {
                            const rt = resultTimer(json.event.nextUpdate, delta)

                            console.log(rt)

                            if (rt === '0') {
                                updateGame()
                                clearInterval(b)
                            }
                        },1000)
                    })
                    clearInterval(a)
                }
            },1000)
        }
        else if (find.status === matchStatus.RESULTS) {
            a = setInterval(() => {
                const rt = resultTimer(find.nextUpdate, delta)

                console.log(rt)

                if (rt === '0') {
                    dispatch(setData(game)).then((json) => {
                        updateGame()
                    })
                    clearInterval(a)
                }
            }, 1000)
        }

        return () => {
            clearInterval(a);
            clearInterval(b);
            clearInterval(c);
        }
    }, [active, find]);
}

export default UpdateData;
