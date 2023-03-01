import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {deleteBetslip} from "store/actions/betslipAction";
import {setUpdate} from "store/actions/updateAction";

import convertTime from "helpers/convertTime";
import checkData from "helpers/checkData";

import MatchTimer from "./MatchTimer";
import StartTimer from "./StartTimer";
import ResultTimer from "./ResultTimer";

import style from './index.module.scss';

const Timer = ({data}) => {
    const dispatch = useDispatch()
    const {live} = useSelector((state) => state.live)
    const {update} = useSelector((state) => state.update)

    useEffect(() => {
        if (live === 2 || live === 3) {
            dispatch(setUpdate(data.id))
        }

        if (live === 2) {
            dispatch(deleteBetslip([]))
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
                            />
                        }
                        {
                            live === 2 && 'Live'
                        }
                    </div>
                    <div className={style.bottom}>
                        {
                            live === 1 && <div>{convertTime(data.start)}</div>
                        }
                        {
                            live === 2 &&
                            !checkData(update) &&
                            <MatchTimer
                                start={update.event.start}
                                end={update.event.nextUpdate}
                            />
                        }
                        {
                            live === 3 &&
                            !checkData(update) &&
                            <ResultTimer
                                end={update.event.nextUpdate}
                            />
                        }
                    </div>
                </>
            }
        </div>
    );
}

export default Timer;
