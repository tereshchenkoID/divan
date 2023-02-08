import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";

import classNames from "classnames";

import {fetchData} from "helpers/api";

import Preloader from "components/Preloader";

import style from './index.module.scss';

const TeamStatistics = () => {
    let url = useParams()
    const { t } = useTranslation()
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const [active, setActive] = useState(1)
    const [sort, setSort] = useState('sortPositionTotal')

    useEffect(() => {
        fetchData(`stats_season_tables/${url.league}`).then((data) => {
            setData(data)
            setLoading(false)
        })
    }, []);

    return (
        <div className={style.block}>
            {
                loading
                    ?
                        <Preloader />
                    :
                    <>
                        {
                            data.doc[0].data.tables.map((el, idx) =>
                                <div
                                    key={idx}
                                    className={style.panel}
                                >
                                    <div className={style.head}>{el.seasontypename}, {el.name}</div>
                                    <div className={style.wrapper}>
                                        {
                                            data.doc[0].data.tables.length === 1 &&
                                            <div className={style.tab}>
                                                <button
                                                    className={classNames(style.link, active === 1 && style.active)}
                                                    onClick={() => {
                                                        setActive(1)
                                                        setSort('sortPositionTotal')
                                                    }}
                                                >
                                                    {t('interface.overall')}
                                                </button>
                                                <button
                                                    className={classNames(style.link, active === 2 && style.active)}
                                                    onClick={() => {
                                                        setActive(2)
                                                        setSort('sortPositionHome')
                                                    }}
                                                >
                                                    {t('interface.home')}
                                                </button>
                                                <button
                                                    className={classNames(style.link, active === 3 && style.active)}
                                                    onClick={() => {
                                                        setActive(3)
                                                        setSort('sortPositionAway')
                                                    }}
                                                >
                                                    {t('interface.away')}
                                                </button>
                                            </div>
                                        }
                                       <div className={style.body}>
                                           <div className={style.overflow}>
                                               <div className={style.table}>
                                                   <div className={style.row}>
                                                       <div className={style.cell}>{t('interface.po')}</div>
                                                       <div className={style.cell}>
                                                           <span>{t('interface.team')}</span>
                                                       </div>
                                                       <div className={style.cell}>І</div>
                                                       <div className={style.cell}>{t('interface.w')}</div>
                                                       <div className={style.cell}>{t('interface.d')}</div>
                                                       <div className={style.cell}>{t('interface.l')}</div>
                                                       <div className={style.cell}>{t('interface.gf')}</div>
                                                       <div className={style.cell}>{t('interface.ga')}</div>
                                                       <div className={style.cell}>{t('interface.diff')}</div>
                                                       <div className={style.cell}>{t('interface.pts')}</div>
                                                   </div>
                                                   {
                                                       el.tablerows.sort((a, b) => { return a[sort] - b[sort] }).map((el, idx) =>
                                                           <div
                                                               key={idx}
                                                               className={style.row}
                                                           >
                                                               <div className={style.cell}>
                                                                   {active === 1 && el.sortPositionTotal}
                                                                   {active === 2 && el.sortPositionHome}
                                                                   {active === 3 && el.sortPositionAway}
                                                               </div>
                                                               <div className={style.cell}>
                                                                   {
                                                                       el.team.cc &&
                                                                       <span className={style.country}>
                                                                           <img src={`https://img.sportradar.com/ls/crest/big/${el.team.cc.a2}.png`} alt={el.team.na} />
                                                                       </span>
                                                                   }
                                                                   <span>{el.team.name}</span>
                                                               </div>
                                                               <div className={style.cell}>
                                                                   {active === 1 && el.total}
                                                                   {active === 2 && el.home}
                                                                   {active === 3 && el.away}
                                                               </div>
                                                               <div className={style.cell}>
                                                                   {active === 1 && el.winTotal}
                                                                   {active === 2 && el.winHome}
                                                                   {active === 3 && el.winAway}
                                                               </div>
                                                               <div className={style.cell}>
                                                                   {active === 1 && el.drawTotal}
                                                                   {active === 2 && el.drawHome}
                                                                   {active === 3 && el.drawAway}
                                                               </div>
                                                               <div className={style.cell}>
                                                                   {active === 1 && el.lossTotal}
                                                                   {active === 2 && el.lossHome}
                                                                   {active === 3 && el.lossAway}
                                                               </div>
                                                               <div className={style.cell}>
                                                                   {active === 1 && el.goalsForTotal}
                                                                   {active === 2 && el.goalsForHome}
                                                                   {active === 3 && el.goalsForAway}
                                                               </div>
                                                               <div className={style.cell}>
                                                                   {active === 1 && el.goalsAgainstTotal}
                                                                   {active === 2 && el.goalsAgainstHome}
                                                                   {active === 3 && el.goalsAgainstAway}
                                                               </div>
                                                               <div className={style.cell}>
                                                                   {active === 1 && el.goalDiffTotal}
                                                                   {active === 2 && el.goalDiffHome}
                                                                   {active === 3 && el.goalDiffAway}
                                                               </div>
                                                               <div className={style.cell}>
                                                                   {active === 1 && el.pointsTotal}
                                                                   {active === 2 && el.pointsHome}
                                                                   {active === 3 && el.pointsAway}
                                                               </div>
                                                           </div>
                                                       )
                                                   }
                                               </div>
                                           </div>
                                       </div>
                                       {
                                           data.doc[0].data.tables.length === 1 &&
                                           el.rules &&
                                           <div className={style.footer}>
                                               {
                                                   el.rules.name.split('\n').map((el, idx) =>
                                                       <div key={idx}>{el}</div>
                                                   )
                                               }
                                           </div>
                                       }
                                    </div>
                                </div>
                            )
                        }
                    </>
            }
        </div>
    );
}

export default TeamStatistics;
