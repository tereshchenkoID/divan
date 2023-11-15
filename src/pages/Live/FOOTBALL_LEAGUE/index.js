import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

import classNames from "classnames";

import Slider from "react-slick";

import {gameType, matchStatus} from "constant/config";

import {setProgress} from "store/LIVE/actions/progressAction";
import {setTv} from "store/LIVE/actions/tvAction";

import Alert from "modules/Alert";
import Loader from "components/Loader";
import Timer from "pages/Live/Timer";
import Live from "pages/Live/Live";

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
    const {progress} = useSelector((state) => state.progress)
    const [loading, setLoading] = useState(true)
    const {game} = useSelector((state) => state.game)

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
                                        <button className={style.week}>League {tv.event.league.league_id}</button>
                                        <button className={style.week}>Week {tv.event.league.week}</button>
                                    </div>
                                    {
                                        progress === 1
                                        ?
                                            <div className={style.wrapper}>
                                                <div className={style.left}>
                                                    <div className={style.results}>
                                                        {
                                                            tv.event.league.matches.map((el_m, idx_m) =>
                                                                <div
                                                                    key={idx_m}
                                                                    className={style.row}
                                                                >
                                                                    <div className={style.cell}>
                                                                        <div className={style.position}>{el_m.pos}</div>
                                                                    </div>
                                                                    <div className={style.cell}>
                                                                        <div className={style.meta}>
                                                                            <div className={style.logo}>
                                                                                <img
                                                                                    src={`https://view.divan.bet/engine/shop/resource/${el_m.teams.home.img}`}
                                                                                    alt={el_m.teams.home.name}
                                                                                />
                                                                            </div>
                                                                            <div>
                                                                                <div>{el_m.teams.home.name}</div>
                                                                                <div className={style.states}>
                                                                                    {el_m.teams.home.last3.split('').map((char, index) => (
                                                                                        <div
                                                                                            key={index}
                                                                                            className={
                                                                                                classNames(
                                                                                                    style.state,
                                                                                                    style[char.toLowerCase()]
                                                                                                )
                                                                                            }
                                                                                        />
                                                                                    ))}
                                                                                </div>
                                                                            </div>
                                                                            <div>vs</div>
                                                                            <div>
                                                                                <div>{el_m.teams.away.name}</div>
                                                                                <div className={style.states}>
                                                                                    {el_m.teams.away.last3.split('').map((char, index) => (
                                                                                        <div
                                                                                            key={index}
                                                                                            className={
                                                                                                classNames(
                                                                                                    style.state,
                                                                                                    style[char.toLowerCase()]
                                                                                                )
                                                                                            }
                                                                                        />
                                                                                    ))}
                                                                                </div>
                                                                            </div>
                                                                            <div className={style.logo}>
                                                                                <img
                                                                                    src={`https://view.divan.bet/engine/shop/resource/${el_m.teams.away.img}`}
                                                                                    alt={el_m.teams.away.name}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                                <div className={style.right}>
                                                    <Slider {...init}>
                                                        {
                                                            tv.event.league.matches[0].odds[0].groups.slice(0, tv.event.league.matches[0].odds[0].groups.length - 1).map((el_o, idx_o)  =>
                                                                <div
                                                                    key={idx_o}
                                                                    className={style.slide}
                                                                >
                                                                    <div className={style.head}>
                                                                        {
                                                                            tv.event.league.matches[0].odds[0].groups[idx_o].markets.map((el_ma, idx_ma) =>
                                                                                <div
                                                                                    key={idx_ma}
                                                                                    className={style.column}
                                                                                >
                                                                                    {
                                                                                        el_ma.name &&
                                                                                        <div className={style.legend}>{el_ma.name.replaceAll('_', ' ')}</div>
                                                                                    }
                                                                                    {
                                                                                        el_ma.headers.map((el, idx) =>
                                                                                            <div
                                                                                                key={idx}
                                                                                                className={style.label}
                                                                                            >
                                                                                                {el}
                                                                                            </div>
                                                                                        )
                                                                                    }
                                                                                </div>
                                                                            )
                                                                        }
                                                                    </div>
                                                                    
                                                                    <div className={style.results}>
                                                                        {
                                                                            tv.event.league.matches.map((el_m, idx_m) =>
                                                                                <div
                                                                                    key={idx_m}
                                                                                    className={style.row}
                                                                                >
                                                                                    {
                                                                                        el_m.odds[0].groups[idx_o].markets.map((el_ma, idx_ma) =>
                                                                                            <div
                                                                                                key={idx_ma}
                                                                                                className={style.column}
                                                                                            >
                                                                                                {
                                                                                                    el_ma.outcomes.map((el, idx) =>
                                                                                                        <div
                                                                                                            key={idx}
                                                                                                            className={
                                                                                                                classNames(
                                                                                                                    style.odd,
                                                                                                                    (!el.b || el.b === '1.00') && style.disabled,
                                                                                                                )
                                                                                                            }
                                                                                                        >
                                                                                                            {el.b ? parseFloat(el.b).toFixed(2) : '1.00'}
                                                                                                        </div>
                                                                                                    )
                                                                                                }
                                                                                            </div>
                                                                                        )
                                                                                    }
                                                                                </div>
                                                                            )
                                                                        }
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                        
                                                        {
                                                            tv.event.league.matches[0].odds[0].groups[7].markets.map((el_ma, idx_ma) =>
                                                                <div
                                                                    key={idx_ma}
                                                                    className={style.slide}
                                                                >
                                                                    <div className={style.head}>
                                                                        {
                                                                            el_ma.name &&
                                                                            <div className={style.legend}>{`${el_ma.name.replaceAll('_', ' ')} ${el_ma.headers[0]}`}</div>
                                                                        }
                                                                        {
                                                                            el_ma.outcomes.map((el, idx) =>
                                                                                <div
                                                                                    key={idx}
                                                                                    className={style.column}
                                                                                >
                                                                                    <div className={style.label}>{el.a}</div>
                                                                                </div>
                                                                            )
                                                                        }
                                                                    </div>
                                                                    <div className={style.results}>
                                                                        {
                                                                            tv.event.league.matches.map((el_m, idx_m) =>
                                                                                <div
                                                                                    key={idx_m}
                                                                                    className={style.row}
                                                                                >
                                                                                    {
                                                                                        el_m.odds[0].groups[7].markets[idx_ma].outcomes.map((el, idx) =>
                                                                                            <div
                                                                                                key={idx}
                                                                                                className={style.column}
                                                                                            >
                                                                                                <div
                                                                                                    className={
                                                                                                        classNames(
                                                                                                            style.odd,
                                                                                                            style.sm,
                                                                                                            (!el.b || el.b === '1.00') && style.disabled,
                                                                                                        )
                                                                                                    }
                                                                                                >
                                                                                                    {el.b ? parseFloat(el.b).toFixed(2) : '1.00'}
                                                                                                </div>
                                                                                            </div>
                                                                                        )
                                                                                    }
                                                                                </div>
                                                                            
                                                                            )
                                                                        }
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                    </Slider>
                                                </div>
                                            </div>
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
    );
}

export default Table;
