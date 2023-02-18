import {useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";
import {NavLink} from "react-router-dom";

import classNames from "classnames";

import {fetchData} from "helpers/api";
import {setUrl} from "store/actions/urlAction";

import Search from "components/Search";
import Loader from "components/Loader";
import Item from "./Item";

import style from './index.module.scss';

const Dropdown = ({data, action, buttonRef}) => {
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const [loading, setLoading] = useState(true)
    const [sport, setSport] = useState([])
    const [category, setCategory] = useState([])
    const [league, setLeague] = useState({})
    const [step, setStep] = useState(0)
    const [searchSport, setSearchSport] = useState('')
    const [searchCategory, setSearchCategory] = useState('')
    const [searchLeague, setSearchLeague] = useState('')

    const [activeSport, setActiveSport] = useState('')
    const [activeCategory, setActiveCategory] = useState('')
    const [activeLeague, setActiveLeague] = useState('')

    const blockRef = useRef(null)

    useEffect(() => {
        fetchData('config_sports').then((data) => {
            setSport(data.doc[0].data)
            setLoading(false)
        })
    }, []);

    const useOutsideClick = (elementRef, handler, attached = true) => {
        useEffect(() => {
            if (!attached) return;

            const handleClick = (e) => {

                if (e.target === buttonRef.current) return;
                if (!elementRef.current && !buttonRef.current) return
                if (!elementRef.current.contains(e.target)) {
                    handler()
                    action(false)
                }
            }

            document.addEventListener('click', handleClick)

            return () => {
                document.removeEventListener('click', handleClick)
            }

        }, [elementRef, handler, attached])
    }

    const searchItems = (data, search) => {
        return data.filter(item => item.name.toLowerCase().indexOf(search) !== -1)
    }

    useOutsideClick(blockRef, action, data)

    return (
        <div
            className={style.block}
            ref={blockRef}
        >
            <div
                className={
                    classNames(
                        style.body,
                        style[`step-${step}`]
                    )
                }
            >
                {
                    loading
                    ?
                        <Loader type={'block'} />
                    :
                        <div className={style.column}>
                            <div className={style.header}>{t('interface.sport')}</div>
                            <Search setSearch={setSearchSport} />
                            <hr className={style.divider}/>
                            <ul className={style.list}>
                                {
                                    searchItems(sport, searchSport).map((el, idx) =>
                                        <li
                                            className={style.item}
                                            key={idx}
                                            onClick={() => {
                                                setActiveSport(idx)
                                                setActiveCategory('')
                                                setActiveLeague('')
                                                fetchData(`config_tree/${el._id}`).then((data) => {
                                                    setCategory(data.doc[0].data[0].realcategories)
                                                    setStep(1)
                                                })
                                            }}
                                        >
                                            <Item
                                                data={el}
                                                type={0}
                                                active={activeSport === idx}
                                            />
                                        </li>
                                    )
                                }
                            </ul>
                        </div>
                }
                {
                    step >= 1 &&
                    <div className={style.column}>
                        <div className={style.header}>{t('interface.region')}</div>
                        <Search setSearch={setSearchCategory} />
                        <hr className={style.divider}/>
                        <ul className={style.list}>
                            {
                                searchItems(category, searchCategory).map((el, idx) =>
                                    <li
                                        className={style.item}
                                        key={idx}
                                        onClick={() => {
                                            setActiveCategory(idx)
                                            setActiveLeague('')
                                            fetchData(`config_tree/${el._sid}/${el._id}`).then((data) => {
                                                setLeague(data.doc.data.realcategories[0].tournaments)
                                                setStep(2)
                                            })
                                        }}
                                    >
                                        <Item
                                            data={el}
                                            type={1}
                                            active={activeCategory === idx}
                                        />
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                }
                {
                    step >= 2 &&
                    <div className={style.column}>
                        <div className={style.header}>{t('interface.tournament')}</div>
                        <Search setSearch={setSearchLeague} />
                        <hr className={style.divider}/>
                        <div className={style.list}>
                            {
                                searchItems(Object.values(league), searchLeague).map((el, idx) =>
                                    <NavLink
                                        to={`/${el._sid}/${el._rcid}/${el.seasonid}/overview`}
                                        className={style.item}
                                        key={idx}
                                        aria-label={data.name}
                                        onClick={() => {
                                            setActiveLeague(idx)
                                            dispatch(setUrl({
                                                id: el._sid,
                                                category: el._rcid,
                                                league: el.seasonid
                                            }))
                                            action(false)
                                        }}
                                    >
                                        <Item
                                            data={el}
                                            type={2}
                                            active={activeLeague === idx}
                                        />
                                    </NavLink>
                                )
                            }
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default Dropdown;
