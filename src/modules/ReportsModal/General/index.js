import {useState} from "react";

import classNames from "classnames";

import {getData} from "helpers/api";

import Button from "components/Button";
import Table from "./Table";

import style from './index.module.scss';

const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const getFrom = (type) => {
    const today = new Date();
    let result

    if(type === 0) {
        today.setHours(today.getHours(), 0, 0, 0);
        result = today
    }
    else if(type === 1) {
        result = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    }
    else if (type === 2) {
        const startOfWeek = new Date(today);
        const dayOfWeek = today.getDay();
        const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
        startOfWeek.setDate(diff);
        startOfWeek.setHours(0, 0, 0, 0);

        result = startOfWeek
    }
    else if(type === 3) {
        result = new Date(today.getFullYear(), today.getMonth(), 1);
    }
    else if(type === 4) {
        result = today.setHours(today.getHours() - 1, 0, 0, 0);
    }
    else if(type === 5) {
        today.setDate(today.getDate() - 1);
        today.setHours(0, 0, 0, 0);
        result = today
    }
    else if(type === 6) {
        const lastWeekStart = new Date(today);
        lastWeekStart.setDate(today.getDate() - 7 - today.getDay() + 1);
        lastWeekStart.setHours(0, 0, 0, 0);

        result = lastWeekStart
    }
    else if(type === 7) {
        result = new Date(today.getFullYear(), today.getMonth() - 1, 1, 0, 0, 0);
    }

    return result
}

const getTo = (type) => {
    const today = new Date();
    let result

    if (type === 0 || type === 1 || type === 2 || type === 3) {
        result = today
    }
    else if(type === 4) {
        result = today.setHours(today.getHours(), 0, 0, 0);
    }
    else if(type === 5) {
        today.setDate(today.getDate() - 1);
        today.setHours(23, 59, 59, 999);
        result = today
    }
    else if(type === 6) {
        const lastWeekEnd = new Date(today);
        lastWeekEnd.setDate(today.getDate() - today.getDay());
        lastWeekEnd.setHours(23, 59, 59, 999);
        result = lastWeekEnd
    }
    else if(type === 7) {
        const last = new Date(today.getFullYear(), today.getMonth(), 0);
        last.setHours(23, 59, 59, 999);
        result = last
    }

    return result
}

const setDate = (type, start) => {
    let result = start === 0 ? getFrom(type) : getTo(type)

    return formatDate(new Date(result))
}


// 13.47 19.07
// This week 17.07.2023 00:00 - current
// Current Hour 13.00 - current
// Last Hours 12.00 - 13.00
// Yesterday - 18.07.2023 00:00:00 - 18.07.2023 23.59.59
// Last week 10.07.2023 00:00:00 - 16.07.2023 23.59.59
// Last month 01.06.2023 00:00:00 - 30.06.2023 23.59.59

const Settlement = () => {
    const SORT = [
        'Current Hour',
        'Today',
        'This Week',
        'This Month',
        'Last Hour',
        'Yesterday',
        'Last Week',
        'Last Month',
    ]

    const [disabled, setDisabled] = useState(true)
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({})
    const [label, setLabel] = useState()
    const [time, setTime] = useState([
        formatDate(new Date()),
        formatDate(new Date()),
    ])

    const handleSubmit = (from = null, to = null) => {
        const f = from ? new Date(from).getTime() : new Date(time[0]).getTime()
        const t = to ? new Date(to).getTime() : new Date(time[1]).getTime()
        getData(`/generalOverview/${f}/${t}`).then((json) => {
            setData(json)

            if (json) {
                setLoading(false)
                setDisabled(false)
            }
        })
    }

    const handleChange = (event, type) => {
        setDisabled(false)

        const a = time.slice(0)
        a[type] = event.target.value

        setTime(a)
    }

    return (
        <div className={style.block}>
            <div className={style.header}>
                <div className={style.left}>
                    {
                        SORT.map((el, idx) =>
                            <div
                                key={idx}
                                className={
                                    classNames(
                                        style.button,
                                        label === idx && style.active
                                    )
                                }
                                onClick={() => {
                                    setLabel(idx)
                                    setTime([
                                        setDate(idx, 0),
                                        setDate(idx, 1),
                                    ])
                                    handleSubmit(
                                        setDate(idx, 0),
                                        setDate(idx, 1)
                                    )
                                }}
                            >
                                <Button
                                    type={'green'}
                                    size={'wide'}
                                    text={el}
                                    props={'button'}
                                />
                            </div>
                        )
                    }
                </div>
                <div className={style.right}>
                    <input
                        type={'datetime-local'}
                        className={style.field}
                        value={time[0]}
                        onChange={(event) => {
                            handleChange(event, 0)
                        }}
                    />
                    <input
                        type={'datetime-local'}
                        className={style.field}
                        value={time[1]}
                        onChange={(event) => {
                            handleChange(event, 1)
                        }}
                    />
                    <div />
                    <div
                        className={
                            classNames(
                                disabled && style.disabled,
                                style.button,
                            )
                        }
                    >
                        <Button
                            type={'green'}
                            size={'wide'}
                            text={'Generate'}
                            props={'button'}
                            action={() => {
                                handleSubmit()
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className={style.table}>
                {
                    !loading &&
                    data &&
                    <Table data={data} />
                }
            </div>
        </div>
    );
}

export default Settlement;
