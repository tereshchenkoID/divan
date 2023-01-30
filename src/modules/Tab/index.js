import {useState, useRef, useEffect} from "react";
import {NavLink} from "react-router-dom";
import {useTranslation} from "react-i18next";

import classNames from "classnames";

import style from './index.module.scss';

import Icon from "components/Icon";

const matchLinks = (t) => {
    return [
        {
            text: t(`interface.overview`),
            path: 'overview'
        },
        {
            text:  t(`interface.h2h`),
            path: 'h2h'
        },
        {
            text:  t(`interface.archive`),
            path: 'tables'
        },
        {
            text:  t(`interface.archive`),
            path: 'archive'
        }
    ]
}

const leagueLinks = (t) => {
    return [
        {
            text: t(`interface.overview`),
            path: 'overview'
        },
        {
            text:  t(`interface.league_table`),
            path: 'tables'
        },
        {
            text:  t(`interface.teams`),
            path: 'teams'
        },
        {
            text:  t(`interface.archive`),
            path: 'archive'
        }
    ]
}

const Tab = ({url}) => {
    const { t } = useTranslation()
    const childRef = useRef([])
    const [select, setSelect] = useState('Overview')
    const [icon, setIcon] = useState('overview')
    const [toggle, setToggle] = useState(false)
    const links = url.category ? leagueLinks(t) : matchLinks(t)

    const handleClick = (text, icon) => {
        setSelect(text)
        setIcon(icon)
        setToggle(!toggle)
    }

    const setDefault = (text, icon) => {
        setSelect(text)
        setIcon(icon)
    }

    const setUrl = (path) => {
        let a = ''

        // eslint-disable-next-line array-callback-return
        Object.keys(url).map(key => {
            a += `/${url[key]}`
        })

        return `${a}/${path}`
    }

    useEffect(() => {
        // eslint-disable-next-line array-callback-return
        childRef.current.map(ref => {
            if (ref.className.split(' ').length > 1) {
                setDefault(ref.dataset.text, ref.dataset.icon)
            }
        })
    }, [childRef])

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
                                    isActive && style.active,
                                    style.link,
                                )
                            }
                            data-text={el.text}
                            data-icon={el.path}
                            ref={el => childRef.current[idx] = el}
                            onClick={() => {handleClick(el.text, el.path)}}
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
