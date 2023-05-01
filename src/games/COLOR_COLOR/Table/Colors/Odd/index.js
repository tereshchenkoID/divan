import {useEffect, useState} from "react";

import classNames from "classnames";

import Number from "../../Number";

import style from './index.module.scss';

const Odd = ({
   data,
   color,
   size = null,
   date,
   action,
   market
}) => {
    const [active, setActive] = useState(false)

    useEffect(() => {
        !date.length && setActive(false)
    }, [date])

    const addSingleStake = (el, o = '') => {
        const f = date.find(i => {
            return i.id === el.id
        })

        if (f) {
            const index = date.indexOf(f)
            action([...date.slice(0, index), ...date.slice(index + 1)])
        }
        else {
            action([...date, {
                id: el.id,
                b: el.b || 0,
                outcome: el.a,
                color: o,
                market: market
            }])
        }

        setActive(!active)
    }

    return (
        <button
            className={
                classNames(
                    style.block,
                    active && style.active
                )
            }
            onClick={() => {
                addSingleStake(data, color)
            }}
        >
            <Number
                data={data}
                color={color}
                size={size}
            />
        </button>
    );
}

export default Odd;
