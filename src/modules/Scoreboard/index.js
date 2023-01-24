import {useTranslation} from "react-i18next";

import {convertTime} from 'helpers/convertTime'
import {convertTimer} from 'helpers/convertTimer'
import {checkData} from "helpers/checkData"

import Loader from "components/Loader";

import style from './index.module.scss';

const Scoreboard = ({event}) => {
    const { t } = useTranslation()

    return (
            checkData(event)
                ?
                    <Loader />
                :
                    <div className={style.block}>
                        <div className={style.head}>
                        <div className={style.league}>
                            {
                                event.league.cc &&
                                <div className={style.country}>
                                    <img src={`https://www.matchtracker.live/v2/images/flags/${event.league.cc}.svg`} alt=""/>
                                </div>
                            }
                            <p>{event.league.name}</p>
                            {
                                event.extra &&
                                event.extra.round &&
                                <>
                                    <hr className={style.divider} />
                                    <div className={style.wrapper}>
                                        <div className={style.icon}>
                                            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M30.9 8.5a1 1 0 0 0-.6-.5l-7-2H21a1 1 0 0 0-.9.5L19.4 8h-6.8L12 6.6A1 1 0 0 0 11 6H9a1 1 0 0 0-.3 0l-7 2A1 1 0 0 0 1 9.3l2 6.3a1 1 0 0 0 1.3.7l3.7-1V29c0 .6.4 1 1 1h14c.6 0 1-.4 1-1V15.3l3.7 1h.3a1 1 0 0 0 1-.7l2-6.3a1 1 0 0 0-.1-.8zm-3.6 5.6l-4-1H23a1 1 0 0 0-1 .9v14H10V14a1 1 0 0 0-1.3-1l-4 1.1-1.4-4.4L9 8h1.3l.7 1.4c.2.4.5.6.9.6h8c.4 0 .7-.2.9-.5l.7-1.5H23l5.8 1.7zM2.3 6l-.6-2 7-2H13c.4 0 .7.2.9.5l.7 1.5h2.8l.7-1.4c.2-.4.5-.6.9-.6h4.3l7 2-.6 2L23 4h-3.3L19 5.4a1 1 0 0 1-.9.6h-4a1 1 0 0 1-.9-.5L12.4 4H9zM18 14a2 2 0 1 0 2 2 2 2 0 0 0-2-2zm0 2z" />
                                            </svg>
                                        </div>
                                        <p>{t('interface.round')} {event.extra.round}</p>
                                    </div>
                                </>
                            }
                        </div>
                        {
                            event.extra &&
                            event.extra.stadium_data &&
                            <div className={style.wrapper}>
                                <div className={style.icon}>
                                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M32 11c0-3.4-8.3-5-16-5S0 7.6 0 11v.1l2 13.6c0 2.4 3.7 4.6 9 5.3h10.1c5.2-.7 8.9-2.9 8.9-5.2l2-13.7V11zm-2.9 6c-1.6 1.5-6.3 3-13.1 3S4.6 18.6 2.9 17l-.5-3.2A34.2 34.2 0 0 0 16.1 16H16a34.3 34.3 0 0 0 13.8-2.3l-.2.1zM6.2 13a42.6 42.6 0 0 1 9.8-1h.4c3.3 0 6.6.4 9.7 1h-.3a41.2 41.2 0 0 1-9.8 1 38.7 38.7 0 0 1-10-1h.2zM16 8c9.2 0 14 2 14 3 0 .3-.4.6-1 1a36.3 36.3 0 0 0-13-2 36.7 36.7 0 0 0-13.2 2H3c-.6-.4-1-.7-1-1 0-1 4.8-3 14-3zm-2 20v-2h4v2zm14-3.3c0 1-2.5 2.7-7 3.3h-1v-3c0-.6-.4-1-1-1h-6a1 1 0 0 0-1 1v3h-.9c-4.7-.6-7-2.5-7.1-3.5l-.7-4.8A29.5 29.5 0 0 0 16 22a28.5 28.5 0 0 0 13-2.5l-.3.1zM14 2a2 2 0 1 1 2 2 2 2 0 0 1-2-2zM3 3a2 2 0 1 1 2 2 2 2 0 0 1-2-2zm22 0a2 2 0 1 1 2 2 2 2 0 0 1-2-2z" />
                                    </svg>
                                </div>
                                <p>{event.extra.stadium_data.name}</p>
                            </div>
                        }
                    </div>
                        <div className={style.body}>
                            <div className={style.cell}>
                                <div className={style.logo}>
                                    <img
                                        src={`https://www.matchtracker.live/images/team/b/${event.home.image_id}.png`}
                                        alt={event.home.name}
                                    />
                                </div>
                                <div className={style.nickname}>{event.home.name}</div>
                                {
                                    event.extra &&
                                    event.extra.home_manager &&
                                    <div className={style.manager}>
                                        <div className={style.country}>
                                            <img src={`https://assets.betsapi.com/v2/images/flags/${event.extra.home_manager.cc}.svg`} alt=""/>
                                        </div>
                                        <p>{event.extra.home_manager.name}</p>
                                    </div>
                                }
                            </div>
                            <div className={style.cell}>
                                {
                                    event.time_status === '3'
                                        ?
                                            <div>{t('interface.finish')}</div>
                                        :
                                            <div className={style.timer}>
                                                <span>{convertTime(event.time)}</span>
                                            </div>
                                }
                                {
                                    event.timer &&
                                    <div className={style.timer}>
                                        <span>{convertTimer(event.timer.tm)}</span>
                                        <span>:</span>
                                        <span>{convertTimer(event.timer.ts)}</span>
                                    </div>
                                }
                                {
                                    event.ss &&
                                    <div className={style.score}>
                                        <div>{event.ss.split('-')[0]}</div>
                                        <div>-</div>
                                        <div>{event.ss.split('-')[1]}</div>
                                    </div>
                                }
                                {
                                    event.extra &&
                                    event.extra.referee &&
                                    <div className={style.manager}>
                                        <>
                                            <div className={style.country}>
                                                <img src={`https://assets.betsapi.com/v2/images/flags/${event.extra.referee.cc}.svg`} alt=""/>
                                            </div>
                                            <p>{event.extra.referee.name}</p>
                                        </>
                                    </div>
                                }
                            </div>
                            <div className={style.cell}>
                                <div className={style.logo}>
                                    <img
                                        src={`https://www.matchtracker.live/images/team/b/${event.away.image_id}.png`}
                                        alt={event.away.name}
                                    />
                                </div>
                                <div className={style.nickname}>{event.away.name}</div>
                                {
                                    event.extra &&
                                    event.extra.away_manager &&
                                    <div className={style.manager}>
                                        <div className={style.country}>
                                            <img src={`https://www.matchtracker.live/v2/images/flags/${event.extra.away_manager.cc}.svg`} alt=""/>
                                        </div>
                                        <p>{event.extra.away_manager.name}</p>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
    );
}

export default Scoreboard;
