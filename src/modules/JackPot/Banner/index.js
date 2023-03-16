import classNames from "classnames";

import style from './index.module.scss';

const Banner = ({data, type}) => {
    const britishNumberFormatter = new Intl.NumberFormat('en-IN');

    return (
        <div
            className={
                classNames(
                    style.block,
                    style[type]
                )
            }
        >
            <div className={style.left}>
                <div>{data.name}</div>
                <div>Jackpot</div>
            </div>
            <div className={style.left}>
                <span className={style.price}>{britishNumberFormatter.format(data.amount)}</span>
                <span>{data.symbol}</span>
            </div>
        </div>
    );
}

export default Banner;
