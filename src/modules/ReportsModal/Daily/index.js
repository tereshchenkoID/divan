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

     if (type === 0) {
        const startOfWeek = new Date(today);
        const dayOfWeek = today.getDay();
        const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
        startOfWeek.setDate(diff);
        startOfWeek.setHours(0, 0, 0, 0);

        result = startOfWeek
    }
    else if(type === 1) {
        result = new Date(today.getFullYear(), today.getMonth(), 1);
    }
    else if(type === 2) {
         const firstDayOfWeek = new Date(today);
         const dayOfWeek = today.getDay();
         const diff = today.getDate() - dayOfWeek - 13;
         firstDayOfWeek.setDate(diff);
         firstDayOfWeek.setHours(0, 0, 0, 0);

        // const lastWeekStart = new Date(today);
        // lastWeekStart.setDate(today.getDate() - 7 - today.getDay() + 1);
        // lastWeekStart.setHours(0, 0, 0, 0);

        result = firstDayOfWeek
    }
    else if(type === 3) {
        result = new Date(today.getFullYear(), today.getMonth() - 1, 1, 0, 0, 0);
    }

    return result
}

const getTo = (type) => {
    const today = new Date();
    let result

    if (type === 0 || type === 1) {
        result = today
    }
    else if(type === 2) {
        // const lastWeekEnd = new Date(today);
        // lastWeekEnd.setDate(today.getDate() - today.getDay());
        // lastWeekEnd.setHours(23, 59, 59, 999);
        // result = lastWeekEnd

        const firstDayOfWeek = new Date(today);
        const dayOfWeek = today.getDay();
        const diff = today.getDate() - dayOfWeek - 7;
        firstDayOfWeek.setDate(diff);
        firstDayOfWeek.setHours(23, 59, 59, 999);

        result = firstDayOfWeek
    }
    else if(type === 3) {
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

const getTimezone = () => {
    try {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch (error) {
        console.error('Error getting timezone:', error);
        return 'Europe/London';
    }
}

const SORT = [
    'This Week',
    'This Month',
    'Last Week',
    'Last Month',
]

const Daily = () => {
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

        getData(`/dailySums/${f}/${t}?timezoneId=${getTimezone()}`).then((json) => {
            setData(json)

            if (json) {
                setLoading(false)
                setDisabled(false)

                console.log(json)
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
            {
                (!loading && data)
                    ?
                        <Table data={data} />
                    :
                        <div className={style.title}>Generated financial report here</div>
            }
        </div>
    );
}

export default Daily;
