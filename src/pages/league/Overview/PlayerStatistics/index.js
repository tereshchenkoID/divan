import {useState} from "react";
import {useTranslation} from "react-i18next";

import classNames from "classnames";

import Goals from "./Goals";
import Assists from "./Assists";
import Cards from "./Cards";
import Injuries from "./Injuries";

import style from './index.module.scss';

const PlayerStatistics = () => {
    const { t } = useTranslation()
    const [active, setActive] = useState(1)

    const getTable = () => {
        switch (active) {
            case 1:
                return <Goals />
            case 2:
                return <Assists />
            case 3:
                return <Cards />
            case 4:
                return <Injuries />
            default:
                return <Goals />
        }
    }

    return (
        <div className={style.block}>
            <div className={style.head}>{t('interface.player_statistics')}</div>
            <div className={style.wrapper}>
                <div className={style.tab}>
                    <button
                        className={classNames(style.link, active === 1 && style.active)}
                        onClick={() => {
                            setActive(1)
                        }}
                    >
                        {t('interface.goals')}
                    </button>
                    <button
                        className={classNames(style.link, active === 2 && style.active)}
                        onClick={() => {
                            setActive(2)
                        }}
                    >
                        {t('interface.assists')}
                    </button>
                    <button
                        className={classNames(style.link, active === 3 && style.active)}
                        onClick={() => {
                            setActive(3)
                        }}
                    >
                        {t('stats.cards')}
                    </button>
                    <button
                        className={classNames(style.link, active === 4 && style.active)}
                        onClick={() => {
                            setActive(4)
                        }}
                    >
                        {t('stats.injuries')}
                    </button>
                </div>
                <div className={style.body}>
                    { getTable() }
                </div>
            </div>
        </div>
    );
}

export default PlayerStatistics;
