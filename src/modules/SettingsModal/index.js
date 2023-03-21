import {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import classNames from "classnames";

import {setSetting} from "store/actions/settingAction";
import {deleteBetslip} from "store/actions/betslipAction";

import Button from "components/Button";

import style from './index.module.scss';

const SettingsModal = () => {
    const dispatch = useDispatch()
    const {setting} = useSelector((state) => state.setting)
    const [preview, setPreview] = useState(setting)
    const [loading, setLoading] = useState(false)

    const printingRef = useRef(0)
    const stakeRef = useRef(0)

    const handleChange = (idx, value) => {
        preview[idx] = value
        dispatch(setSetting(preview))
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
        <div className={
                classNames(
                    style.block,
                    setting.show && style.active
                )
            }
        >
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
                                handleChange('show', false)
                            }}
                        />
                    </div>
                </div>
                <div className={style.body}>
                    <div className={style.container}>
                        <div className={style.title}>
                            <span>Settings</span>
                            {
                                loading &&
                                <p className={style.notification}>Saved!</p>
                            }
                        </div>
                        <div className={
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
                                        defaultValue={setting['printing-mode']}
                                    >
                                        <option value={1}>Pos not installed</option>
                                        <option value={2}>Web print</option>
                                        <option value={3}>Disabled</option>
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
                                        defaultValue={setting['stake-mode']}
                                    >
                                        <option value={1}>Per bet</option>
                                        <option value={2}>Per group</option>
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
                                            icon={'print'}
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
