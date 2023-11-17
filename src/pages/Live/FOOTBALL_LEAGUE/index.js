import {gameType, matchStatus} from "constant/config";
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

import {setProgress} from "store/LIVE/actions/progressAction";
import {setTv} from "store/LIVE/actions/tvAction";

import Alert from "modules/Alert";
import Loader from "components/Loader";
import Timer from "../Timer";
import Countdown from "../Modal/Countdown";
import Live from "./Live";
import History from "./History";
import Table from "./Table";

import style from './index.module.scss';

const Page = () => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const {tv} =  useSelector((state) => state.tv)
    const {game} = useSelector((state) => state.game)
    const {progress} = useSelector((state) => state.progress)
    const {modal} = useSelector((state) => state.modal)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        dispatch(setTv(`${game.type}/${game.id}`)).then((json) => {
            if (json.event.status === matchStatus.ANNOUNCEMENT) {
                dispatch(setProgress(1))
            }
            else if (json.event.status === matchStatus.PROGRESS) {
                dispatch(setProgress(2))
            }
            else if (json.event.status === matchStatus.RESULTS) {
                dispatch(setProgress(3))
            }
            else if (json.event.status === matchStatus.COMPLETED) {
                dispatch(setProgress(4))
            }
            
            setLoading(false)
        })
    }, []);

    return (
        <div className={style.block}>
            {
                loading
                    ?
                        <Loader type={'block'} />
                    :
                        <>
                            <div className={style.content}>
                                {
                                    tv.event
                                        ?
                                            <>
                                                <div className={style.info}>
                                                    <div className={style.league}>
                                                        <img
                                                            src={`/img/icon/${tv.event.league.id}.png`}
                                                            alt={tv.event.league.name}
                                                        />
                                                    </div>
                                                    {
                                                        progress !== 0 &&
                                                        <Timer
                                                            data={tv.event}
                                                            type={gameType.FOOTBALL_LEAGUE}
                                                        />
                                                    }
                                                </div>
                                                <div className={style.weeks}>
                                                    <button className={style.week}>{t('interface.league')} {tv.event.league.league_id}</button>
                                                    <button className={style.week}>{t('interface.week')} {tv.event.league.week}</button>
                                                </div>
                                                {
                                                    progress === 1
                                                        ?
                                                            <Table data={tv}/>
                                                        :
                                                            <Live />
                                                }
                                            </>
                                        :
                                            <Alert
                                                text={t('notification.events_not_found')}
                                                type={'default'}
                                            />
                                }
                            </div>
                            <div className={style.content}>
                                <History />
                            </div>
                            {
                                modal === 1 && <Countdown />
                            }
                        </>
            }
        </div>
    );
}

export default Page;