import {useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";
import {useReactToPrint} from "react-to-print";

import { MD5 } from 'crypto-js';

import classNames from "classnames";

import {setNotification} from "store/actions/notificationAction";

import {getData} from "helpers/api";

import {StatsPrint} from "modules/ReportsModal/StatsPrint";
import Button from "components/Button";
import Table from "./Table";

import style from './index.module.scss';

const Settlement = () => {
    const dispatch = useDispatch()
    const { t } = useTranslation()

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({})
    const [preview, setPreview] = useState(false)
    const [active, setActive] = useState('staff')
    const [password, setPassword] = useState('qwe123')
    const componentRef = useRef();

    const a = useReactToPrint({
        content: () => componentRef.current,
    })

    const handleSubmit = () => {

        if (active === 'master' && password.length === 0) {
            dispatch(setNotification(t('notification.password_is_blank')))
            return
        }

        const type = active === 'master' ? `${active}/${MD5(password).toString()}` : active
        getData(`/settlement/${type}`).then((json) => {
            setData(json)

            if (json) {
                setLoading(false)
            }
        })
    }

    const handleForm = (e) => {
        e.preventDefault()
        handleSubmit()
    }

    const handlePrint = () => {
        a()
    }

    const toggle = (id) => {
        setData({})
        setLoading(true)
        setPreview(false)
        setActive(id)
    }

    return (
        <div className={style.block}>
            <div className={style.tab}>
                <div className={style.header}>
                    <button
                        className={
                            classNames(
                                style.link,
                                active === 'staff' && style.active
                            )
                        }
                        onClick={() => {
                            toggle('staff')
                        }}
                    >
                        Staff
                    </button>
                    <button
                        className={
                            classNames(
                                style.link,
                                active === 'master' && style.active
                            )
                        }
                        onClick={() => {
                            toggle('master')
                        }}
                    >
                        Master
                    </button>
                </div>
                <div className={style.body}>
                    <div className={style.stats}>
                        {
                            !loading &&
                            data &&
                            <>
                                <div className={style.print}>
                                    <StatsPrint
                                        data={data}
                                        ref={componentRef}
                                    />
                                </div>
                                <Table data={data} />
                            </>
                        }
                    </div>
                    <div className={style.options}>
                        {
                            active === 'staff' &&
                            <div className={style.button}>
                                <Button
                                    type={'green'}
                                    size={'md'}
                                    text={preview ? 'Settlement' : 'Preview'}
                                    props={'button'}
                                    action={() => {
                                        preview ? handlePrint() : handleSubmit()
                                        setPreview(true)
                                    }}
                                />
                            </div>
                        }
                        {
                            active === 'master' &&
                            <>
                                {
                                    (loading && data)
                                        ?
                                            <form
                                                className={style.form}
                                                onSubmit={handleForm}
                                            >
                                                <input
                                                    type={'password'}
                                                    className={style.field}
                                                    placeholder={'Password'}
                                                    onChange={(e) => {
                                                        setPassword(e.target.value || '')
                                                    }}
                                                    defaultValue={password}
                                                />
                                                <div className={style.button}>
                                                    <Button
                                                        type={'green'}
                                                        size={'md'}
                                                        text={'Login'}
                                                        props={'submit'}
                                                    />
                                                </div>
                                            </form>
                                        :
                                            <div className={style.button}>
                                                <Button
                                                    type={'green'}
                                                    size={'md'}
                                                    text={'Settlement'}
                                                    props={'button'}
                                                    action={() => {
                                                        handlePrint()
                                                        setPreview(true)
                                                    }}
                                                />
                                            </div>
                                }
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settlement;
