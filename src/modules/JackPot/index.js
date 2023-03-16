import {useState, useEffect} from "react";

import {getData} from "helpers/api";

import Banner from "./Banner";

import style from './index.module.scss';

const JackPot = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getData(`/jackpots`).then((json) => {
            setData(json)
            setLoading(false)
        })
    }, []);

    return (
        <div className={style.block}>
            {
                !loading &&
                <>
                    {
                        data.jackpots.map((el, idx) =>
                            <div
                                key={idx}
                                className={style.banner}
                            >
                                <Banner data={el} />
                            </div>
                        )
                    }
                </>
            }
        </div>
    );
}

export default JackPot;
