import {NavLink} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";

import style from './index.module.scss';

import Container from "components/Container";
import Logo from "components/Logo";
import Social from "components/Social";
import Breadcrumbs from "modules/Breadcrumbs";
import Dropdown from "modules/Dropdown";
import Tab from "modules/Tab";

const Navigation = () => {
    const {url} = useSelector((state) => state.url);
    const [toggle, setToggle] = useState(false)
    const [tab, setTab] = useState(false)
    const buttonRef = useRef(null)

    useEffect(() => {
        setTab(url.league)
    }, [url]);

    return (
        <nav className={style.block}>
            <div className={style.top}>
                <Container>
                    <Logo />
                </Container>
            </div>
            <div className={style.center}>
                <Container>
                    <div className={style.options}>
                        <button
                            ref={buttonRef}
                            className={style.toggle}
                            onClick={() => {
                                setToggle(!toggle)
                            }}
                        >
                            {
                                toggle
                                    ?
                                        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17.4 16l6.3 6.3-1.4 1.4-6.3-6.3-6.3 6.3-1.4-1.4 6.3-6.3-6.3-6.3 1.4-1.4 6.3 6.3 6.3-6.3 1.4 1.4z" />
                                        </svg>
                                    :
                                        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5 7h22v2H5V7zM5 15h22v2H5v-2zM5 23h22v2H5v-2z" />
                                        </svg>
                            }
                        </button>
                        <div>
                            <Breadcrumbs />
                        </div>
                        <div className={style.meta}>
                            <Social />
                            <hr className={style.divider} />
                            <NavLink
                                to='/settings'
                                className={style.link}
                                onClick={() => {
                                    setToggle(false)
                                }}
                                aria-label={"Settings"}
                            >
                                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M29 23v-.4l2.3-1.8-2.7-4.5-2.8 1-.7-.4-.4-2.9h-5.3l-.5 3a7 7 0 0 0-.8.4l-2.7-1.1-2.7 4.5 2.4 1.8v.8l-2.4 1.8 2.7 4.6 2.8-1.1.7.4.5 2.9h5.3l.4-3c.3 0 .5-.2.8-.3l2.7 1 2.7-4.5-2.4-1.8V23zm-2.1-.7v2l1.8 1.4-1 1.6-2.2-.9-.4.4-1.2.6-.6.3-.4 2.3h-1.8l-.4-2.3-.5-.2-1.3-.7-.4-.4-2.3.9-.9-1.6 1.9-1.4v-.6L17 23v-.7l.1-.6-1.9-1.4 1-1.6 2.2.9.4-.3a5 5 0 0 1 1.2-.7l.6-.3.4-2.3h1.8l.4 2.3.5.2 1.3.8.4.3 2.3-.9.9 1.6-1.9 1.4zm-2.2.7a2.7 2.7 0 1 1-2.7-2.7c1.5 0 2.7 1.2 2.7 2.7zm-13.8-6.7l-3 .3h.2L8 14c0-1 0-2 .2-2.9v.2l4.8.5V13a1 1 0 0 0 2 0v-1.2c3.7-.1 7.2-.9 10.3-2.2h-.1c.3.8.5 1.6.6 2.5a1 1 0 1 0 2-.3 14 14 0 0 0-26.3-4h-.1V8a13.6 13.6 0 0 0 0 12.1 14 14 0 0 0 6 6.3h.1l1.4.3 1-.5.7-.7.2-1.1-.2-.7-.2-.3c-.9-1.4-1.5-3-1.9-4.7v-.1c.7-.1 1.6-.3 2.5-.3a1 1 0 1 0 0-2zm-4.7.8c-1.3.4-2.5.8-3.5 1.3h.1a11.5 11.5 0 0 1 0-8.8c1 .4 2 .8 3.2 1.1h.2L6 14v.1c0 1.1 0 2.2.2 3.2v-.1zm18-9.3c-.7.4-1.7.7-2.6 1h-.2A16 16 0 0 0 19.1 3c2.2 1.1 4 2.7 5.1 4.7zm-4.7 1.4c-1.3.3-2.9.4-4.5.5V2.2c2 .7 3.6 3.4 4.5 7zm-6.5-7v7.5c-1.6 0-3.2-.2-4.7-.5h.2C9.3 5.6 11 3 13 2.2zm-4.1 1C7.9 4.7 7 6.5 6.6 8.6c-1.2-.2-2.1-.5-3-1l.1.1c1.3-2 3-3.6 5.1-4.6H9zm-.2 21.2v.2h-.4c-2-1-3.5-2.6-4.6-4.4L6.4 19h.1c.5 2 1.2 3.8 2.3 5.4z" />
                                </svg>
                            </NavLink>
                        </div>
                    </div>
                </Container>
            </div>
            {
                tab &&
                <div className={style.bottom}>
                    <Container>
                        <Tab url={url} />
                    </Container>
                </div>
            }
            <Container>
                <Dropdown
                    data={toggle}
                    action={setToggle}
                    buttonRef={buttonRef}
                />
            </Container>
        </nav>
    );
}

export default Navigation;
