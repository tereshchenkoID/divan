import {useEffect, useState} from "react";

import classNames from "classnames";

import style from '../index.module.scss';

const Anaconda = ({numbers}) => {
    const [disabled, setDisabled] = useState(true)

    useEffect(() => {
        if (numbers.length > 5 && numbers.length < 11) {
            setDisabled(false)
        }
        else {
            setDisabled(true)
        }
    }, [numbers])

    return (
        <div>
            <div className={style.content}>
                <div className={style.label}>ANACONDA</div>
            </div>
            <div className={style.panel}>
                <div className={style.subtitle}>З TO 6 NUMBERS WILL BE MATCHED</div>
                <button
                    className={
                        classNames(
                            style.button,
                            disabled && style.disabled
                        )
                    }
                >
                    ANACONDA
                </button>
            </div>
        </div>
    );
}

export default Anaconda;
