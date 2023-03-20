import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {setUpdate} from "store/actions/updateAction";
import {setData} from "store/actions/dataAction";
import {deleteBetslip} from "store/actions/betslipAction";

import {clearActiveBets} from "helpers/clearActiveBets";

import {matchStatus} from "constant/config";

import announcementTimer from './announcementTimer'
import resultTimer from "./resultsTimer";
import progressTimer from "./progressTimer";

import {setLive} from "store/actions/liveAction";

const Update = ({find, setActive, setWeek, betslip}) => {
    const dispatch = useDispatch()
    const {delta} = useSelector((state) => state.delta)
    const {game} = useSelector((state) => state.game)
    const {data} = useSelector((state) => state.data)

    const [at, setAt] = useState()

    const [count, setCount] = useState(null)

    useEffect(() => {
        if (at === '0' || at === '00:05') {
            let bets = clearActiveBets(betslip, find.id)
            if (bets) {
                dispatch(deleteBetslip(bets))
            }
        }
    }, [betslip])


    useEffect(() => {
        let a, b, c

        if (data) {
            if (find.status === matchStatus.ANNOUNCEMENT) {

                if (count === null) {
                    setCount(0)
                    a = setInterval(() => {
                        const at = announcementTimer(find.start, delta)

                        if (at === '0') {
                            console.log("END ANNOUNCEMENT")

                            dispatch(setUpdate(find.id)).then((json) => {
                                b = setInterval(() => {
                                    const pt = progressTimer(json.event.nextUpdate, delta)

                                    if (pt === '0') {
                                        console.log("END PROGRESS")

                                        dispatch(setUpdate(find.id)).then((json) => {
                                            c = setInterval(() => {
                                                const rt = resultTimer(json.event.nextUpdate, delta)

                                                if (rt === '0') {
                                                    console.log("END RESULTS")

                                                    dispatch(setData(game)).then((json) => {
                                                        setWeek(json.events[0].league.week)
                                                        setActive(0)
                                                        setCount(null)
                                                        dispatch(setLive(1))
                                                    })
                                                    clearInterval(c)
                                                }
                                                else {
                                                    console.log(rt)
                                                }
                                            }, 1000)
                                        })

                                        clearInterval(b)
                                    }
                                    else {
                                        console.log(pt)
                                    }
                                },1000)
                            })

                            clearInterval(a)
                        }
                        else {
                            console.log(at)
                        }
                    }, 1000)
                }
            }
            else if (find.status === matchStatus.PROGRESS) {
                if (count === null) {
                    setCount(0)
                    a = setInterval(() => {
                        const pt = progressTimer(find.nextUpdate, delta)

                        if (pt === '0') {
                            dispatch(setUpdate(find.id)).then((json) => {

                                b = setInterval(() => {
                                    const rt = resultTimer(json.event.nextUpdate, delta)

                                    if (rt === '0') {
                                        dispatch(setData(game)).then((json) => {
                                            setWeek(json.events[0].league.week)
                                            setActive(0)
                                            setCount(null)
                                            dispatch(setLive(1))
                                        })
                                        clearInterval(b)
                                    }
                                    else {
                                        console.log(rt)
                                    }
                                },1000)
                            })
                            clearInterval(a)
                        }
                        else {
                            console.log(pt)
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
                        const rt = resultTimer(find.nextUpdate, delta)

                        if (rt === '0') {
                            dispatch(setData(game)).then((json) => {
                                setWeek(json.events[0].league.week)
                                setActive(0)
                                setCount(null)
                                dispatch(setLive(1))
                            })
                            clearInterval(a)
                        }
                        else {
                            console.log(rt)
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
