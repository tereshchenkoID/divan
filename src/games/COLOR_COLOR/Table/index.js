import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

import {gameType, matchStatus} from "constant/config";

import classNames from "classnames";

import {setData} from "store/actions/dataAction";
import {setLive} from "store/actions/liveAction";
import {setModal} from "store/actions/modalAction";
import {getDateTime} from "helpers/getDateTime";

import Loader from "components/Loader";
import Timer from "modules/Timer";
import Alert from "modules/Alert";
import UpdateData from "modules/UpdateData";
import SkipModal from "modules/SkipModal";
import TableChips from "./TableChips";

import style from "./index.module.scss";

const conditionStatus = (status) => {
    switch (status) {
        case matchStatus.ANNOUNCEMENT:
            return 1
        case matchStatus.PROGRESS:
            return 2
        case matchStatus.RESULTS:
            return 3
        default:
            return 1;
    }
}

const checkData = (start, delta) => {
    return start > (new Date().getTime() + delta)
}

const Table = () => {
    const { t } = useTranslation()
    const SORT = [5, 6, 7, 8, 9, 10]
    const dispatch = useDispatch()
    const {data} = useSelector((state) => state.data)
    const {delta} = useSelector((state) => state.delta)
    const {game} = useSelector((state) => state.game)
    const {modal} = useSelector((state) => state.modal)
    const {live} = useSelector((state) => state.live)

    const [find, setFind] = useState(null)
    const [active, setActive] = useState(0)
    const [repeat, setRepeat] = useState(1)
    const [loading, setLoading] = useState(true)
    const [random, setRandom] = useState([])

    const generateRandomArray = (length) => {
        let array = [];

        while (array.length < length) {
            let randomNumber = Math.floor(Math.random() * 49);
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
        setRepeat(1)
        setRandom([])
    }

    const checkStatus = (el) => {
        dispatch(setLive(conditionStatus(el.status)))
    }

    const resetActive = () => {
        setRepeat(1)
        setRandom([])
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

                    // dispatch(setLive(1))
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
            dispatch(setData(game)).then((json) => {
                setActive(json.events[0])
                dispatch(setLive(1))
                setFind(null)
            })
        }
    }, [live]);

    return (
        <div className={style.block}>
            {
                loading
                    ?
                        <Loader type={'block'} />
                    :
                        data.events.length > 0
                            ?
                                <>
                                    {
                                        modal === 1 &&
                                        <SkipModal action={handleNext} />
                                    }
                                    {
                                        (find && find.id !== active.id && (live === 0 || live === 1)) &&
                                        <UpdateData
                                            find={find}
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
                                                        setFind(data.events[0])
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
                                                src={`https://view.divan.bet/engine/shop/resource/${game.logo}`}
                                                alt={'Color'}
                                            />
                                        </div>
                                        <Timer
                                            data={active}
                                            type={gameType.COLOR_COLOR}
                                        />
                                    </div>
                                    <div className={style.body}>
                                        <div className={style.header}>
                                            {
                                                checkData(active.start, delta) &&
                                                <>
                                                    <div className={style.label}>{t('games.COLOR_COLOR.random')}</div>
                                                    <div className={style.label}>{t('games.COLOR_COLOR.repeat')}</div>
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
                                                checkData(active.start, delta)
                                                ?
                                                    <TableChips
                                                        events={data.events}
                                                        repeat={repeat}
                                                        random={random}
                                                        data={active}
                                                    />
                                                :
                                                    <div className={style.live}>
                                                        live
                                                    </div>
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
