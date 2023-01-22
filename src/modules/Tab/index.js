import {NavLink} from "react-router-dom";
import {useState} from "react";

import classNames from "classnames";

import style from './index.module.scss';

import Icon from "components/Icon";

const matchLinks = [
    {
        text: 'Overview',
        path: 'overview'
    },
    {
        text: 'Head to Head',
        path: 'h2h'
    },
    {
        text: 'Tables',
        path: 'tables'
    },
    {
        text: 'Archive',
        path: 'archive'
    }
]

const leagueLinks = [
    {
        text: 'Overview',
        path: 'overview'
    },
    {
        text: 'Tables',
        path: 'tables'
    },
    {
        text: 'Teams',
        path: 'teams'
    },
    {
        text: 'Archive',
        path: 'archive'
    }
]

const Tab = ({url}) => {
    const [select, setSelect] = useState('Overview')
    const [icon, setIcon] = useState('overview')
    const [toggle, setToggle] = useState(false)

    const links = url.category ? leagueLinks : matchLinks

    const handleClick = (text, icon) => {
        setSelect(text)
        setIcon(icon)
        setToggle(!toggle)
    }

    const setDefault = (text, icon) => {
        setSelect(text)
        setIcon(icon)

        return 'active'
    }

    const setUrl = (path) => {
        let a = ''

        // eslint-disable-next-line array-callback-return
        Object.keys(url).map(key => {
            a += `/${url[key]}`
        })

        return `${a}/${path}`
    }

    return (
        <div className={style.block}>
            <div
                className={style.select}
                onClick={() => setToggle(!toggle)}
            >
                <Icon id={icon}/>
                <span className={style.text}>{select}</span>
                <span className={style.icon}>
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 23.2L3.3 10.5l1.4-1.4L16 20.4 27.3 9.1l1.4 1.4z" />
                    </svg>
                </span>
            </div>
            <div className={classNames(style.dropdown, toggle && style.active)}>
                {
                    links.map((el, idx) =>
                        <NavLink
                            key={idx}
                            to={setUrl(el.path)}
                            className={({ isActive }) =>
                                classNames(
                                    isActive && style[setDefault(el.text, el.path)],
                                    style.link,
                                )
                            }
                            onClick={() => {handleClick(el.text, el.icon)}}
                            aria-label={el.text}
                        >
                            <Icon id={el.path}/>
                            <span className={style.text}>{el.text}</span>
                            <span className={style.icon}>
                                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11 27.9l-1.4-1.5 10.6-10.6L9.6 5.2l1.5-1.4 12 12z" />
                                </svg>
                            </span>
                        </NavLink>
                    )
                }
            </div>
        </div>
    );
}

export default Tab;
