import {useEffect} from "react";
import {useSelector} from "react-redux";
import {NavLink} from "react-router-dom";

import checkData from "helpers/checkData";

import style from './index.module.scss';

const setLink = (data, i) => {
    let a = ''

    // eslint-disable-next-line array-callback-return
    Object.keys(data).splice(0, i + 1).map(key => {
        a += `/${data[key]}`
        if (key === 'league' || key === 'match') a += '/overview'
    })

    return a
}

const Breadcrumbs = () => {
    const {url} = useSelector((state) => state.url)
    const {breadcrumbs} = useSelector((state) => state.breadcrumbs)

    useEffect(() => {
    }, [breadcrumbs])

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
