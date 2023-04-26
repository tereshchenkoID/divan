import {useSelector} from "react-redux";
import {useState, useEffect} from "react";

import {getData} from "helpers/api";
import checkData from "helpers/checkData";

import Banner from "./Banner";

import style from './index.module.scss';

const getDifferent = (data, delta) => {
    const c = new Date().getTime() + delta
    let r = 0, result = '0'

    if (data > c) {
        r = new Date(data - c)
        const seconds = Math.floor(r / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        result = `${hours.toString().padStart(2, '0')}:${(minutes % 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
    }

    return result
}

const JackPot = () => {
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const [timer, setTimer] = useState('')
    const {delta} = useSelector((state) => state.delta)

    useEffect(() => {
        getData(`/jackpots`).then((json) => {
            if (!checkData(json)) {
                setData(json)
                setLoading(false)
            }
        })
    }, []);

    useEffect(() => {
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
    }, [data, delta]);

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
