import {useEffect, useState} from "react";

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

const setDate = (type) => {
    const today = new Date();
    let result

    if(type === 0) {
        result = today.setHours(today.getHours() - 1);
    }
    else if(type === 1) {
        result = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    }
    else if (type === 2) {
        result = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
    }
    else if(type === 3) {
        result = new Date(today.getFullYear(), today.getMonth(), 1);
    }
    else if(type === 4) {
        result = today.setHours(today.getHours() - 2, 0, 0, 0);
    }
    else if(type === 5) {
        result = today.setDate(today.getDate() - 1);
    }
    else if(type === 6) {
        result = today.setDate(today.getDate() - 7);
    }
    else if(type === 7) {
        result = today.setMonth(today.getMonth() - 1);
    }

    return formatDate(new Date(result))
}

const Settlement = () => {
    const SORT = [
        'Current Hour',
        'Today',
        'This Week',
        'This Month',
        'Last Hours',
        'Yesterday',
        'Last Week',
        'Last Month',
    ]

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({})
    const [label, setLabel] = useState()
    const [time, setTime] = useState([
        formatDate(new Date()),
        formatDate(new Date()),
    ])

    const handleSubmit = () => {
        getData(`/generalOverview/${new Date(time[0]).getTime()}/${new Date(time[1]).getTime()}`).then((json) => {
            setData(json)

            if (json) {
                setLoading(false)
            }
        })
    }

    const handleChange = (event, type) => {
        const a = time.slice(0)
        a[type] = event.target.value

        setTime(a)
    }

    useEffect(() => {
        handleSubmit()
        console.log(1)
    }, [time])

    return (
        <div className={style.block}>
            <div className={style.header}>
                <div className={style.left}>
                    {
                        SORT.map((el, idx) =>
                            // <div>
                            //     <input type="datetime-local" value={setDate(idx)} disabled />
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
                                            setDate(idx),
                                            time[1]
                                        ])
                                    }}
                                >
                                    <Button
                                        type={'green'}
                                        size={'wide'}
                                        text={el}
                                        props={'button'}
                                    />
                                </div>
                            // </div>
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
                    <div className={style.button}>
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
