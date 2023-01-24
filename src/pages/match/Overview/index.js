import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";

import classNames from "classnames";

import {setUrl} from "store/actions/urlAction";
import {loadEventMatchData} from "store/actions/eventMatchAction";

import checkData from "helpers/checkData";

import Loader from "components/Loader";
import Container from "components/Container";
import Icon from "components/Icon";
import Scoreboard from "modules/Scoreboard";
import Scale from "./Scale";

import style from './index.module.scss';

const Overview = () => {
    let url = useParams()
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const {event} = useSelector((state) => state.eventMatch)

    useEffect(() => {
        dispatch(setUrl(url))
        dispatch(loadEventMatchData(url.match)).then(() => {
            setLoading(false)
        })
    }, []);

    return (
        <Container>
            {
                (checkData(event) && loading)
                    ?
                    <Loader />
                    :
                    <>
                        <Scoreboard event={event}/>
                        <div className={style.panel}>
                            <div className={style.sort}>{t('interface.stats')}</div>
                            <div className={style.scroll}>
                                <div className={style.scoreboard}>
                                    <div>
                                        <div />
                                        {
                                            Object.keys(event.scores).map(key =>
                                                event.scores[key].home &&
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
                                                    src={`https://www.matchtracker.live/images/team/b/${event.home.image_id}.png`}
                                                    alt={event.home.name}
                                                />
                                            </div>
                                            {event.home.name}
                                        </div>
                                        {
                                            Object.keys(event.scores).map(key =>
                                                event.scores[key].home &&
                                                <div key={key}>
                                                    {event.scores[key].home}
                                                </div>
                                            )
                                        }
                                        <div>
                                            <p>{event.ss.split('-')[0]}</p>
                                        </div>
                                        <div>{event.stats.corners[0]}</div>
                                        <div>{event.stats.penalties[0]}</div>
                                        <div>{event.stats.yellowcards[0]}</div>
                                        <div>{event.stats.redcards[0]}</div>
                                    </div>
                                    <div>
                                        <div>
                                            <div className={style.logo}>
                                                <img
                                                    src={`https://www.matchtracker.live/images/team/b/${event.away.image_id}.png`}
                                                    alt={event.away.name}
                                                />
                                            </div>
                                            {event.away.name}
                                        </div>
                                        {
                                            Object.keys(event.scores).map(key =>
                                                event.scores[key].away &&
                                                <div key={key}>
                                                    {event.scores[key].away}
                                                </div>
                                            )
                                        }
                                        <div>
                                            <p>{event.ss.split('-')[1]}</p>
                                        </div>
                                        <div>{event.stats.corners[1]}</div>
                                        <div>{event.stats.penalties[1]}</div>
                                        <div>{event.stats.yellowcards[1]}</div>
                                        <div>{event.stats.redcards[1]}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            event.stats &&
                            <div className={style.panel}>
                                <div className={style.sort}>{t('interface.events')}</div>
                                <div className={style.table}>
                                    {
                                        Object.keys(event.stats).map(key =>
                                            <Scale
                                                text={key}
                                                home={event.stats[key][0]}
                                                away={event.stats[key][1]}
                                                key={key}
                                            />
                                        )
                                    }
                                </div>
                            </div>
                        }
                        {
                            event.events &&
                            <div className={style.panel}>
                                <div className={style.sort}>{t('interface.summary')}</div>
                                <div className={classNames(style.table, style.reverse)}>
                                    {
                                        event.events.map((el, idx) =>
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
        </Container>
    );
}

export default Overview;
