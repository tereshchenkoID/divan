import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";

import classNames from "classnames";

import {setData} from "store/actions/dataAction";

import Loader from "components/Loader";
import JackPot from "modules/JackPot";
import TableChips from "./TableChips";

import style from "./index.module.scss";

const Table = () => {
    const dispatch = useDispatch()
    const {game} = useSelector((state) => state.game)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (game !== null) {

            dispatch(setData(game)).then((json) => {
                if (json.events.length > 0) {
                    const f = json.events[0]
                    console.log(f)
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
                            <div className={style.banners}>
                                <JackPot />
                            </div>
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
                                    <div className={style.wrapper}>
                                        <TableChips />
                                    </div>
                                </div>
                            </div>
                        </>
            }
        </div>
    );
}

export default Table;
