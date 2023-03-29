import {useState} from "react";

import classNames from "classnames";

import JackPot from "modules/JackPot";
import TableChips from "./TableChips";

import style from "./index.module.scss";

const Table = () => {
    const SORT = [1, 2, 3, 5, 7, 10]
    const [random, setRandom] = useState([])

    const generateRandomArray = (length) => {
        let array = [];

        while (array.length < length) {
            let randomNumber = Math.floor(Math.random() * 36);
            if (!array.includes(randomNumber)) {
                array.push(randomNumber);
            }
        }

        setRandom(array);
    }

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
                    <img
                        src={`/img/ROULETTE/logo.png`}
                        alt={'Roulette'}
                    />
                </div>
            </div>
            <div className={style.body}>
                <div className={style.table}>
                    <div className={style.label}>RANDOM</div>
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
                    <div className={style.wrapper}>
                        <TableChips random={random}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Table;
