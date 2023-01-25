import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";

import classNames from "classnames";

import {setUrl} from "store/actions/urlAction";
import {loadEventMatchData} from "store/actions/eventMatchAction";

import {fetchData} from "helpers/api";
import {checkData} from "helpers/checkData";

import Loader from "components/Loader";
import Container from "components/Container";

import style from './index.module.scss';

const Tables = () => {
    let url = useParams()
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const {event} = useSelector((state) => state.eventMatch)
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const [type, setType] = useState('overall')
    const [league, setLeague] = useState()

    useEffect(() => {
        dispatch(setUrl(url))

        checkData(event) && dispatch(loadEventMatchData(url.match))

        !checkData(event) && setLeague(event.league.id)

        league && fetchData(`https://matchtracker.live/api/table/${league}`).then((data) => {
            setData(data.results)
            setLoading(false)
        })

    }, [event, league]);

    return (
        <Container>
            {
                loading
                    ?
                    <Loader />
                    :
                    data &&
                    <>
                        <div className={style.sort}>
                            {
                                Object.keys(data).map(key =>
                                    key !== 'season' &&
                                    <button
                                        key={key}
                                        className={classNames(style.link, type === key && style.active)}
                                        onClick={() => {
                                            setType(key)
                                        }}
                                    >
                                        {t(`interface.${key}`)}
                                    </button>
                                )
                            }
                        </div>
                        <div className={style.table}>
                            <div className={classNames(style.row, style.head)}>
                                <div className={style.cell}>{t('interface.po')}</div>
                                <div className={style.cell}>{t('interface.team')}</div>
                                <div className={style.cell}>{t('interface.w')}</div>
                                <div className={style.cell}>{t('interface.d')}</div>
                                <div className={style.cell}>{t('interface.l')}</div>
                                <div className={style.cell}>{t('interface.goals')}</div>
                                <div className={style.cell}>{t('interface.diff')}</div>
                                <div className={style.cell}>{t('interface.pts')}</div>
                            </div>
                            {
                                data[type].tables.length > 0 &&
                                data[type].tables[0].rows.map((el, idx) =>
                                    <div
                                        key={idx}
                                        className={style.row}
                                    >
                                        <div className={style.cell}>{el.pos}</div>
                                        <div className={style.cell}>
                                            <div className={style.team}>
                                                <div className={style.logo}>
                                                    <img
                                                        src={`https://www.matchtracker.live/images/team/b/${el.team.image_id}.png`}
                                                        alt={el.team.name}
                                                    />
                                                </div>
                                                {el.team.name}
                                            </div>
                                        </div>
                                        <div className={style.cell}>{el.win}</div>
                                        <div className={style.cell}>{el.draw}</div>
                                        <div className={style.cell}>{el.loss}</div>
                                        <div className={style.cell}>{el.goalsfor} : {el.goalsagainst}</div>
                                        <div className={style.cell}>{el.goalDiffTotal}</div>
                                        <div className={style.cell}>{el.points}</div>
                                    </div>
                                )
                            }
                        </div>
                    </>
            }
        </Container>
    );
}

export default Tables;
