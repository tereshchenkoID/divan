import {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {printMode, oddsType} from "constant/config";

import classNames from "classnames";

import {deleteBetslip} from "store/actions/betslipAction";

import Button from "components/Button";

import style from './index.module.scss';

const SettingsModal = ({action}) => {
    const dispatch = useDispatch()
    const {settings} = useSelector((state) => state.settings)
    const [loading, setLoading] = useState(false)

    const printingRef = useRef(0)
    const stakeRef = useRef(0)

    console.log(settings)

    const handleChange = (idx, value) => {
        // preview[idx] = value
        // dispatch(setSetting(preview))
    }

    const save = (ref, idx) => {
        setLoading(true)

        if (ref === stakeRef) {
            dispatch(deleteBetslip([]))
        }

        handleChange(idx, parseInt(ref.current.value, 10))

        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }

    return (
        <div className={style.block}>
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
                                <div className={style.cell}>Change password</div>
                            </div>
                            <div className={style.row}>
                                <div className={style.cell}>Language</div>
                                <div className={style.cell}>En</div>
                                <div className={style.cell} />
                            </div>
                        </div>
                    </div>
                    <div className={style.container}>
                        <div className={style.title}>
                            <span>Settings</span>
                            {
                                loading &&
                                <p className={style.notification}>Saved!</p>
                            }
                        </div>
                        <div
                            className={
                                classNames(
                                    style.table,
                                    style.lg
                                )
                            }
                        >
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
                                <div className={style.cell}></div>
                                <div className={style.cell}>
                                    <div
                                        className={
                                            classNames(
                                                style.button,
                                                style.sm,
                                            )
                                        }
                                        onClick={() => {
                                            save(printingRef, 'printing-mode')
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
                                <div className={style.cell}></div>
                                <div className={style.cell}>
                                    <div
                                        className={
                                            classNames(
                                                style.button,
                                                style.sm,
                                            )
                                        }
                                        onClick={() => {
                                            save(stakeRef, 'stake-mode')
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
                                    />
                                </div>
                                <div className={style.cell}></div>
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
