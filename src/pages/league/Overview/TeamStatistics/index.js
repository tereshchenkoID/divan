import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";

import {useLocalStorage} from "helpers/localStorage";

import {fetchData} from "helpers/api";

import Preloader from "components/Preloader";
import TopOffense from "./TopOffense";
import TopDefence from "./TopDefence";

import style from './index.module.scss';

const TeamStatistics = () => {
    let url = useParams()
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const {getLocalStorage} = useLocalStorage()

    useEffect(() => {
        fetchData(`https://stats.fn.sportradar.com/betradar/${getLocalStorage('i18nextLng')}/Europe:Helsinki/gismo/stats_season_uniqueteamstats/${url.league}`).then((data) => {
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
                        <div className={style.content}>
                            <div className={style.grid}>
                                <div>
                                    <TopOffense
                                        data={Object.values(data.doc[0].data.stats.uniqueteams)}
                                    />
                                </div>
                                <div>
                                    <TopDefence
                                        data={Object.values(data.doc[0].data.stats.uniqueteams)}
                                    />
                                </div>
                            </div>
                        </div>
            }
        </div>
    );
}

export default TeamStatistics;
