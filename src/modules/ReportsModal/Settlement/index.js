import {useState} from "react";

import classNames from "classnames";

import Button from "components/Button";

import style from './index.module.scss';
import Table from "./Table";

const Settlement = () => {
    const [preview, setPreview] = useState(false)
    const [active, setActive] = useState(0)
    const [password, setPassword] = useState('')

    const handleSubmit = () => {
        console.log('Send')
    }

    const toggle = (id) => {
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
                                active === 0 && style.active
                            )
                        }
                        onClick={() => {
                            toggle(0)
                        }}
                    >
                        Staff
                    </button>
                    <button
                        className={
                            classNames(
                                style.link,
                                active === 1 && style.active
                            )
                        }
                        onClick={() => {
                            toggle(1)
                        }}
                    >
                        Master
                    </button>
                </div>
                <div className={style.body}>
                    {
                        active === 0 &&
                        <div>
                            <div className={style.table}>
                                {
                                    preview &&
                                    <div className={style.stats}>
                                        <Table data={''} />
                                    </div>
                                }
                                <div className={style.button}>
                                    <Button
                                        type={'green'}
                                        size={'md'}
                                        text={preview ? 'Settlement' : 'Preview'}
                                        props={'button'}
                                        action={() => {
                                            setPreview(true)
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    }
                    {
                        active === 1 &&
                        <div>
                            <form
                                className={style.form}
                                onSubmit={handleSubmit}
                            >
                                <input
                                    type={'password'}
                                    className={style.field}
                                    placeholder={'Password'}
                                    onChange={(e) => {
                                        setPassword(e.target.value || '')
                                    }}
                                    defaultValue={password}
                                    autoComplete={'true'}
                                    autoSave={'true'}
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
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Settlement;
