import {NavLink, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";

import style from '../index.module.scss';

const TopDefence = ({data}) => {
    const { t } = useTranslation()
    let url = useParams()

    return (
        <div className={style.panel}>
            <div className={style.head}>{t('interface.top_defence')}</div>
            <div className={style.wrapper}>
                <div className={style.overflow}>
                    <div className={style.table}>
                        <div className={style.row}>
                            <div className={style.cell}>
                                <span>{t('interface.team')}</span>
                            </div>
                            <div className={style.cell}>{t('interface.conceded_per_match')}</div>
                            <div className={style.cell}>{t('interface.goals_conceded')}</div>
                        </div>
                        {
                            data.map((el, idx) =>
                                <NavLink
                                    key={idx}
                                    className={style.row}
                                    to={`/${url.id}/${url.category}/${url.league}/team/${el.uniqueteam._id}`}
                                >
                                    <div className={style.cell}>
                                        <span>{el.uniqueteam.name}</span>
                                    </div>
                                    <div className={style.cell}>{el.goals_conceded.average}</div>
                                    <div className={style.cell}>{el.goals_conceded.total}</div>
                                </NavLink>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopDefence;
