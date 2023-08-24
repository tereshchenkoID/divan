import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import useSocket from "hooks/useSocket";

import classNames from "classnames";

import {getData} from "helpers/api";
import {getTimezone} from "helpers/getTimezone";
import {getDateTime} from "helpers/getDateTime";
import checkCmd from "helpers/checkCmd";

import Button from "components/Button";
import Loader from "components/Loader";
import Table from "./Table";

import style from './index.module.scss';

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
        const lastWeekStart = new Date(today);
        lastWeekStart.setDate(today.getDate() - 7 - today.getDay() + 1);
        lastWeekStart.setHours(0, 0, 0, 0);

        result = lastWeekStart
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
        const lastWeekEnd = new Date(today);
        lastWeekEnd.setDate(today.getDate() - today.getDay());
        lastWeekEnd.setHours(23, 59, 59, 999);
        result = lastWeekEnd
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

    return getDateTime(new Date(result), 4)
}

const Daily = () => {
    const { t } = useTranslation()
    const { sendMessage } = useSocket()
    const {isConnected, receivedMessage} = useSelector((state) => state.socket)

    const SORT = [
        t('interface.this_week'),
        t('interface.this_month'),
        t('interface.last_week'),
        t('interface.last_month'),
    ]

    const [disabled, setDisabled] = useState(true)
    const [loading, setLoading] = useState(null)
    const [data, setData] = useState(null)
    const [label, setLabel] = useState()
    const [time, setTime] = useState([
        getDateTime(new Date(), 4),
        getDateTime(new Date(), 4),
    ])

    const handleSubmit = (from = null, to = null) => {
        const f = from ? new Date(from).getTime() : new Date(time[0]).getTime()
        const t = to ? new Date(to).getTime() : new Date(time[1]).getTime()

        setData(null)
        setLoading(true)

        if (isConnected) {
            sendMessage({cmd:`account/${sessionStorage.getItem('authToken')}/dailySums/${f}/${t}?timezoneId=${getTimezone()}`})
        }
        else {
            getData(`/dailySums/${f}/${t}?timezoneId=${getTimezone()}`).then((json) => {
                if (json) {
                    setLoading(false)
                    setDisabled(false)
                    setData(json)
                }
            })
        }
    }

    useEffect(() => {
        if (receivedMessage !== '' && checkCmd('daily_sums', receivedMessage.cmd)) {
            setLoading(false)
            setDisabled(false)
            setData(receivedMessage)
        }
    }, [receivedMessage])

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
                            text={t('interface.generate')}
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
                    loading &&
                    <Loader
                        type={'block'}
                        background={'transparent'}
                    />
                }
                {
                    data &&
                    <Table data={data} />
                }
                {
                    (!data && !loading) &&
                    <div className={style.title}>{t('notification.generated_financial_report_here')}</div>
                }
            </div>
        </div>
    );
}

export default Daily;
