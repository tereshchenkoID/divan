import {useEffect, useState} from "react";

import classNames from "classnames";

import style from '../index.module.scss';

const Matched = ({numbers}) => {
    const [quantity, setQuantity] = useState([
        {
            id: 1,
            disabled: true,
        },
        {
            id: 2,
            disabled: true,
        },
        {
            id: 3,
            disabled: true,
        },
        {
            id: 4,
            disabled: true,
        },
        {
            id: 5,
            disabled: true,
        }
    ])

    const unlockStake = () => {
        const a = quantity.slice(0)

        for (let i = 0; i < a.length; i++) {
            a[i].disabled = !numbers[i];
        }

        console.log(a)

        setQuantity(a)
    }

    const clearStake = () => {
        const a = quantity.slice(0)

        for (let i = 0; i < a.length; i++) {
            quantity[i].disabled = true
        }

        setQuantity(a)
    }

    useEffect(() => {
        if (numbers.length > 0 && numbers.length < 11) {
            unlockStake()
        }
        else {
            clearStake()
        }
    }, [numbers])

    return (
        <div>
            <div className={style.content}>
                <div className={style.label}>MATCHED NUMBERS</div>
            </div>
            <div className={style.panel}>
                <div className={style.subtitle}>QUANTITY OF MATCHED NUMBERS</div>
                <div className={style.quantity}>
                    {
                        quantity.map((el, idx) =>
                            <button
                                key={idx}
                                className={
                                    classNames(
                                        style.button,
                                        el.disabled && style.disabled
                                    )
                                }
                            >
                                {el.id}
                            </button>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default Matched;
