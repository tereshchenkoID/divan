import {useEffect, useState} from "react";

import Odd from "../Odd";

import style from './index.module.scss';
import classNames from "classnames";

const Translation = () => {
    const [data, setData] = useState([
        {value: 1, active: false},
        {value: 2, active: false},
        {value: 3, active: false},
        {value: 4, active: false},
        {value: 5, active: false},
        {value: 6, active: false},
        {value: 7, active: false},
        {value: 8, active: false},
        {value: 9, active: false},
        {value: 10, active: false},
        {value: 11, active: false},
        {value: 12, active: false},
        {value: 13, active: false},
        {value: 14, active: false},
        {value: 15, active: false},
        {value: 16, active: false},
        {value: 17, active: false},
        {value: 18, active: false},
        {value: 19, active: false},
        {value: 20, active: false},
        {value: 21, active: false},
        {value: 22, active: false},
        {value: 23, active: false},
        {value: 24, active: false},
        {value: 25, active: false},
        {value: 26, active: false},
        {value: 27, active: false},
        {value: 28, active: false},
        {value: 29, active: false},
        {value: 30, active: false},
        {value: 31, active: false},
        {value: 32, active: false},
        {value: 33, active: false},
        {value: 34, active: false},
        {value: 35, active: false},
        {value: 36, active: false},
        {value: 37, active: false},
        {value: 38, active: false},
        {value: 39, active: false},
        {value: 40, active: false},
        {value: 41, active: false},
        {value: 42, active: false},
        {value: 43, active: false},
        {value: 44, active: false},
        {value: 45, active: false},
        {value: 46, active: false},
        {value: 47, active: false},
        {value: 48, active: false},
        {value: 49, active: false},
        {value: 50, active: false},
        {value: 51, active: false},
        {value: 52, active: false},
        {value: 53, active: false},
        {value: 54, active: false},
        {value: 55, active: false},
        {value: 56, active: false},
        {value: 57, active: false},
        {value: 58, active: false},
        {value: 59, active: false},
        {value: 60, active: false},
        {value: 61, active: false},
        {value: 62, active: false},
        {value: 63, active: false},
        {value: 64, active: false},
        {value: 65, active: false},
        {value: 66, active: false},
        {value: 67, active: false},
        {value: 68, active: false},
        {value: 69, active: false},
        {value: 70, active: false},
        {value: 71, active: false},
        {value: 72, active: false},
        {value: 73, active: false},
        {value: 74, active: false},
        {value: 75, active: false},
        {value: 76, active: false},
        {value: 77, active: false},
        {value: 78, active: false},
        {value: 79, active: false},
        {value: 80, active: false}
    ])
    
    const results = [1, 2, 8, 6, 12, 10, 78, 35, 22, 55, 23, 51, 40, 60, 39, 70, 7, 11, 13, 45]
    const [current, setCurrent] = useState(0);
    const [columns, setColumn] = useState([[], [], [], []])
    
    const setActive = (index) => {
        const newData = [...data];
        newData[index - 1] = { ...data[index - 1], active: true };
        setData(newData);
        
        const newColumns = [...columns]
        newColumns[results.indexOf(index) % 4].push({
            value: newData[index - 1].value,
            transform: Math.floor(Math.random() * 120  - 60),
        })
        setColumn(newColumns)
    }
    
    useEffect(() => {
        const intervalId = setInterval(() => {
            if (current === results.length) {
                clearInterval(intervalId)
                return false
            }
            else {
                setCurrent((prevIndex) => prevIndex + 1)
                setActive(results[Number(current)])
            }
            
        }, 3000);

        return () => {
            clearInterval(intervalId);
        }
    }, [current]);
    
    return (
        <div className={style.block}>
            <div className={style.row}>
                {
                    data.map((el, idx) =>
                        <div
                            key={idx}
                            className={
                                classNames(
                                    style.cell,
                                    el.active && style.active,
                                )
                            }
                        >
                            <Odd
                                data={el.value}
                            />
                        </div>
                    )
                }
            </div>
            
            <div className={style.grid}>
                {columns.map((c_el, c_idx) => (
                    <div
                        key={c_idx}
                        className={style.column}
                    >
                        {c_el.map((el, idx) => (
                            <div
                                key={idx}
                                className={style.odd}
                            >
                                <Odd
                                    data={el.value}
                                    size={'xxl'}
                                    transform={el.transform}
                                />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Translation;
