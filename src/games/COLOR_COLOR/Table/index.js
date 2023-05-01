import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

import classNames from "classnames";

import {setData} from "store/actions/dataAction";
import {getDateTime} from "helpers/getDateTime";

import Loader from "components/Loader";
import TableChips from "./TableChips";

import style from "./index.module.scss";

const Table = () => {
    const { t } = useTranslation()
    const SORT = [5, 6, 7, 8, 9, 10]
    const dispatch = useDispatch()
    const {data} = useSelector((state) => state.data)
    const {game} = useSelector((state) => state.game)
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

    useEffect(() => {
        if (game !== null) {

            dispatch(setData(game)).then((json) => {
                if (json.events.length > 0) {
                    setActive(json.events[0])
                }

                setLoading(false)
            })
        }

    }, [game]);

    return (
        <div className={style.block}>
            {
                loading
                    ?
                        <Loader
                            type={'block'}
                        />
                    :
                        <>
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
                                                setActive(el)
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
                                        alt={'Roulette'}
                                    />
                                </div>
                            </div>
                            <div className={style.body}>
                                <div className={style.table}>
                                    <div className={style.header}>
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
                                    </div>
                                    <div className={style.wrapper}>
                                        <TableChips
                                            random={random}
                                            data={active}
                                            t={t}
                                        />
                                    </div>
                                </div>
                            </div>
                        </>
            }
        </div>
    );
}

export default Table;
