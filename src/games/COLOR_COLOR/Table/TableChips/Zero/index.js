import {useEffect, useState} from "react";

import classNames from "classnames";

import style from '../index.module.scss';

const Zero = ({numbers}) => {
    const [disabled, setDisabled] = useState(true)

    useEffect(() => {
        if (numbers.length > 0 && numbers.length < 11) {
            setDisabled(false)
        }
        else {
            setDisabled(true)
        }
    }, [numbers])

    return (
        <div>
            <div className={style.content}>
                <div className={style.label}>BET ZERO</div>
            </div>
            <div className={style.panel}>
                <div className={style.subtitle}>SELECTED NUMBERS WON T BE MATCHED</div>
                <button
                    className={
                        classNames(
                            style.button,
                            disabled && style.disabled
                        )
                    }
                >
                    BET ZERO
                </button>
            </div>
        </div>
    );
}

export default Zero;
