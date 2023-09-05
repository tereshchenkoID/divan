import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {useReactToPrint} from "react-to-print";
import useSocket from "hooks/useSocket";

import { MD5 } from 'crypto-js';

import classNames from "classnames";

import {setNotification} from "store/actions/notificationAction";

import {checkCmd} from "helpers/checkCmd";
import {getData} from "helpers/api";

import Button from "components/Button";
import Loader from "components/Loader";
import Table from "./Table";
import {StatsPrint} from "./StatsPrint";

import style from './index.module.scss';

const Settlement = () => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { sendMessage } = useSocket()
    const {isConnected, receivedMessage} = useSelector((state) => state.socket)

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)
    const [preview, setPreview] = useState(false)
    const [active, setActive] = useState('staff')
    const [password, setPassword] = useState('')
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

        if (isConnected) {
            sendMessage({cmd:`account/${sessionStorage.getItem('authToken')}/settlement/${type}`})
        }
        else {
            getData(`/settlement/${type}`).then((json) => {
                setData(null)
                setLoading(true)

                if (active === 'master') {
                    if (json.code) {
                        dispatch(setNotification(t('notification.password_dont_match')))
                    }
                    else {
                        setData(json)
                        setLoading(false)
                    }
                }
                else {
                    if (json) {
                        setData(json)
                        setLoading(false)
                    }
                }
            })
        }
    }

    useEffect(() => {
        if (receivedMessage !== '' && checkCmd('settlement', receivedMessage.cmd)) {
            setData(null)
            setLoading(true)

            if (active === 'master') {
                if (receivedMessage.code) {
                    dispatch(setNotification(t('notification.password_dont_match')))
                }
                else {
                    setData(receivedMessage)
                    setLoading(false)
                }
            }
            else {
                if (receivedMessage) {
                    setData(receivedMessage)
                    setLoading(false)
                }
            }
        }
    }, [receivedMessage])

    const handleForm = (e) => {
        e.preventDefault()
        handleSubmit()
    }

    const handlePrint = () => {
        a()
    }

    const toggle = (id) => {
        setData(null)
        setLoading(null)
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
                        {t('interface.staff')}
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
                        {t('interface.master')}
                    </button>
                </div>
                <div className={style.body}>
                    <div className={style.stats}>
                        {
                            loading &&
                            <Loader
                                type={'block'}
                                background={'transparent'}
                            />
                        }
                        {
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
                                    text={preview ? t('interface.settlement') : t('interface.preview')}
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
                                    !data
                                        ?
                                            <form
                                                className={style.form}
                                                onSubmit={handleForm}
                                            >
                                                <input
                                                    type={'password'}
                                                    className={style.field}
                                                    placeholder={t('interface.password')}
                                                    onChange={(e) => {
                                                        setPassword(e.target.value || '')
                                                    }}
                                                    defaultValue={password}
                                                />
                                                <div className={style.button}>
                                                    <Button
                                                        type={'green'}
                                                        size={'md'}
                                                        text={t('interface.login')}
                                                        props={'submit'}
                                                    />
                                                </div>
                                            </form>
                                        :
                                            <div className={style.button}>
                                                <Button
                                                    type={'green'}
                                                    size={'md'}
                                                    text={t('interface.settlement')}
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
