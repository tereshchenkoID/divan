import {useEffect} from "react";
import {useSelector} from "react-redux";
import {NavLink} from "react-router-dom";

import style from './index.module.scss';

const setLink = (data, i) => {
    let a = ''

    Object.keys(data).splice(0, i + 1).map(key => {
        a += `/${data[key]}`
        if (key === 'league' || key === 'match') a += '/overview'
    })

    return a
}

const Breadcrumbs = () => {
    const {url} = useSelector((state) => state.url);

    useEffect(() => {

    }, [url]);

    return (
        <div className={style.block}>
            {
                Object.keys(url).map((key, i) =>
                    <NavLink
                        key={key}
                        to={setLink(url, i)}
                        className={style.item}
                        aria-label={key}
                    >
                        <span>{url[key]}</span>
                    </NavLink>
                )
            }
        </div>
    );
}

export default Breadcrumbs;
