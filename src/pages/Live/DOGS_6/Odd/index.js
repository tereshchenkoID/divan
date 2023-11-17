import classNames from "classnames";

import Number from "../Number";

import style from './index.module.scss';

const Odd = ({data, view, text, size = 'md'}) => {
    
    return (
        <div
            className={
                classNames(
                    style.block,
                    style[view],
                    style[size],
                )
            }
        >
            {
                view &&
                <span className={style.numbers}>
                    {
                        data.a.split(',').map((el, idx) =>
                            <Number
                                key={idx}
                                color={el - 1}
                                data={el}
                                size={size}
                            />
                        )
                    }
                </span>
            }
            {
                text &&
                <span className={style.market}>{text}</span>
            }
            <span>{data.b.toFixed(1)}</span>
        </div>
    )
}

export default Odd;
