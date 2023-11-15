import {gameType, matchStatus} from "constant/config";
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

import classNames from "classnames";

import useSocket from "hooks/useSocket";

import {setLive} from "store/actions/liveAction";
import {setData} from "store/actions/dataAction";
import {setModal} from "store/actions/modalAction";

import {checkData} from "helpers/checkData";
import {conditionStatus} from "helpers/conditionStatus";
import {checkCmd} from "helpers/checkCmd";

import Alert from "modules/Alert";
import Timer from "modules/Timer";
import UpdateData from "modules/UpdateData";
import SkipModal from "modules/SkipModal";
import Loader from "components/Loader";
import Icon from "components/Icon";
import Live from "../Live";

import Odd from "./Odd";
import Subtitle from "./Subtitle";

import style from './index.module.scss';

const filterColumn = (data) => {
    const result = [{
        data: []
    }]
    let count = 0

    data.map(el => {
        const a = el.a.split('-')
        const sum = parseInt(a[0], 10) + parseInt(a[1], 10)

        if (sum >= count) {
            result[result.length - 1].data.push(el)
            count = sum
        }
        else {
            result.push({
                data: [
                    el
                ]
            })
            count = 0
        }

        return true
    })

    return result
}

const Table = () => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { sendMessage } = useSocket()

    const {game} = useSelector((state) => state.game)
    const {data} = useSelector((state) => state.data)
    const {live} = useSelector((state) => state.live)
    const {modal} = useSelector((state) => state.modal)
    const {update} = useSelector((state) => state.update)
    const {isConnected, receivedMessage} = useSelector((state) => state.socket);

    const [loading, setLoading] = useState(true)
    const [find, setFind] = useState(null)
    const [active, setActive] = useState(0)
    const [group, setGroup] = useState(0)
    const [toggle, setToggle] = useState({
        id: null,
        toggle: false
    })

    const resetActive = () => {
        setGroup(0)
        setToggle({
            id: null,
            toggle: false
        })
    }

    const handleToggle = (id) => {
        setToggle({
            id: id,
            toggle: id === toggle.id ? !toggle.toggle : true
        })
    }

    const checkStatus = (el) => {
        if (!checkData(update) && update.event.id === el.id) {
            dispatch(setLive(conditionStatus(update.event.status)))
        }
        else {
            dispatch(setLive(conditionStatus(el.status)))
        }
    }

    const handleNext = () => {
        resetActive()
        setFind(data.events[0])
        setActive(data.events[1])
        dispatch(setLive(1))
        dispatch(setModal(0))
    }

    useEffect(() => {
        if (game !== null) {
            setLoading(true)

            if (isConnected) {
                sendMessage({cmd:`feed/${sessionStorage.getItem('authToken')}/${game.type}/${game.id}`})
            }
            else {
                dispatch(setData(game)).then((json) => {
                    if (json.events.length > 0) {

                        if (json.events[0].status !== matchStatus.ANNOUNCEMENT) {
                            setFind(json.events[0])
                            setActive(json.events[1])
                            checkStatus(json.events[1])
                        }
                        else {
                            setFind(null)
                            setActive(json.events[0])
                            dispatch(setLive(1))
                        }

                        setLoading(false)
                    }
                    else {
                        setLoading(false)
                    }
                })
            }
        }
    }, [game]);

    useEffect(() => {
        if (receivedMessage !== '' && checkCmd('feed', receivedMessage.cmd)) {

            if (receivedMessage.events && receivedMessage.events[0].type === game.type && modal !== 2) {
                dispatch(setData(game, receivedMessage)).then(() => {
                    if (receivedMessage.events[0].status !== matchStatus.ANNOUNCEMENT) {
                        setFind(receivedMessage.events[0])
                        setActive(receivedMessage.events[1])
                        checkStatus(receivedMessage.events[1])
                    }
                    else {
                        setFind(null)
                        setActive(receivedMessage.events[0])
                        dispatch(setLive(1))
                    }

                    setLoading(false)
                })
            }
        }
    }, [receivedMessage])

    useEffect(() => {
        if (modal === 1) {
            handleNext()
        }

        if (live === 4) {
            setFind(null)
            setActive(data.events[0])
            dispatch(setLive(1))
        }
    }, [live]);

    return (
        <div className={style.block}>
            {
                loading
                    ?
                        <Loader type={'block'} />
                    :
                        data &&
                        data.events.length > 0
                            ?
                                <>
                                    {
                                        modal === 1 &&
                                        <SkipModal action={handleNext} />
                                    }
                                    {
                                        active.id !== data.events[0].id &&
                                        <UpdateData
                                            find={find || data.events[0]}
                                            setActive={setActive}
                                            setFind={setFind}
                                        />
                                    }
                                    <div className={style.tab}>
                                        {
                                            data.events.map((el, idx) =>
                                                <button
                                                    key={idx}
                                                    className={
                                                        classNames(
                                                            style.link,
                                                            active.id === el.id && style.active
                                                        )
                                                    }
                                                    onClick={() => {
                                                        checkStatus(el)
                                                        setActive(el)
                                                        resetActive()
                                                    }}
                                                >
                                                    {t('interface.week')} {el.league.week}
                                                </button>
                                            )
                                        }
                                    </div>
                                    <div className={style.info}>
                                        <div className={style.league}>
                                            <img
                                                src={`/img/icon/${game.id}.png`}
                                                alt={active.league.name}
                                            />
                                        </div>
                                        <Timer
                                            data={active}
                                            type={gameType.FOOTBALL_LEAGUE}
                                        />
                                    </div>
                                    <div className={style.body}>
                                        {
                                            live === 1
                                                ?
                                                    <>
                                                        <div className={style.sort}>
                                                            {
                                                                active.league.matches[0].odds[0].groups.map((el, idx) =>
                                                                    (
                                                                        el.name !== 'Score' &&
                                                                        el.name !== 'Total Goals'
                                                                    ) &&
                                                                    <button
                                                                        key={idx}
                                                                        className={
                                                                            classNames(
                                                                                style.market,
                                                                                group === idx && style.active
                                                                            )
                                                                        }
                                                                        onClick={() => {
                                                                            setGroup(idx)
                                                                            setToggle({
                                                                                id: null,
                                                                                toggle: false
                                                                            })
                                                                        }}
                                                                    >
                                                                        {el.name}
                                                                    </button>
                                                                )
                                                            }
                                                        </div>
                                                        <div
                                                            className={
                                                                classNames(
                                                                    style.head,
                                                                    style.row
                                                                )
                                                            }
                                                        >
                                                            <div className={style.cell} />
                                                            <div className={style.cell} />
                                                            <div className={style.cell}>
                                                                <div
                                                                    className={
                                                                        classNames(
                                                                            style.odds,
                                                                            (toggle.id !== null && toggle.toggle) && style.hide
                                                                        )
                                                                    }
                                                                >
                                                                    {
                                                                        Object.values(active.league.matches[0].odds[0].groups[group].markets).map((el, idx) =>
                                                                            <div
                                                                                key={idx}
                                                                                className={style.column}
                                                                            >
                                                                                {
                                                                                    el.name &&
                                                                                    <div className={style.legend}>
                                                                                        <Subtitle
                                                                                            data={el.name.replaceAll('_', ' ')}
                                                                                            size={'sm'}
                                                                                        />
                                                                                    </div>
                                                                                }
                                                                                {
                                                                                    el.headers.map((el, idx) =>
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
                                                            </div>
                                                        </div>
                                                        <div className={style.wrapper}>
                                                            {
                                                                active.league.matches.map((el_m, idx_m) =>
                                                                    <div
                                                                        key={idx_m}
                                                                        className={style.row}
                                                                    >
                                                                        <div className={style.cell}>
                                                                            <div className={style.position}>{el_m.pos}</div>
                                                                        </div>
                                                                        <div className={style.cell}>
                                                                            <div
                                                                                className={
                                                                                    classNames(
                                                                                        style.meta,
                                                                                        toggle.toggle && style.disabled,
                                                                                        (toggle.id === idx_m && toggle.toggle ) && style.active
                                                                                    )
                                                                                }
                                                                                onClick={() => {
                                                                                    handleToggle(idx_m)
                                                                                }}
                                                                            >
                                                                                <div>
                                                                                    <div className={style.logo}>
                                                                                        <img
                                                                                            src={`https://view.divan.bet/engine/shop/resource/${el_m.teams.home.img}`}
                                                                                            alt={el_m.teams.home.name}
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                                <div>{el_m.teams.home.name}</div>
                                                                                <div>vs</div>
                                                                                <div>{el_m.teams.away.name}</div>
                                                                                <div>
                                                                                    <div className={style.logo}>
                                                                                        <img
                                                                                            src={`https://view.divan.bet/engine/shop/resource/${el_m.teams.away.img}`}
                                                                                            alt={el_m.teams.away.name}
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                                <div>
                                                                                    <button
                                                                                        className={style.toggle}
                                                                                        aria-label={"Toggle"}
                                                                                    >
                                                                                        <Icon id={'arrow-right'} />
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className={style.cell}>
                                                                            <div className={style.odds}>
                                                                                {
                                                                                    Object.values(el_m.odds[0].groups[group].markets).map((el_o, idx_o)  =>
                                                                                        <div
                                                                                            key={idx_o}
                                                                                            className={style.column}
                                                                                        >
                                                                                            {
                                                                                                el_o.outcomes.map((el, idx) =>
                                                                                                    <div
                                                                                                        key={idx}
                                                                                                        className={style.odd}
                                                                                                    >
                                                                                                        <Odd
                                                                                                            data={{
                                                                                                                ...el,
                                                                                                                ...el_m.teams,
                                                                                                                pos: el_m.pos,
                                                                                                                market: el_o.printname,
                                                                                                                c: el.c,
                                                                                                                sid: active.id,
                                                                                                                mid: el_m.id,
                                                                                                                start: active.start,
                                                                                                                type: active.type,
                                                                                                                m_old: el_o.name,
                                                                                                                o_old: el.a
                                                                                                            }}
                                                                                                        />
                                                                                                    </div>
                                                                                                )
                                                                                            }
                                                                                        </div>
                                                                                    )
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            }
                                                            {
                                                                (toggle.id !== null && toggle.toggle) &&
                                                                <div className={
                                                                    classNames(
                                                                        style.dropdown,
                                                                        toggle.toggle && style.active
                                                                    )
                                                                }
                                                                >
                                                                    <div className={style.subtitle}>{active.league.matches[toggle.id].odds[0].groups[6].name}</div>
                                                                    <div className={style.goals}>
                                                                        {
                                                                            active.league.matches[toggle.id].odds[0].groups[6].markets[0].outcomes.map((el, idx) =>
                                                                                <div
                                                                                    key={idx}
                                                                                    className={style.outcome}
                                                                                >
                                                                                    <div className={style.button}>
                                                                                        <Odd
                                                                                            data={{
                                                                                                ...el,
                                                                                                ...active.league.matches[toggle.id].teams,
                                                                                                pos: active.league.matches[toggle.id].pos,
                                                                                                market: active.league.matches[toggle.id].odds[0].groups[6].markets[0].printname,
                                                                                                c: el.a,
                                                                                                sid: active.id,
                                                                                                mid: active.league.matches[toggle.id].id,
                                                                                                start: active.start,
                                                                                                type: active.type,
                                                                                                m_old: active.league.matches[toggle.id].odds[0].groups[6].markets[0].name,
                                                                                                o_old: el.a
                                                                                            }}
                                                                                            label={el.a}
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                        }
                                                                    </div>
                                                                    <div className={style.goals}>
                                                                        {
                                                                            active.league.matches[toggle.id].odds[0].groups[7].markets.map((el, idx) =>
                                                                                <div
                                                                                    key={idx}
                                                                                    className={style.outcomes}
                                                                                >
                                                                                    <div className={style.subtitle}>{el.headers[0]}</div>
                                                                                    <div className={style.list}>
                                                                                        {
                                                                                            filterColumn(el.outcomes).map((el, idx) =>
                                                                                                <div
                                                                                                    key={idx}
                                                                                                    className={style.outcomes}
                                                                                                >
                                                                                                    {
                                                                                                        el.data.map((el, idx) =>
                                                                                                            <div
                                                                                                                key={idx}
                                                                                                                className={style.outcome}
                                                                                                            >
                                                                                                                <div className={style.button}>
                                                                                                                    <Odd
                                                                                                                        data={{
                                                                                                                            ...el,
                                                                                                                            ...active.league.matches[toggle.id].teams,
                                                                                                                            pos: active.league.matches[toggle.id].pos,
                                                                                                                            market: active.league.matches[toggle.id].odds[0].groups[7].markets[0].printname,
                                                                                                                            c: el.a,
                                                                                                                            sid: active.id,
                                                                                                                            mid: active.league.matches[toggle.id].id,
                                                                                                                            start: active.start,
                                                                                                                            type: active.type,
                                                                                                                            m_old: active.league.matches[toggle.id].odds[0].groups[7].markets[0].name,
                                                                                                                            o_old: el.a
                                                                                                                        }}
                                                                                                                        label={el.a}
                                                                                                                    />
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
                                                                    </div>
                                                                </div>
                                                            }
                                                        </div>
                                                    </>
                                                :
                                                    <Live />
                                        }
                                    </div>
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
