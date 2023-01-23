import {useTranslation} from "react-i18next";

import classNames from "classnames";

import style from './index.module.scss';

const getPercent = (home, away) => {
    const r = [0, 0]
    const h = parseFloat(home)
    const a = parseFloat(away)

    if (h > a) {
        r[0] = 1
        r[1] = a !== 0 ? a / h : 0
    }
    else if(h < a) {
        r[0] = h !== 0 ? h / a : 0
        r[1] = 1
    }
    else if(a === h) {
        r[0] = 1
        r[1] = 1
    }

    return r
}

const Scale = ({text, home, away}) => {
    const { t } = useTranslation();

    return (
        <div className={style.block}>
            <div className={style.top}>{t(`stats.${text}`)}</div>
            <div className={style.bottom}>
                <div className={classNames(style.text, style.left)}>{home}</div>
                <div className={classNames(style.cell, style.left)}>
                    <div style={{transform: `scaleX(${getPercent(home, away)[0]})`}} />
                </div>
                <div className={classNames(style.cell, style.right)}>
                    <div style={{transform: `scaleX(${getPercent(home, away)[1]})`}} />
                </div>
                <div className={classNames(style.text, style.right)}>{away}</div>
            </div>
        </div>
    );
}

export default Scale;
