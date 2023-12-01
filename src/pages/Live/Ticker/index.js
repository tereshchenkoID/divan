import {gameType, hostnames} from "constant/config"
import {useEffect, useState} from "react"
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

import classNames from "classnames";

import {getData} from "helpers/api"

import style from './index.module.scss'

const Ticker = () => {
    const token = sessionStorage.getItem('authToken')
    const { t } = useTranslation()
    const {game} = useSelector((state) => state.game)
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
		if (game.type === gameType.FOOTBALL_LEAGUE) {
			getData(`${hostnames.PROD}/viewer/lastgame/${token}/FOOTBALL_LEAGUE/${game.id}`).then((json) => {
				if (json.last) {
					setData(json)
					setLoading(false)
				}
			})
		}
    }, [loading]);
    
    if (loading) {
        return false
    }

    return (
        <marquee className={style.block}>
             <div className={style.wrapper}>
                 <div className={style.info}>
                     <div>{t('interface.event')}: <strong>{data.league.league_id}</strong></div>
                     <div>|</div>
                     <div>{t('interface.week')}: <strong>{data.league.week}</strong></div>
                 </div>
                 {
                     data.last.map((item, index) =>
                         <div
                             key={index}
                             className={style.item}
                         >
                             <div className={style.id}>{index + 1}.</div>
                             <div>
                                 <div className={style.logo}>
                                     <img
                                         src={`https://view.divan.bet/engine/shop/resource/${item.teams[0].img}`}
                                         alt={item.teams[0].name}
                                         loading={'lazy'}
                                     />
                                 </div>
                             </div>
                             <div>{item.teams[0].name}</div>
                             <div className={style.scoreboard}>
                                 <div
                                     className={
                                         classNames(
                                             style.score,
                                             item.score[0] > item.score[1] && style.win
                                         )
                                     }
                                 >
                                     {item.score[0]}
                                 </div>
                                 <div>:</div>
                                 <div
                                     className={
                                         classNames(
                                             style.score,
                                             item.score[1] > item.score[0] && style.win
                                         )
                                     }
                                 >
                                     {item.score[1]}
                                 </div>
                             </div>
                             <div>{item.teams[1].name}</div>
                             <div>
                                 <div className={style.logo}>
                                     <img
                                         src={`https://view.divan.bet/engine/shop/resource/${item.teams[1].img}`}
                                         alt={item.teams[1].name}
                                         loading={'lazy'}
                                     />
                                 </div>
                             </div>
                         </div>
                     )
                 }
             </div>
        </marquee>
    );
}

export default Ticker;
