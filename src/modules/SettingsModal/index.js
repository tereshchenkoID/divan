import {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import classNames from "classnames";

import {setSetting} from "store/actions/settingAction";
import {deleteBetslip} from "store/actions/betslipAction";

import Icon from "components/Icon";

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

        // console.log(setting)
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
                    <button
                        aria-label={'Close'}
                        className={
                            classNames(
                                style.action,
                                style.close
                            )
                        }
                        onClick={() => {
                            handleChange('show', false)
                        }}
                    >
                        <Icon id={'close'} />
                    </button>
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
                                    <button
                                        aria-label={'Save'}
                                        className={
                                            classNames(
                                                style.action,
                                                style.save
                                            )
                                        }
                                        onClick={() => {
                                            save(printingRef, 'printing-mode')
                                        }}
                                    >
                                        <Icon id={'save'} />
                                    </button>
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
                                    <button
                                        aria-label={'Save'}
                                        className={
                                            classNames(
                                                style.action,
                                                style.save
                                            )
                                        }
                                        onClick={() => {
                                            save(stakeRef, 'stake-mode')
                                        }}
                                    >
                                        <Icon id={'save'} />
                                    </button>
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
                                    <button
                                        aria-label={'Save'}
                                        className={
                                            classNames(
                                                style.action,
                                                style.save
                                            )
                                        }
                                    >
                                        <Icon id={'print'} />
                                    </button>
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
