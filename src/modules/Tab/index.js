import {NavLink} from "react-router-dom";
import {useState} from "react";
import classNames from "classnames";

import style from './index.module.scss';

import Icon from "components/Icon";

const links = [
    {
        text: 'Overview',
        icon: 'overview',
        path: 'overview'
    },
    // {
    //     text: 'Head to Head',
    //     icon: 'h2h',
    //     path: 'h2h'
    // },
    {
        text: 'Tables',
        icon: 'tables',
        path: 'standings'
    },
    {
        text: 'Teams',
        icon: 'teams',
        path: 'teams'
    },
    {
        text: 'Archive',
        icon: 'archive',
        path: 'archive'
    }
]

const Tab = ({url}) => {
    const [select, setSelect] = useState('Overview')
    const [icon, setIcon] = useState('overview')
    const [toggle, setToggle] = useState(false)

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
                            to={`/${url.id}/${url.category}/${url.league}/${el.path}`}
                            className={({ isActive }) =>
                                classNames(
                                    isActive && style[setDefault(el.text, el.icon)],
                                    style.link,
                                )
                            }
                            onClick={() => {handleClick(el.text, el.icon)}}
                            aria-label={el.text}
                        >
                            <Icon id={el.icon}/>
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
