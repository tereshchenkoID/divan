import {useState} from "react";

import classNames from "classnames";

import Numbers from "../Numbers";
import Forecast from "../Forecast";
import Quinella from "../Quinella";
import Trincast from "../Trincast";

import style from './index.module.scss';

const getType = (type, data) => {
    switch (type) {
        case 0:
            return <Numbers data={data}/>
        case 1:
            return <Forecast data={data}/>
        case 2:
            return <Quinella data={data}/>
        case 3:
            return <Trincast data={data}/>
        default:
            return <Numbers data={data}/>
    }
}

const TableChips = ({data}) => {
    const [active, setActive] = useState(0)
    const TYPES  = ['Main', 'Forecast', 'Quinella', 'Trincast']

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
            <div className={style.wrapper}>
                {
                    getType(active, data)
                }
            </div>
        </div>
    );
}

export default TableChips;
