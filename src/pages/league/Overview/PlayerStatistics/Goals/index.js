import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";

import {fetchData} from "helpers/api";

import Preloader from "components/Preloader";

import style from './index.module.scss';

const Goals = () => {
    let url = useParams()
    const { t } = useTranslation()
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchData(`stats_season_topgoals/${url.league}`).then((data) => {
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
                        <div className={style.wrapper}>
                            <div className={style.overflow}>
                                <div className={style.body}>
                                    <div className={style.table}>
                                        <div className={style.row}>
                                            <div className={style.cell}>{t('interface.po')}</div>
                                            <div className={style.cell}>{t('interface.player')}</div>
                                            <div className={style.cell}>{t('interface.team')}</div>
                                            <div className={style.cell}>{t('interface.matches')}</div>
                                            <div className={style.cell}>{t('interface.goals')}</div>
                                            <div className={style.cell}>{t('interface.fg')}</div>
                                            <div className={style.cell}>{t('interface.lg')}</div>
                                            <div className={style.cell}>{t('stats.penalties')}</div>
                                            <div className={style.cell}>{t('interface.gm')}</div>
                                        </div>
                                        {
                                            data.doc[0].data.players.map((el, idx) =>
                                                <div
                                                    key={idx}
                                                    className={style.row}
                                                >
                                                    <div className={style.cell}>{el.player.position.shortname}</div>
                                                    <div className={style.cell}>
                                                        {
                                                            el.player.nationality &&
                                                            <span className={style.country}>
                                                                <img src={`https://img.sportradar.com/ls/crest/big/${el.player.nationality.a2}.png`} alt={el.player.name} />
                                                            </span>
                                                        }
                                                        <span>{el.player.name}</span>
                                                    </div>
                                                    <div className={style.cell}>
                                                        <span>
                                                            {
                                                                data.doc[0].data.teams[Object.getOwnPropertyNames(el.teams)[0]].name || '-'
                                                            }
                                                        </span>
                                                    </div>
                                                    <div className={style.cell}>{el.total.matches}</div>
                                                    <div className={style.cell}>{el.total.goals || '-'}</div>
                                                    <div className={style.cell}>{el.total.first_goals || '-'}</div>
                                                    <div className={style.cell}>{el.total.last_goals || '-'}</div>
                                                    <div className={style.cell}>{el.total.penalties || '-'}</div>
                                                    <div className={style.cell}>{(el.total.goals / el.total.matches).toFixed(2)}</div>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
            }
        </div>
    );
}

export default Goals;
