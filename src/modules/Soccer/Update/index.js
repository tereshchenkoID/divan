import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {setUpdate} from "store/actions/updateAction";
import {setData} from "store/actions/dataAction";

import resultTimer from "./resultsTimer";
import progressTimer from "./progressTimer";

const Update = ({find, setActive}) => {
    const dispatch = useDispatch()
    const {delta} = useSelector((state) => state.delta)
    const {game} = useSelector((state) => state.game)
    const {data} = useSelector((state) => state.data)

    const [count, setCount] = useState(null)

    useEffect(() => {
        let a
        let b

        if (find && data) {
            if (find.status === "PROGRESS") {
                if (count === null) {
                    setCount(0)
                    a = setInterval(() => {

                        if (progressTimer(find.nextUpdate, delta) === '0') {
                            dispatch(setUpdate(find.id)).then((json) => {

                                b = setInterval(() => {
                                    if (resultTimer(json.event.nextUpdate, delta) === '0') {
                                        dispatch(setData(game)).then(() => {
                                            setActive(0)
                                            setCount(null)
                                        })
                                        clearInterval(b)
                                    }
                                    else {
                                        // console.log(resultTimer(json.event.nextUpdate, delta))
                                    }
                                },1000)
                            })
                            clearInterval(a)
                        }
                        else {
                            // console.log(progressTimer(find.nextUpdate, delta))
                        }
                    },1000)
                }
                else {
                    clearInterval(a)
                    clearInterval(b)
                }
            }
            else if (find.status === "RESULTS") {
                if (count === null) {
                    setCount(0)
                    a = setInterval(() => {

                        if (resultTimer(find.nextUpdate, delta) === '0') {
                            dispatch(setData(game)).then(() => {
                                setActive(0)
                                setCount(null)
                            })
                            clearInterval(a)
                        }
                        else {
                            // console.log(resultTimer(find.nextUpdate, delta))
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
