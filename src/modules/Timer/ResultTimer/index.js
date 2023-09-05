import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";

import {setLive} from "store/actions/liveAction";

import {getDifferent} from "helpers/getDifferent";

const ResultTimer = ({end, delta}) => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const [timer, setTimer] = useState('')

    useEffect(() => {
        let r = getDifferent(end, delta)
        setTimer(r)
    }, [end, delta]);

    useEffect(() => {
        const a = setInterval(() => {
            let r = getDifferent(end, delta)
            setTimer(r)
            if (r === '0') {
                dispatch(setLive(4))
                clearInterval(a)
            }
        },1000)

        return () => {
            setTimer('')
            clearInterval(a);
        }
    }, [end, delta]);

    return (
        <>
            <div>{t('interface.results')}</div>
            <div>{timer}</div>
        </>
    );
}

export default ResultTimer;
