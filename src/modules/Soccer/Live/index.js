import {useEffect, useState, Fragment} from "react";
import {useSelector} from "react-redux";

import classNames from "classnames";

import checkData from "helpers/checkData";
import fetchData from "helpers/api";

import Item from "./Item";

import style from './index.module.scss';

const TYPES = [
    {
        name: "Main",
        markets: [
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
            }
        ]
    },
    {
        name: "Exact Goals",
        markets: [
            {
                name: "TOTAL GOALS",
                value: "GOALS"
            }
        ]
    },
    {
        name: "Score",
        markets: [
            {
                name: "CORRECT SCORE",
                value: "SCORE"
            }
        ]
    }
]

const Live = () => {
    const [loading, setLoading] = useState(true)
    const {update} = useSelector((state) => state.update)
    const {liveTimer} = useSelector((state) => state.liveTimer)

    // const [update, setUpdate] = useState({})

    useEffect(() => {
        !checkData(update) && setLoading(false)
    }, [update, liveTimer]);

    // useEffect(() => {
    //     fetchData('https://view.divan.bet/client/getFeed/football/?eventId=926415277').then((json) => {
    //         setUpdate(json)
    //         setLoading(false)
    //     })
    // }, []);

    return (
        <div className={style.block}>
            <div className={style.head}>
                <div className={style.cell} />
                <div className={style.cell} />
                <div className={style.cell}>
                    <div className={style.odds}>
                        {
                            TYPES.map((el_t, idx_t) =>
                                <Fragment
                                    key={idx_t}
                                >
                                    {
                                        el_t.markets.map((el_m, idx_m) =>
                                            <div
                                                key={idx_m}
                                                className={style.column}
                                            >
                                                <div className={style.label}>{el_m.name}</div>
                                            </div>
                                        )
                                    }
                                </Fragment>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className={style.wrapper}>
                {
                    !loading &&
                    update.event.league.matches.map((el, idx) =>
                        <Item
                            key={idx}
                            data={el}
                            timer={liveTimer}
                            types={TYPES}
                        />
                    )
                }
            </div>
        </div>
    );
}

export default Live;
