import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

import classNames from "classnames";

import {gameType, matchStatus} from "constant/config";

import {setModal} from "store/actions/modalAction";
import {setLive} from "store/actions/liveAction";
import {setData} from "store/actions/dataAction";

import {getDateTime} from "helpers/getDateTime";
import {conditionStatus} from "helpers/conditionStatus";
import {checkTime} from "helpers/checkTime";
import {checkData} from "helpers/checkData"

import TableChips from "./TableChips";
import Loader from "components/Loader";
import SkipModal from "modules/SkipModal";
import UpdateData from "modules/UpdateData";
import Alert from "modules/Alert";
import Timer from "modules/Timer";

import style from "./index.module.scss";

const Table = () => {
    const { t } = useTranslation()
    const SORT = [1, 2, 3, 4, 5, 6, 7, 8]
    const dispatch = useDispatch()
    const {data} = useSelector((state) => state.data)
    const {delta} = useSelector((state) => state.delta)
    const {game} = useSelector((state) => state.game)
    const {modal} = useSelector((state) => state.modal)
    const {live} = useSelector((state) => state.live)
    const {update} = useSelector((state) => state.update)

    const [find, setFind] = useState(null)
    const [active, setActive] = useState(0)
    const [repeat, setRepeat] = useState(1)
    const [random, setRandom] = useState([])
    const [loading, setLoading] = useState(true)

    const generateRandomArray = (length) => {
        let array = [];

        while (array.length < length) {
            let randomNumber = Math.floor(Math.random() * 80);
            if (!array.includes(randomNumber)) {
                array.push(randomNumber);
            }
        }

        setRandom(array);
    }

    const handleNext = () => {
        setFind(data.events[0])
        setActive(data.events[1])
        dispatch(setModal(0))
        dispatch(setLive(1))
        dispatch(setData(game))
        setRepeat(1)
        setRandom([])
    }

    const checkStatus = (el) => {
        if (!checkData(update) && update.event.id === el.id) {
            dispatch(setLive(conditionStatus(update.event.status)))
        }
        else {
            dispatch(setLive(conditionStatus(el.status)))
        }
    }

    const resetActive = () => {
        setRepeat(1)
        setRandom([])

        if (data.events[0].status !== matchStatus.ANNOUNCEMENT) {
            setFind(data.events[0])
        }
    }

    const updateGame = () => {
        let a

        dispatch(setData(game)).then((json) => {
            if (json.events[0].status === matchStatus.ANNOUNCEMENT) {
                setFind(null)
                setActive(json.events[0])
                dispatch(setLive(1))

                clearInterval(a)
                return true
            }
        })

        a = setTimeout(() => {
            updateGame()
        }, 4000)
    }

    useEffect(() => {
        if (game !== null) {

            dispatch(setData(game)).then((json) => {
                if (json.events.length > 0) {

                    if (json.events[0].status !== matchStatus.ANNOUNCEMENT) {
                        setActive(json.events[1])
                        setFind(json.events[0])
                    }
                    else {
                        setActive(json.events[0])
                    }

                    setLoading(false)
                }
                else {
                    setLoading(false)
                }
            })
        }

    }, [game]);

    useEffect(() => {
        if (modal === 1) {
            handleNext()
        }

        if (live === 4) {
            updateGame()
        }
    }, [live]);

    return (
        <div className={style.block}>
            {
                loading
                    ?
                        <Loader
                            type={'block'}
                        />
                    :
                        data.events.length > 0
                            ?
                                <>
                                    {
                                        modal === 1 &&
                                        <SkipModal action={handleNext} />
                                    }
                                    {
                                        (live < 2 && active.id !== data.events[0].id) &&
                                        <UpdateData
                                            find={find || data.events[0]}
                                            active={active}
                                            setActive={setActive}
                                            setFind={setFind}
                                            setRepeat={setRepeat}
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
                                                            el.id === active.id && style.active
                                                        )
                                                    }
                                                    onClick={() => {
                                                        checkStatus(el)
                                                        setActive(el)
                                                        resetActive()
                                                    }}
                                                >
                                                    {getDateTime(el.start, 3)}
                                                </button>
                                            )
                                        }
                                    </div>
                                    <div className={style.info}>
                                        <div className={style.league}>
                                            <img
                                                src={`/img/icon/${game.id}.svg`}
                                                alt={'Keno'}
                                            />
                                        </div>
                                        <Timer
                                            data={active}
                                            type={gameType.KENO}
                                        />
                                    </div>
                                    <div className={style.body}>
                                        <div className={style.header}>
                                            {
                                                checkTime(active.start, delta) &&
                                                <>
                                                    <div className={style.label}>{t('games.KENO.random')}</div>
                                                    <div className={style.label}>{t('games.KENO.repeat')}</div>
                                                    <div className={style.sort}>
                                                        {
                                                            SORT.map((el, idx) =>
                                                                <button
                                                                    key={idx}
                                                                    className={ style.market}
                                                                    onClick={() => {
                                                                        generateRandomArray(el)
                                                                    }}
                                                                >
                                                                    {el}
                                                                </button>
                                                            )
                                                        }
                                                    </div>
                                                    <div className={style.sort}>
                                                        {
                                                            data.events.map((el, idx) =>
                                                                <button
                                                                    key={idx}
                                                                    className={
                                                                        classNames(
                                                                            style.market,
                                                                            (find && idx === data.events.length - 1) && style.disabled,
                                                                            idx + 1 === repeat && style.active
                                                                        )
                                                                    }
                                                                    onClick={() => {
                                                                        setRepeat(idx + 1)
                                                                    }}
                                                                >
                                                                    {idx + 1}x
                                                                </button>
                                                            )
                                                        }
                                                    </div>
                                                </>
                                            }
                                        </div>
                                        <div className={style.wrapper}>
                                            {
                                                checkTime(active.start, delta)
                                                    ?
                                                        <TableChips
                                                            events={data.events}
                                                            repeat={repeat}
                                                            random={random}
                                                            data={active}
                                                            setRepeat={setRepeat}
                                                        />
                                                    :
                                                        <div className={style.live} />
                                            }
                                        </div>
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
