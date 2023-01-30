import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";

import checkData from "helpers/checkData";

import style from './index.module.scss';

import {loadSportData} from "store/actions/sportAction";
import {loadCategoryData} from "store/actions/categoryAction";
import {loadLeagueData} from "store/actions/leagueAction";

import {setBreadcrumbs} from "store/actions/breadcrumbsAction";


const setLink = (data, i) => {
    let a = ''

    // eslint-disable-next-line array-callback-return
    Object.keys(data).splice(0, i + 1).map(key => {
        a += `/${data[key]}`
        if (key === 'league' || key === 'match') a += '/overview'
    })

    return a
}

const find = (d, v, m) => {
    return d.find((e => {
        return e[v] === parseInt(m, 10)
    }))
}

const Breadcrumbs = () => {
    const {url} = useSelector((state) => state.url)
    const {breadcrumbs} = useSelector((state) => state.breadcrumbs)
    const dispatch = useDispatch();
    const {sport} = useSelector((state) => state.sport)
    const {category} = useSelector((state) => state.category)
    const {league} = useSelector((state) => state.league)

    useEffect(() => {

        if (url.id) {
            !checkData(sport)
                ?
                    dispatch(setBreadcrumbs(parseInt(url.id, 10), find(sport, '_id', url.id).name, 0))
                :
                    dispatch(loadSportData())

        }
        if(url.category) {
            !checkData(category)
                ?
                    dispatch(setBreadcrumbs(parseInt(url.category, 10), find(category, '_id', url.category).name, 1))
                :
                    dispatch(loadCategoryData(url.id))
        }
        if(url.league) {

            !checkData(league)
                ?
                    dispatch(setBreadcrumbs(parseInt(url.league, 10), find(Object.values(league), 'currentseason', url.league).name, 2))
                :
                    dispatch(loadLeagueData(url.id, url.category))
        }


    }, [url, sport, category, league])

    return (
        <div className={style.block}>
            {
                !checkData(breadcrumbs) &&
                Object.keys(url).map((key, i) =>
                    <NavLink
                        key={key}
                        to={setLink(url, i)}
                        className={style.item}
                        aria-label={key}
                    >
                        <span>{breadcrumbs[i] ? breadcrumbs[i].name : url[key]}</span>
                    </NavLink>
                )
            }
        </div>
    );
}

export default Breadcrumbs;
