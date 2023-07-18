import {useState} from "react";

import classNames from "classnames";

import Button from "components/Button";
import Settlement from "./Settlement";
import General from "./General";

import style from './index.module.scss';

const ReportsModal = ({action}) => {
    const [active, setActive] = useState(0)

    return (
        <div className={style.block}>
            <div className={style.wrapper}>
                <div className={style.header}>
                    <p>Financial reports</p>
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
                    <div className={style.tab}>
                        <div className={style.head}>
                            <button
                                className={
                                    classNames(
                                        style.link,
                                        active === 0 && style.active
                                    )
                                }
                                onClick={() => {
                                    setActive(0)
                                }}
                            >
                                General overview
                            </button>
                            <button
                                className={
                                    classNames(
                                        style.link,
                                        active === 1 && style.active
                                    )
                                }
                                onClick={() => {
                                    setActive(1)
                                }}
                            >
                                Dail sums
                            </button>
                            <button
                                className={
                                    classNames(
                                        style.link,
                                        active === 2 && style.active
                                    )
                                }
                                onClick={() => {
                                    setActive(2)
                                }}
                            >
                                Settlement
                            </button>
                        </div>
                        <div className={style.content}>
                            {
                                active === 0 &&
                                <General />
                            }
                            {
                                active === 1 &&
                                <div>1</div>
                            }
                            {
                                active === 2 &&
                                <Settlement />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReportsModal;
