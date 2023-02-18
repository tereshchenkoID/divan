import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";

import {fetchData} from "helpers/api";
import {useLocalStorage} from "helpers/localStorage";

import classNames from "classnames";

import Preloader from "components/Preloader";
import Icon from "components/Icon";

import style from './index.module.scss';

const getPercent = (value, max) => {
    return `${value / max * 100}%`
}

const LeagueSummary = () => {
    let url = useParams()
    const { t } = useTranslation()
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const {getLocalStorage} = useLocalStorage()

    useEffect(() => {
        fetchData(`https://stats.fn.sportradar.com/betradar/${getLocalStorage('i18nextLng')}/Europe:Helsinki/gismo/stats_season_leaguesummary/${url.league}/main`).then((data) => {
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
                        <div className={style.panel}>
                            <div>
                                <div className={style.head}>{t('interface.match_winner')}</div>
                                {
                                    <div className={classNames(style.table, style.default)}>
                                        <div className={style.row}>
                                            <div className={style.cell}>
                                                <div className={style.score}>{data.doc[0].data.matches.home_wins}%</div>
                                                <div>{t('interface.home')}</div>
                                                <div className={classNames(style.scale, style.vertical)}>
                                                    <div
                                                        className={style.left}
                                                        style={{
                                                            height: `${data.doc[0].data.matches.home_wins}%`
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className={style.cell}>
                                                <div className={style.score}>{data.doc[0].data.matches.draws}%</div>
                                                <div>{t('interface.draw')}</div>
                                                <div className={classNames(style.scale, style.vertical)}>
                                                    <div
                                                        className={style.center}
                                                        style={{
                                                            height: `${data.doc[0].data.matches.draws}%`
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className={style.cell}>
                                                <div className={style.score}>{data.doc[0].data.matches.away_wins}%</div>
                                                <div>{t('interface.away')}</div>
                                                <div className={classNames(style.scale, style.vertical)}>
                                                    <div
                                                        className={style.right}
                                                        style={{
                                                            height: `${data.doc[0].data.matches.away_wins}%`
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className={style.meta}>
                                            <span>{t('interface.matches')}</span>
                                            <div className={style.icon}>
                                                <Icon id={'games'} />
                                            </div>
                                            <span>{data.doc[0].data.matches.played}</span>
                                        </div>
                                    </div>
                                }
                            </div>
                            <div>
                                <div className={style.head}>{t('interface.goals_per_match')}</div>
                                {
                                    <div className={classNames(style.table, style.custom)}>
                                        <div className={style.row}>
                                            <div className={style.cell}>
                                                <div className={style.score}>{data.doc[0].data.goals.pr_match_home}</div>
                                                <div>{t('interface.home')}</div>
                                            </div>
                                            <div className={style.cell}>
                                                <div>{t('interface.all')}</div>
                                                <div className={style.score}>{data.doc[0].data.goals.pr_match}</div>
                                                <div className={classNames(style.scale, style.horizontal)}>
                                                    <div
                                                        className={style.left}
                                                        style={{
                                                            width: getPercent(data.doc[0].data.goals.pr_match_home, data.doc[0].data.goals.pr_match)
                                                        }}
                                                    />
                                                    <div
                                                        className={style.right}
                                                        style={{
                                                            width: getPercent(data.doc[0].data.goals.pr_match_away, data.doc[0].data.goals.pr_match)
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className={style.cell}>
                                                <div className={style.score}>{data.doc[0].data.goals.pr_match_away}</div>
                                                <div>{t('interface.away')}</div>
                                            </div>
                                        </div>

                                        <div className={style.meta}>
                                            <span>{t('interface.goals')}</span>
                                            <div className={style.icon}>
                                                <Icon id={'goals'} />
                                            </div>
                                            <span>{data.doc[0].data.goals.total}</span>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
            }
        </div>
    );
}

export default LeagueSummary;
