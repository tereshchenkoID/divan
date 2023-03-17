import classNames from "classnames";

import style from './index.module.scss';

const Types = ({
    type,
    setType,
    disabled
}) => {
    return (
        <div className={style.block}>
            <button
                className={
                    classNames(
                        style.item,
                        type === 0 && style.active
                    )
                }
                onClick={() => {
                    setType(0)
                }}
                aria-label={'Single'}
            >
                Single
            </button>
            <button
                className={
                    classNames(
                        style.item,
                        disabled && style.disabled,
                        type === 1 && style.active
                    )
                }
                onClick={() => {
                    setType(1)
                }}
                aria-label={'System'}
            >
                System
            </button>
        </div>
    );
}

export default Types;
