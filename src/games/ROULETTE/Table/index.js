import classNames from "classnames";

import JackPot from "modules/JackPot";

import TableChips from "./TableChips";

import style from "./index.module.scss";

const Table = () => {

    return (
        <div className={style.block}>
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

                </div>
            </div>
            <div className={style.body}>
                <div
                    className={
                        classNames(
                            style.table,
                            style.active
                        )
                    }
                >
                    <div className={style.sort}>
                        <button
                            className={
                                classNames(
                                    style.market
                                )
                            }
                        >
                            1
                        </button>
                        <button
                            className={
                                classNames(
                                    style.market
                                )
                            }
                        >
                            2
                        </button>
                    </div>
                    <div className={style.wrapper}>
                        <TableChips />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Table;
