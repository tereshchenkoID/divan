import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {deleteBetslip} from "store/actions/betslipAction";

import fetchData from "helpers/api";
import convertTime from "helpers/convertTime";
import checkData from "helpers/checkData";

import MatchTimer from "./MatchTimer";
import StartTimer from "./StartTimer";
import ResultTimer from "./ResultTimer";

import style from './index.module.scss';

const Timer = ({data}) => {
    const dispatch = useDispatch()
    const {live} = useSelector((state) => state.live)
    const [update, setUpdate] = useState({})

    useEffect(() => {
        if (live === 1 || live === 2) {
            fetchData(`/client/getFeed/football/?eventId=${data.id}`).then((json) => {
                setUpdate(json)
            })
        }

        if (live === 1) {
            dispatch(deleteBetslip([]))
        }
    }, [data, live]);

    return (
        <div className={style.block}>
            <div className={style.top}>
                {
                    live === 1 && 'Live'
                }
                {
                    live === 0 &&
                        <StartTimer
                            start={data.start}
                        />
                }
            </div>
            <div className={style.bottom}>
                {
                    live === 0 && <div>{convertTime(data.start)}</div>
                }
                {
                    live === 1 &&
                    !checkData(update) &&
                        <MatchTimer
                            start={update.event.start}
                            end={update.event.nextUpdate}
                        />
                }
                {
                    live === 2 &&
                    !checkData(update) &&
                        <ResultTimer
                            end={update.event.nextUpdate}
                        />
                }
            </div>
        </div>
    );
}

export default Timer;


// Status:
// PROGRESS
// ANNOUNCEMENT