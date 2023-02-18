import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";

import {fetchData} from "helpers/api";
import {useLocalStorage} from "helpers/localStorage";

import Icon from "components/Icon";
import Preloader from "components/Preloader";

import style from './index.module.scss';

const Cards = () => {
    let url = useParams()
    const { t } = useTranslation()
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const {getLocalStorage} = useLocalStorage()

    useEffect(() => {
        fetchData(`https://stats.fn.sportradar.com/betradar/${getLocalStorage('i18nextLng')}/Europe:Helsinki/gismo/stats_season_topcards/${url.league}`).then((data) => {
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
                                            <div className={style.cell}>
                                                <div className={style.icon}>
                                                    <Icon id={'yellow-card'} />
                                                </div>
                                            </div>
                                            <div className={style.cell}>
                                                <div className={style.icon}>
                                                    <Icon id={'yellow-red-card'} />
                                                </div>
                                            </div>
                                            <div className={style.cell}>
                                                <div className={style.icon}>
                                                    <Icon id={'red-card'} />
                                                </div>
                                            </div>
                                            <div className={style.cell}>{t('interface.minutes_card')}</div>
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
                                                    <div className={style.cell}>{el.total.yellow_cards || '-'}</div>
                                                    <div className={style.cell}>{el.total.yellowred_cards || '-'}</div>
                                                    <div className={style.cell}>{el.total.red_cards || '-'}</div>
                                                    <div className={style.cell}>
                                                        {
                                                            (el.total.minutes_played / ((el.total.yellow_cards || 0) + (el.total.yellowred_cards || 0) + (el.total.red_cards || 0))).toFixed(2)
                                                        }
                                                    </div>
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

export default Cards;
