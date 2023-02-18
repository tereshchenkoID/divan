import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
// import {useTranslation} from "react-i18next";

import {fetchData} from "helpers/api";
import {useLocalStorage} from "helpers/localStorage";

import Preloader from "components/Preloader";
import Icon from "components/Icon";

import style from './index.module.scss';

const Squad = () => {
    let url = useParams()
    // const { t } = useTranslation()
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const {getLocalStorage} = useLocalStorage()

    useEffect(() => {
        fetchData(`https://stats.fn.sportradar.com/betradar/${getLocalStorage('i18nextLng')}/Europe:Helsinki/gismo/stats_team_squad/${url.team}`).then((data) => {
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
                            <div className={style.head}> ПОТОЧНИЙ СКЛАД</div>
                            <div className={style.wrapper}>
                                <div className={style.overflow}>
                                    <div className={style.table}>
                                        <div className={style.row}>
                                            <div className={style.cell}>Склад команди</div>
                                            <div className={style.cell}>Дата народження</div>
                                            <div className={style.cell}>Появи</div>
                                            <div className={style.cell}>Хв</div>
                                            <div className={style.cell}>Голи</div>
                                            <div className={style.cell}>Асисти</div>
                                            <div className={style.cell}>
                                                <div className={style.icon}>
                                                    <Icon id={'yellow-card'} />
                                                </div>
                                            </div>
                                        </div>
                                        {
                                            data.doc[0].data.players.map((el, idx) =>
                                                <div
                                                    key={idx}
                                                    className={style.row}
                                                >
                                                    <div className={style.cell}>
                                                        <div className={style.meta}>
                                                            <div>{el.position.shortname}</div>
                                                            <div>{el.shirtnumber}</div>
                                                            <div>
                                                                {
                                                                    el.nationality.a2 &&
                                                                    <span className={style.country}>
                                                                        <img src={`https://img.sportradar.com/ls/crest/big/${el.nationality.a2}.png`} alt={el.nationality.name} />
                                                                    </span>
                                                                }
                                                            </div>
                                                            <span>{el.name}</span>
                                                        </div>
                                                    </div>
                                                    <div className={style.cell}>{el.birthdate.date}</div>
                                                    <div className={style.cell}></div>
                                                    <div className={style.cell}></div>
                                                    <div className={style.cell}></div>
                                                    <div className={style.cell}></div>
                                                    <div className={style.cell}></div>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </>
            }
        </div>
    );
}

export default Squad;
