import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

import checkData from "helpers/checkData";

import Loader from "components/Loader";
import Item from "./Item";

import style from './index.module.scss';

const TYPES = [
    {
        name: "WINNER",
        value: "WINNER"
    },
    {
        name: "DOUBLE CHANCE",
        value: "DOUBLE_CHANCE"
    },
    {
        name: "GOAL/NO GOAL",
        value: "GOAL_NO_GOAL"
    },
    {
        name: "OV/UN 2.5",
        value: "OVER_UNDER"
    },
    {
        name: "TOTAL GOALS",
        value: "GOALS"
    },
    {
        name: "CORRECT SCORE",
        value: "SCORE"
    }
]

const Live = () => {
    const [loading, setLoading] = useState(true)
    const {update} = useSelector((state) => state.update)
    const {liveTimer} = useSelector((state) => state.liveTimer)

    useEffect(() => {
        !checkData(update) && setLoading(false)
    }, [update, liveTimer]);

    return (
        <div className={style.block}>
            <div className={style.head}>
                <div className={style.cell} />
                <div className={style.cell} />
                <div className={style.cell}>
                    <div className={style.odds}>
                        {
                            TYPES.map((el, idx) =>
                                <div
                                    key={idx}
                                    className={style.column}
                                >
                                    <div className={style.label}>{el.name}</div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className={style.wrapper}>
                {
                    loading
                        ?
                            <Loader type={'block'}/>
                        :
                            update.event.league.matches.map((el, idx) =>
                                <Item
                                    key={idx}
                                    data={el}
                                    timer={liveTimer}
                                />
                            )
                }
            </div>
        </div>
    );
}

export default Live;
