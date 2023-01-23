import {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";

import classNames from "classnames";

import {fetchData} from "helpers/api";
import {setUrl} from "store/actions/urlAction";

import Loader from "components/Loader";
import Container from "components/Container";
import Icon from "components/Icon";
import Scale from "./Scale";

import style from './index.module.scss';

const Overview = () => {
    let url = useParams()
    const { t } = useTranslation()
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()

    // TODO Event in state
    useEffect(() => {
        dispatch(setUrl(url))

        console.log(url)

        fetchData(`https://matchtracker.live/api/event/${url.match}`).then((response) => {
            setData(response.results[0])
            setLoading(false)
        })
    }, []);

    return (
        <Container>
            <div className={style.block}>
                {
                    loading
                        ?
                        <Loader />
                        :
                        <>
                            <div className={style.panel}>
                                <div className={style.sort}>{t('interface.stats')}</div>
                                <div className={style.scroll}>
                                    <div className={style.scoreboard}>
                                        <div>
                                            <div />
                                            {
                                                Object.keys(data.scores).map(key =>
                                                    data.scores[key].home &&
                                                    <div key={key}>
                                                        {key} {t('interface.half')}
                                                    </div>
                                                )
                                            }
                                            <div>{t('interface.score')}</div>
                                            <div>
                                                <Icon id={'corner'} />
                                            </div>
                                            <div>
                                                <Icon id={'score'} />
                                            </div>
                                            <div>
                                                <Icon id={'yellow-card'} />
                                            </div>
                                            <div>
                                                <Icon id={'red-card'} />
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                <div className={style.logo}>
                                                    <img
                                                        src={`https://www.matchtracker.live/images/team/b/${data.home.image_id}.png`}
                                                        alt={data.home.name}
                                                    />
                                                </div>
                                                {data.home.name}
                                            </div>
                                            {
                                                Object.keys(data.scores).map(key =>
                                                    data.scores[key].home &&
                                                    <div key={key}>
                                                        {data.scores[key].home}
                                                    </div>
                                                )
                                            }
                                            <div>
                                                <p>{data.ss.split('-')[0]}</p>
                                            </div>
                                            <div>{data.stats.corners[0]}</div>
                                            <div>{data.stats.penalties[0]}</div>
                                            <div>{data.stats.yellowcards[0]}</div>
                                            <div>{data.stats.redcards[0]}</div>
                                        </div>
                                        <div>
                                            <div>
                                                <div className={style.logo}>
                                                    <img
                                                        src={`https://www.matchtracker.live/images/team/b/${data.away.image_id}.png`}
                                                        alt={data.away.name}
                                                    />
                                                </div>
                                                {data.away.name}
                                            </div>
                                            {
                                                Object.keys(data.scores).map(key =>
                                                    data.scores[key].away &&
                                                    <div key={key}>
                                                        {data.scores[key].away}
                                                    </div>
                                                )
                                            }
                                            <div>
                                                <p>{data.ss.split('-')[1]}</p>
                                            </div>
                                            <div>{data.stats.corners[1]}</div>
                                            <div>{data.stats.penalties[1]}</div>
                                            <div>{data.stats.yellowcards[1]}</div>
                                            <div>{data.stats.redcards[1]}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                data.stats &&
                                <div className={style.panel}>
                                    <div className={style.sort}>{t('interface.events')}</div>
                                    <div className={style.table}>
                                        {
                                            Object.keys(data.stats).map(key =>
                                                <Scale
                                                    text={key}
                                                    home={data.stats[key][0]}
                                                    away={data.stats[key][1]}
                                                    key={key}
                                                />
                                            )
                                        }
                                    </div>
                                </div>
                            }
                            {
                                data.events &&
                                <div className={style.panel}>
                                    <div className={style.sort}>{t('interface.summary')}</div>
                                    <div className={classNames(style.table, style.reverse)}>
                                        {
                                            data.events.map((el, idx) =>
                                                <div
                                                    key={idx}
                                                    className={style.row}
                                                >
                                                    <div className={style.cell}>
                                                        {el.text.split('\' -')[0]}
                                                        {el.text.split('\' -').length > 1 && '\''}
                                                    </div>
                                                    <div className={style.cell}>
                                                        {el.text.split('\' -')[1]}
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            }
                        </>
                }
            </div>
        </Container>
    );
}

export default Overview;
