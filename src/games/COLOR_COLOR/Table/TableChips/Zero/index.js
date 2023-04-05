import {useEffect, useState} from "react";

import classNames from "classnames";

import {colorType} from "constant/config";

import style from '../index.module.scss';

const Zero = ({numbers, type, setType}) => {
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
                            disabled && style.disabled,
                            type === colorType.BET_ZERO && style.active
                        )
                    }
                    onClick={() => {
                        setType(type === colorType.BET_ZERO ? '' : colorType.BET_ZERO)
                    }}
                >
                    BET ZERO
                </button>
            </div>
        </div>
    );
}

export default Zero;
