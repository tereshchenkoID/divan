import {useState} from "react";

import {dogsColor} from "constant/config";

import classNames from "classnames";

import Sort from "../Sort";
import Odd from "../Odd";

import style from './index.module.scss';
import Number from "../Number";

const groupByFirstValue = (arr) => {
    let result = [];
    let temp = {};

    for (let i = 0; i < arr.length; i++) {
        let key = arr[i]["a"].split(",")[0];
        if (!temp[key]) {
            temp[key] = [];
        }
        temp[key].push(arr[i]);
    }

    for (let key in temp) {
        result.push(temp[key])
    }

    return result
}

const sortBy = (data, match) => {
    const a = data.a.split(',')
    return match.find(el => a[el[2] - 1] === el[0])
}

const Trincast = ({data}) => {
    const NUMBER = 6
    const [sort, setSort] = useState([])

    return (
        <div className={style.block}>
            <div className={style.row}>
                {
                    data.event.g.c.a.map((el, idx) =>
                        <div
                            key={idx}
                            className={style.cell}
                        >
                            <Number
                                color={idx}
                                data={idx + 1}
                                size={'lg'}
                            />
                        </div>
                    )
                }
                {
                    Array.from({length: NUMBER}).map((el, idx) =>
                        <div
                            key={idx}
                            className={
                                classNames(
                                    style.cell,
                                    style.sm
                                )
                            }
                        >
                            <Sort
                                date={1}
                                data={sort}
                                action={setSort}
                                id={idx + 1}
                            />
                        </div>
                    )
                }
                {
                    Array.from({length: NUMBER}).map((el, idx) =>
                        <div
                            key={idx}
                            className={
                                classNames(
                                    style.cell,
                                    style.sm
                                )
                            }
                        >
                            <Sort
                                date={2}
                                data={sort}
                                action={setSort}
                                id={idx + 1}
                            />
                        </div>
                    )
                }
                {
                    Array.from({length: NUMBER}).map((el, idx) =>
                        <div
                            key={idx}
                            className={
                                classNames(
                                    style.cell,
                                    style.sm
                                )
                            }
                        >
                            <Sort
                                date={3}
                                data={sort}
                                action={setSort}
                                id={idx + 1}
                            />
                        </div>
                    )
                }
            </div>
            <div className={style.row}>
                {
                    (sort.length === 0 || sort.length === NUMBER * 3) &&
                    groupByFirstValue(data.event.g.e.h.b).map((el_c, idx_c) =>
                        <div
                            key={idx_c}
                            className={style.column}
                        >
                            {
                                el_c.map((el_i, idx_i) =>
                                    <div
                                        key={idx_i}
                                        className={style.cell}
                                    >
                                        <Odd
                                            market={data.event.g.e.h.a}
                                            data={el_i}
                                            view={'vertical'}
                                        />
                                    </div>
                                )
                            }
                        </div>
                    )
                }
                {
                    (sort.length > 0 && sort.length !== NUMBER * 3) &&
                    data.event.g.e.h.b.map((el, idx) =>
                        sortBy(el, sort) &&
                        <div
                            key={idx}
                            className={style.cell}
                        >
                            <Odd
                                market={data.event.g.e.h.a}
                                data={el}
                                view={'vertical'}
                            />
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default Trincast;
