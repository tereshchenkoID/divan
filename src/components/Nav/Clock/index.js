import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

import convertTime from "helpers/convertTime";

import Icon from "components/Icon";
import ClearResults from "./ClearResults";

import style from './index.module.scss';

const Clock = () => {
    const {delta} = useSelector((state) => state.delta)
    const [date, setDate] = useState(new Date().getTime())

    useEffect(() => {
        setInterval(() => {
            setDate(new Date().getTime())
        },1000)
    }, []);

    return (
        <div className={style.block}>
            <div className={style.icon}>
                <Icon id={'clock'} />
            </div>
            <div>{convertTime(date, delta)}</div>
            <ClearResults date={date + 5500} />
        </div>
    );
}

export default Clock;
