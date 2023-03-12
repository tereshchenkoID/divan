import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {deleteBetslip} from "store/actions/betslipAction";
import {clearActiveBets} from "helpers/clearActiveBets";
import {setUpdate} from "store/actions/updateAction";

import convertTime from "helpers/convertTime";
import checkData from "helpers/checkData";

import MatchTimer from "./MatchTimer";
import StartTimer from "./StartTimer";
import ResultTimer from "./ResultTimer";

import style from './index.module.scss';

const Timer = ({data}) => {
    const dispatch = useDispatch()
    const {betslip} = useSelector((state) => state.betslip)
    const {live} = useSelector((state) => state.live)
    const {update} = useSelector((state) => state.update)
    const {delta} = useSelector((state) => state.delta)

    useEffect(() => {
    }, [delta]);

    useEffect(() => {
        if (live === 2 || live === 3) {
            dispatch(setUpdate(data.id))
        }

        if (live === 2) {
            let a = clearActiveBets(betslip, data.id)
            if (a) {
                dispatch(deleteBetslip(a))
            }
        }

    }, [live]);

    return (
        <div className={style.block}>
            {
                live &&
                <>
                    <div className={style.top}>
                        {
                            live === 1 &&
                            <StartTimer
                                start={data.start}
                                delta={delta}
                                id={data.id}
                            />
                        }
                        {
                            live === 2 && 'Live'
                        }
                    </div>
                    <div className={style.bottom}>
                        {
                            live === 1 && <div>{convertTime(data.start, delta)}</div>
                        }
                        {
                            live === 2 &&
                            !checkData(update) &&
                            <MatchTimer
                                start={update.event.start}
                                end={update.event.nextUpdate}
                                delta={delta}
                            />
                        }
                        {
                            live === 3 &&
                            !checkData(update) &&
                            <ResultTimer
                                end={update.event.nextUpdate}
                                delta={delta}
                            />
                        }
                    </div>
                </>
            }
        </div>
    );
}

export default Timer;
