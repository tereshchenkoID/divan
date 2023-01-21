import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";

import {setSport} from "store/actions/sportAction";
import {setUrl} from "store/actions/urlAction";

import checkData from "helpers/checkData";
import {getCategory, getSport} from "helpers/api";

import style from './index.module.scss';

import Search from "components/Search";
import Item from "./Item";

const Dropdown = ({data, action, buttonRef}) => {
    const dispatch = useDispatch()
    const {sport} = useSelector((state) => state.sport);
    const [category, setCategory] = useState([])
    const [league, setLeague] = useState({})

    const [searchSport, setSearchSport] = useState('')
    const [searchCategory, setSearchCategory] = useState('')
    const [searchLeague, setSearchLeague] = useState('')

    const blockRef = useRef(null)

    useEffect(() => {
        sport.length === 0 && fetchSport()
    }, []);

   const resetFilter = () => {
        setSearchSport('')
        setSearchCategory('')
        setSearchLeague('')
        setCategory([])
        setLeague({})
        action(false)
   }

    const useOutsideClick = (elementRef, handler, attached = true) => {

        useEffect(() => {
            if (!attached) return;

            const handleClick = (e) => {

                if (e.target === buttonRef.current) return;
                if (!elementRef.current && !buttonRef.current) return
                if (!elementRef.current.contains(e.target)) {
                    handler()

                    resetFilter()
                }
            }

            document.addEventListener('click', handleClick)

            return () => {
                document.removeEventListener('click', handleClick)
            }

        }, [elementRef, handler, attached])
    }

    const fetchSport = () => {
        getSport(`config_sports/41/0`).then(data => {
            dispatch(setSport(data.data))
        })
    }

    const fetchCategory = (data) => {
        getCategory(`config_tree_mini/41/0/${data._id}`).then(data => {
            setCategory(data.data[0].realcategories)
        })
    }

    const fetchLeague = (data) => {
        getCategory(`config_tree_mini/41/0/${data._sid}/${data._id}`).then(data => {
            console.log(data)

            setLeague(Object.values(data.data[0].realcategories[0].uniquetournaments))
        })
    }

    const searchItems = (data, search) => {
        return data.filter(item => item.name.toLowerCase().indexOf(search) !== -1)
    }

    useOutsideClick(blockRef, action, data)

    if (!data) return null;

    return (
        <div className={style.block} ref={blockRef}>
            <div className={style.body}>
                <div className={style.column}>
                    <div className={style.header}>Sports</div>
                    <Search
                        search={searchSport}
                        setSearch={setSearchSport}
                    />
                    <hr className={style.divider}/>
                    <div className={style.list}>
                        {
                            searchItems(sport, searchSport).map((el, idx) =>
                                <div
                                    className={style.item}
                                    key={idx}
                                    onClick={() => {
                                        fetchCategory(el)
                                    }}
                                >
                                    <Item
                                        data={el}
                                        type={0}
                                    />
                                </div>
                            )
                        }
                    </div>
                </div>
                {
                    category.length > 0 &&
                    <div className={style.column}>
                        <div className={style.header}>Region</div>
                        <Search
                            search={searchCategory}
                            setSearch={setSearchCategory}
                        />
                        <hr className={style.divider}/>
                        <div className={style.list}>
                            {
                                searchItems(category, searchCategory).map((el, idx) =>
                                    <div
                                        className={style.item}
                                        key={idx}
                                        onClick={() => {
                                            fetchLeague(el)
                                        }}
                                    >
                                        <Item
                                            data={el}
                                            type={1}
                                        />
                                    </div>
                                )
                            }
                        </div>
                    </div>
                }
                {
                    !checkData(league) &&
                    <div className={style.column}>
                        <div className={style.header}>Tournament</div>
                        <Search
                            search={searchLeague}
                            setSearch={setSearchLeague}
                        />
                        <hr className={style.divider}/>
                        <div className={style.list}>
                            {
                                searchItems(Object.values(league), searchLeague).map((el, idx) =>
                                    <NavLink
                                        to={`/${el._sid}/${el._rcid}/${el.currentseason}/overview`}
                                        className={style.item}
                                        key={idx}
                                        aria-label={data.name}
                                        onClick={() => {
                                            dispatch(setUrl({
                                                id: el._sid,
                                                category: el._rcid,
                                                league: el.currentseason
                                            }))
                                            resetFilter()
                                        }}
                                    >
                                        <Item
                                            data={el}
                                            type={2}
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
