import {useEffect, useState} from "react";

import classNames from "classnames";

import style from './index.module.scss';

import Double from "./Double";
import Triple from "./Triple";
import Extra from "./Extra";

const getType = (type, data) => {
    switch (type) {
        case 0:
            return <Double data={data}/>
        case 1:
            return <Triple data={data}/>
        case 2:
            return <Extra data={data}/>
        default:
            return <Double data={data}/>
    }
}
const Races = ({data}) => {
    const [active, setActive] = useState(0)
    const TYPES  = ['System double', 'System Triple', 'Extra Bets']

    useEffect(() => {
        setActive(0)
    }, [data]);

    return (
        <div className={style.block}>
            <div className={style.header}>
                {
                    TYPES.map((el, idx) =>
                        <button
                            key={idx}
                            className={
                                classNames(
                                    style.button,
                                    active === idx && style.active
                                )
                            }
                            onClick={() => {
                                setActive(idx)
                            }}
                        >
                            {el}
                        </button>
                    )
                }
            </div>
            <div className={style.body}>
                {
                    getType(active, data)
                }
            </div>
        </div>
    );
}

export default Races;
