import {useEffect, useState} from "react";

import classNames from "classnames";

import style from './index.module.scss';

const Banner = ({data, timer}) => {
    const [amount, setAmount] = useState(data.amount)
    const britishNumberFormatter = new Intl.NumberFormat("en", { minimumFractionDigits: 1 })

    useEffect(() => {
        if (data.step !== 0) {
            setAmount(amount + data.step)
        }
    }, [timer]);

    return (
        <div
            className={
                classNames(
                    style.block,
                    style[data.name.toLowerCase()]
                )
            }
        >
            <div className={style.left}>
                <div>{data.name}</div>
                <div>Jackpot</div>
            </div>
            <div className={style.right}>
                <span className={style.price}>{britishNumberFormatter.format(amount)}</span>
                <span className={style.symbol}>{data.symbol}</span>
            </div>
        </div>
    );
}

export default Banner;
