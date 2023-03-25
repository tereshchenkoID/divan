import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useReactToPrint} from "react-to-print";

import {printMode, oddsType} from "constant/config";

import classNames from "classnames";

import {getData, postData} from "helpers/api";
import {deleteBetslip} from "store/actions/betslipAction";
import {setNotification} from "store/actions/notificationAction";

import {TicketPrint} from "modules/TicketPrint";
import Button from "components/Button";
import Password from "./Password";

import style from './index.module.scss';

const SettingsModal = ({action}) => {
    const dispatch = useDispatch()
    const {settings} = useSelector((state) => state.settings)
    const [response, setResponse] = useState(null)
    const [showPassword, setShowPassword] = useState(false)

    const printingRef = useRef(0)
    const stakeRef = useRef(0)
    const printRef = useRef('0')
    const componentRef = useRef();

    const save = (ref, idx) => {

        if (ref === stakeRef) {
            dispatch(deleteBetslip([]))
        }

        postData('/config', JSON.stringify({
                idx: ref.current.value
            }))
            .then((json) => {
                if (json.code === 'OK') {
                    dispatch(setNotification('Saved'))
                }
                 else {
                    dispatch(setNotification(json.error_message || 'Something wrong'))
                }
            })
    }

    const print = (ref) => {

        getData(`/details/${ref.current.value}`).then((json) => {
            if (json.hasOwnProperty('stake')) {
                if (settings.print.mode === printMode.WEB_PRINT && settings.print.payout) {
                    setResponse(json)
                }
            }
            else {
                dispatch(setNotification(json.data.error_message || 'Ticket not found'))
            }
        })
    }

    const a = useReactToPrint({
        content: () => componentRef.current,
    })

    useEffect(() => {
        response && a()
    }, [response])

    return (
        <div className={style.block}>
            {
                response &&
                <div className={style.print}>
                    <TicketPrint
                        data={response}
                        ref={componentRef}
                    />
                </div>
            }
            <div className={style.wrapper}>
                <div className={style.header}>
                    <p>General settings</p>
                    <div
                        className={
                            classNames(
                                style.button,
                                style.sm,
                            )
                        }
                    >
                        <Button
                            type={'red'}
                            size={'sm'}
                            icon={'close'}
                            action={() => {
                                action(false)
                            }}
                        />
                    </div>
                </div>
                <div className={style.body}>
                    <div className={style.container}>
                        <div
                            className={
                                classNames(
                                    style.table,
                                    style.sm
                                )
                            }
                        >
                            <div className={style.row}>
                                <div className={style.cell}>Username</div>
                                <div className={style.cell}>{settings.username}</div>
                                <div className={style.cell} />
                            </div>
                            <div className={style.row}>
                                <div className={style.cell}>Language</div>
                                <div className={style.cell}>En</div>
                                <div className={style.cell} />
                            </div>
                            <div className={style.row}>
                                <div className={style.cell}>Password</div>
                                <div className={style.cell}>
                                    <button
                                        className={style.toggle}
                                        onClick={() => {
                                            setShowPassword(!showPassword)
                                        }}
                                    >
                                        Change password
                                    </button>
                                </div>
                                <div className={style.cell} />
                            </div>
                            {
                                showPassword &&
                                <Password action={setShowPassword}/>
                            }
                        </div>
                    </div>
                    <div className={style.container}>
                        <div className={style.title}>
                            <span>Settings</span>
                        </div>
                        <div className={style.table}>
                            <div className={style.row}>
                                <div className={style.cell}>Printing mode</div>
                                <div className={style.cell}>
                                    <select
                                        className={style.select}
                                        ref={printingRef}
                                    >
                                        <option value={printMode.POS}>Pos not installed</option>
                                        <option value={printMode.WEB_PRINT}>Web print</option>
                                        <option value={printMode.DISABLED}>Disabled</option>
                                    </select>
                                </div>
                                <div className={style.cell}>
                                    <div
                                        className={
                                            classNames(
                                                style.button,
                                                style.sm,
                                            )
                                        }
                                        onClick={() => {
                                            save(printingRef, 'printMode')
                                        }}
                                    >
                                        <Button
                                            type={'green'}
                                            size={'sm'}
                                            icon={'save'}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={style.row}>
                                <div className={style.cell}>Stake Mode</div>
                                <div className={style.cell}>
                                    <select
                                        className={style.select}
                                        ref={stakeRef}
                                    >
                                        <option value={oddsType.PER_BET}>Per bet</option>
                                        <option value={oddsType.PER_GROUP}>Per group</option>
                                    </select>
                                </div>
                                <div className={style.cell}>
                                    <div
                                        className={
                                            classNames(
                                                style.button,
                                                style.sm,
                                            )
                                        }
                                        onClick={() => {
                                            save(stakeRef, 'betMode')
                                        }}
                                    >
                                        <Button
                                            type={'green'}
                                            size={'sm'}
                                            icon={'save'}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={style.row}>
                                <div className={style.cell}>Reprint ticket</div>
                                <div className={style.cell}>
                                    <input
                                        type={"number"}
                                        className={style.input}
                                        ref={printRef}
                                    />
                                </div>
                                <div className={style.cell}>
                                    <div
                                        className={
                                            classNames(
                                                style.button,
                                                style.sm,
                                            )
                                        }
                                    >
                                        <Button
                                            type={'green'}
                                            size={'sm'}
                                            icon={'repeat-print'}
                                            action={() => {
                                                print(printRef)
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SettingsModal;
