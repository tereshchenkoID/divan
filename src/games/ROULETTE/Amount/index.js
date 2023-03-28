import {useEffect, useState} from "react";

import classNames from "classnames";

import style from './index.module.scss';

const Amount = ({data, step}) => {
    const [toggle, setToggle] = useState(false)

    useEffect(() => {
        if(data.amount_value > 0) {
            setToggle(true)

            setTimeout(() => {
                setToggle(false)
            }, 1000)
        }
    }, [data.amount_value])

    return (
        <div className={style.block}>
            {
                data.amount_value > 0 &&
                <div
                    className={
                        classNames(
                            style.amount,
                            style[data.amount_color]
                        )
                    }
                >
                    {data.amount_value}
                    <div
                        className={
                            classNames(
                                style.animation,
                                toggle && style.active
                            )
                        }
                    >
                        +{step.amount}
                    </div>
                </div>
            }
        </div>
    );
}

export default Amount;