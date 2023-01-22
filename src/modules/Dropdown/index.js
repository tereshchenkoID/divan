import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";

import {fetchData} from "helpers/api";

import {setUrl} from "store/actions/urlAction";
import {loadSportData} from "store/actions/sportAction";

import Search from "components/Search";
import Item from "./Item";

import style from './index.module.scss';

const Dropdown = ({data, action, buttonRef}) => {
    const dispatch = useDispatch()
    const {sport} = useSelector((state) => state.sport);
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
        sport.length === 0 && dispatch(loadSportData())
    }, []);

   const resetFilter = () => {
       setSearchSport('')
       setSearchCategory('')
       setSearchLeague('')
       setStep(0)
       setCategory([])
       setLeague({})

       setActiveSport('')
       setActiveCategory('')
       setActiveLeague('')
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
                    <Search setSearch={setSearchSport} />
                    <hr className={style.divider}/>
                    <div className={style.list}>
                        {
                            searchItems(sport, searchSport).map((el, idx) =>
                                <div
                                    className={style.item}
                                    key={idx}
                                    onClick={() => {
                                        setActiveSport(idx)
                                        setActiveCategory('')
                                        setActiveLeague('')
                                        fetchData(`config_tree_mini/41/0/${el._id}`).then((data) => {
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
                                </div>
                            )
                        }
                    </div>
                </div>
                {
                    step >= 1 &&
                    <div className={style.column}>
                        <div className={style.header}>Region</div>
                        <Search setSearch={setSearchCategory} />
                        <hr className={style.divider}/>
                        <div className={style.list}>
                            {
                                searchItems(category, searchCategory).map((el, idx) =>
                                    <div
                                        className={style.item}
                                        key={idx}
                                        onClick={() => {
                                            setActiveCategory(idx)
                                            setActiveLeague('')
                                            fetchData(`config_tree_mini/41/0/${el._sid}/${el._id}`).then((data) => {
                                                setLeague(data.doc[0].data[0].realcategories[0].uniquetournaments,)
                                                setStep(2)
                                            })
                                        }}
                                    >
                                        <Item
                                            data={el}
                                            type={1}
                                            active={activeCategory === idx}
                                        />
                                    </div>
                                )
                            }
                        </div>
                    </div>
                }
                {
                    step >= 2 &&
                    <div className={style.column}>
                        <div className={style.header}>Tournament</div>
                        <Search setSearch={setSearchLeague} />
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
                                            setActiveLeague(idx)
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
