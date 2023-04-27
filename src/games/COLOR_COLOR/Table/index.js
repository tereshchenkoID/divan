import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

import classNames from "classnames";

import {setData} from "store/actions/dataAction";

import Loader from "components/Loader";
import TableChips from "./TableChips";

import style from "./index.module.scss";

const Table = () => {
    const { t } = useTranslation()
    const SORT = [5, 6, 7, 8, 9, 10, 15, 20]
    const dispatch = useDispatch()
    const {game} = useSelector((state) => state.game)
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
                    const f = json.events[0]
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
                                <button
                                    className={
                                        classNames(
                                            style.link
                                        )
                                    }
                                 >
                                    16:44
                                </button>
                            </div>
                            <div className={style.info}>
                                <div className={style.league}>
                                    <img
                                        src={`/img/ROULETTE/logo.png`}
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
                                            <button
                                                className={
                                                    classNames(
                                                        style.market,
                                                        style.active
                                                    )
                                                }
                                            >
                                                1x
                                            </button>
                                            <button
                                                className={
                                                    classNames(
                                                        style.market,
                                                        style.active
                                                    )
                                                }
                                            >
                                                2x
                                            </button>
                                            <button
                                                className={
                                                    classNames(
                                                        style.market,
                                                        style.disabled
                                                    )
                                                }
                                            >
                                                3x
                                            </button>
                                        </div>
                                    </div>
                                    <div className={style.wrapper}>
                                        <TableChips
                                            random={random}
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
