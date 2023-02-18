import {NavLink, useParams} from "react-router-dom";
import {useState} from "react";
import {useTranslation} from "react-i18next";

import Icon from "components/Icon";

import style from '../index.module.scss';

const sortItems = (data, sort) => {

    return data.sort((a, b) => {
        switch (sort.level) {
            case 1:
                return b['goals_scored'][sort.name] - a['goals_scored'][sort.name]
            case 2:
                return a['goals_scored'][sort.name] - b['goals_scored'][sort.name]
            default:
                return a.uniqueteam.name.localeCompare(b.uniqueteam.name);
        }
    })
}

const TopOffense = ({data}) => {
    const { t } = useTranslation()
    let url = useParams()
    const [sort, setSort] = useState({})
    const [levelAverage, setLevelAverage] = useState(0)
    const [levelTotal, setLevelTotal] = useState(0)

    const handlerClick = (name, level, action) => {
        action(level > 1 ? 0 : level + 1)
        setSort({
            name: name,
            level: level > 1 ? 0 : level + 1
        })
    }

    return (
        <div className={style.panel}>
            <div className={style.head}>{t('interface.top_offence')}</div>
            <div className={style.wrapper}>
                <div className={style.overflow}>
                    <div className={style.table}>
                        <div className={style.row}>
                            <div className={style.cell}>
                                <span>{t('interface.team')}</span>
                            </div>
                            <div className={style.cell}>
                                {t('interface.goals_per_match')}
                                <button
                                    className={style.button}
                                    onClick={() => {
                                        handlerClick('average', levelAverage, setLevelAverage)
                                        setLevelTotal(0)
                                    }}
                                >
                                    <span className={style.icon}>
                                        <Icon id={`sort-${levelAverage}`} />
                                    </span>
                                </button>
                            </div>
                            <div className={style.cell}>
                                {t('interface.goals_scored')}
                                <button
                                    className={style.button}
                                    onClick={() => {
                                        handlerClick('total', levelTotal, setLevelTotal)
                                        setLevelAverage(0)
                                    }}
                                >
                                    <span className={style.icon}>
                                        <Icon id={`sort-${levelTotal}`} />
                                    </span>
                                </button>
                            </div>
                        </div>
                        {
                            sortItems(data, sort, levelAverage).map((el, idx) =>
                                <NavLink
                                    key={idx}
                                    className={style.row}
                                    to={`/${url.id}/${url.category}/${url.league}/team/${el.uniqueteam._id}`}
                                >
                                    <div className={style.cell}>
                                        <span>{el.uniqueteam.name}</span>
                                    </div>
                                    <div className={style.cell}>{el.goals_scored.average}</div>
                                    <div className={style.cell}>{el.goals_scored.total}</div>
                                </NavLink>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopOffense;
