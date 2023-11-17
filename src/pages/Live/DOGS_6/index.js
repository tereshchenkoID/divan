import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

import Slider from "react-slick";

import {gameType, matchStatus} from "constant/config";

import {setProgress} from "store/LIVE/actions/progressAction";
import {setTv} from "store/LIVE/actions/tvAction";

import Alert from "modules/Alert";
import Loader from "components/Loader";
import Countdown from "../Modal/Countdown";
import Timer from "../Timer";
import Forecast from "./Forecast";
import Tricast from "./Tricast";
import Quinella from "./Quinella";
import Main from "./Main";
import Extra from "./Extra";

import style from './index.module.scss';

const init = {
    fade: true,
    dots: false,
    arrows: false,
    autoplay: true,
    infinite: true,
    speed: 500,
    autoplaySpeed: 10000,
    slidesToShow: 1,
    slidesToScroll: 1
};

const Table = () => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const {tv} =  useSelector((state) => state.tv)
    const {game} = useSelector((state) => state.game)
    const {modal} = useSelector((state) => state.modal)
    const {progress} = useSelector((state) => state.progress)
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
                        tv.event
                            ?
                                <>
                                    <div className={style.info}>
                                        <div className={style.league}>
                                            <img
                                                src={`/img/icon/${game.id}.svg`}
                                                alt={'Dogs'}
                                            />
                                        </div>
                                        {
                                            progress !== 0 &&
                                            <Timer
                                                data={tv.event}
                                                type={gameType.DOGS_6}
                                            />
                                        }
                                    </div>
                                    <div className={style.weeks}>
                                        <button className={style.week}>{t('interface.event')} {tv.event.id}</button>
                                    </div>
                                    {
                                        progress === 1
                                            ?
                                                <div className={style.wrapper}>
                                                    <Slider {...init}>
                                                        <div className={style.slide}>
                                                            <div className={style.row}>
                                                                <Main data={tv.event}/>
                                                            </div>
                                                            <div className={style.row}>
                                                                <Quinella data={tv.event}/>
                                                            </div>
                                                        </div>
                                                        <div className={style.slide}>
                                                            <div className={style.row}>
                                                                <Forecast data={tv.event}/>
                                                            </div>
                                                            <div className={style.row}>
                                                                <Extra data={tv.event} />
                                                            </div>
                                                        </div>
                                                        <div className={style.slide}>
                                                            <Tricast data={tv.event}/>
                                                        </div>
                                                    </Slider>
                                                </div>
                                            :
                                                <div>Live</div>
                                    }
                                    {
                                        modal === 1 && <Countdown />
                                    }
                                </>
                            :
                                <Alert
                                    text={t('notification.events_not_found')}
                                    type={'default'}
                                />
            }
        </div>
    );
}

export default Table;
