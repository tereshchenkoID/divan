import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {setUpdate} from "store/actions/updateAction";
import {setData} from "store/actions/dataAction";

import {matchStatus} from "constant/config";

import announcementTimer from './announcementTimer'
import resultTimer from "./resultsTimer";
import progressTimer from "./progressTimer";
import {setLive} from "../../../store/actions/liveAction";

const Update = ({find, setActive, setWeek}) => {
    const dispatch = useDispatch()
    const {delta} = useSelector((state) => state.delta)
    const {game} = useSelector((state) => state.game)
    const {data} = useSelector((state) => state.data)

    const [count, setCount] = useState(null)

    useEffect(() => {
        let a, b, c

        if (data) {
            if (find.status === matchStatus.ANNOUNCEMENT) {
                if (count === null) {
                    setCount(0)
                    a = setInterval(() => {
                        if (announcementTimer(find.start, delta) === '0') {
                            console.log("END ANNOUNCEMENT")

                            dispatch(setUpdate(find.id)).then((json) => {
                                b = setInterval(() => {
                                    if (progressTimer(json.event.nextUpdate, delta) === '0') {
                                        console.log("END PROGRESS")

                                        dispatch(setUpdate(find.id)).then((json) => {
                                            c = setInterval(() => {

                                                if (resultTimer(json.event.nextUpdate, delta) === '0') {
                                                    console.log("END RESULTS")

                                                    dispatch(setData(game)).then(() => {
                                                        setActive(0)
                                                        setCount(null)
                                                    })
                                                    clearInterval(c)
                                                }
                                                else {
                                                    console.log(resultTimer(json.event.nextUpdate, delta))
                                                }
                                            }, 1000)
                                        })

                                        clearInterval(b)
                                    }
                                    else {
                                        console.log(progressTimer(json.event.nextUpdate, delta))
                                    }
                                },1000)
                            })

                            clearInterval(a)
                        }
                        else {
                            console.log(announcementTimer(find.start, delta))
                        }
                    }, 1000)
                }
            }
            else if (find.status === matchStatus.PROGRESS) {
                if (count === null) {
                    setCount(0)
                    a = setInterval(() => {

                        if (progressTimer(find.nextUpdate, delta) === '0') {
                            dispatch(setUpdate(find.id)).then((json) => {

                                b = setInterval(() => {
                                    if (resultTimer(json.event.nextUpdate, delta) === '0') {
                                        dispatch(setData(game)).then((json) => {
                                            setActive(0)
                                            setWeek(json.events[0].league.week)
                                            setCount(null)
                                            dispatch(setLive(1))
                                        })
                                        clearInterval(b)
                                    }
                                    else {
                                        console.log(resultTimer(json.event.nextUpdate, delta))
                                    }
                                },1000)
                            })
                            clearInterval(a)
                        }
                        else {
                            console.log(progressTimer(find.nextUpdate, delta))
                        }
                    },1000)
                }
                else {
                    clearInterval(a)
                    clearInterval(b)
                }
            }
            else if (find.status === matchStatus.RESULTS) {
                if (count === null) {
                    setCount(0)
                    a = setInterval(() => {

                        if (resultTimer(find.nextUpdate, delta) === '0') {
                            dispatch(setData(game)).then((json) => {
                                setWeek(json.events[0].league.week)
                                setActive(0)
                                setCount(null)
                                dispatch(setLive(1))
                            })
                            clearInterval(a)
                        }
                        else {
                            console.log(resultTimer(find.nextUpdate, delta))
                        }
                    }, 1000)
                }
                else {
                    clearInterval(a)
                }
            }
        }

        return () => {
            clearInterval(a);
            clearInterval(b);
            setCount(null)
        }
    }, [game, data, find]);
}

export default Update;
