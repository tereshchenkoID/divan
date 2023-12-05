import {useTranslation} from "react-i18next";

import classNames from "classnames";

import style from './index.module.scss';

const Types = ({
    type,
    setType,
    disabled
}) => {
    const { t } = useTranslation()

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
                {t('interface.single')}
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
                {t('interface.system')}
            </button>
        </div>
    );
}

export default Types;
