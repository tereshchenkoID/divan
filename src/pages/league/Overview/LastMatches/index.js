import {useState, useEffect} from "react";
import {useParams, NavLink} from "react-router-dom";
import {useTranslation} from "react-i18next";

import classNames from "classnames";

import {fetchData} from "helpers/api";
import {useLocalStorage} from "helpers/localStorage";

import Preloader from "components/Preloader";

import style from './index.module.scss';

const LastMatches = () => {
    let url = useParams()
    const { t } = useTranslation()
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const {getLocalStorage} = useLocalStorage()

    useEffect(() => {
        fetchData(`https://stats.fn.sportradar.com/betradar/${getLocalStorage('i18nextLng')}/Europe:Helsinki/gismo/stats_season_lastx/${url.league}/30`).then((data) => {
            setData(data)
            setLoading(false)
        })
    }, []);

    return (
        <div className={style.block}>
            {
                loading
                    ?
                        <Preloader />
                    :
                        <>
                            <div className={style.head}>{t('interface.last_matches')}</div>
                            {
                                data.doc[0].data.matches
                                ?
                                    <div className={style.wrapper}>
                                        <div className={style.overflow}>
                                            <div className={style.table}>
                                                <div className={style.row}>
                                                    <div className={style.cell}>{t('interface.to')}</div>
                                                    <div className={style.cell}></div>
                                                    <div className={style.cell}>{t('interface.match')}</div>
                                                    <div className={style.cell}></div>
                                                </div>
                                                {
                                                    data.doc[0].data.matches.map((el, idx) =>
                                                        !el.canceled &&
                                                        <div
                                                            key={idx}
                                                            className={style.row}
                                                        >
                                                            <div className={style.cell}>{el.round}</div>
                                                            <NavLink
                                                                key={idx}
                                                                className={
                                                                    classNames(
                                                                        style.cell,
                                                                        el.result.home > el.result.away && style.accent
                                                                    )
                                                                }
                                                                to={`/${url.id}/${url.category}/${url.league}/team/${el.teams.home.uid}`}
                                                            >
                                                                {el.teams.home.name}
                                                            </NavLink>
                                                            <div className={classNames(style.cell, style.column)}>
                                                                <div>{el.time.date}</div>
                                                                <div className={style.scoreboard}>
                                                                <span className={
                                                                    classNames(
                                                                        style.score,
                                                                        el.result.home > el.result.away && style.accent
                                                                    )
                                                                }
                                                                >
                                                                    {el.result.home}
                                                                </span>
                                                                    <span>-</span>
                                                                    <span className={
                                                                        classNames(
                                                                            style.score,
                                                                            el.result.away > el.result.home && style.accent
                                                                        )
                                                                    }
                                                                    >
                                                                    {el.result.away}
                                                                </span>
                                                                </div>
                                                            </div>
                                                            <NavLink
                                                                key={idx}
                                                                className={
                                                                    classNames(
                                                                        style.cell,
                                                                        el.result.away > el.result.home && style.accent
                                                                    )
                                                                }
                                                                to={`/${url.id}/${url.category}/${url.league}/team/${el.teams.away.uid}`}
                                                            >
                                                                {el.teams.away.name}
                                                            </NavLink>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                :
                                    <div className={style.error}>{t('interface.not_found')}</div>
                            }
                        </>
            }
        </div>
    );
}

export default LastMatches;
