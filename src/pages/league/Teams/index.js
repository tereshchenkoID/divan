import {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import {useParams, NavLink} from "react-router-dom";

import {setUrl} from "store/actions/urlAction";

import {fetchData} from "helpers/api";
import {useLocalStorage} from "helpers/localStorage";

import Loader from "components/Loader";
import Container from "components/Container";
import Search from "components/Search";

import style from './index.module.scss';

const Teams = () => {
    let url = useParams()
    const dispatch = useDispatch()
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const {getLocalStorage} = useLocalStorage()

    useEffect(() => {
        fetchData(`https://stats.fn.sportradar.com/betradar/${getLocalStorage('i18nextLng')}/Europe:Helsinki/gismo/stats_season_teams2/${url.league}`).then((data) => {
            setData(data.doc[0].data)
            setLoading(false)
            dispatch(setUrl(url))
        })
    }, []);

    const searchItems = (data) => {
        return data.filter(item => item.name.toLowerCase().indexOf(search) !== -1)
    }

    return (
        <Container>
            <div className={style.block}>
                {
                    loading
                        ?
                        <Loader />
                        :
                        <>
                            <Search setSearch={setSearch} />
                            <div className={style.list}>
                                {
                                    searchItems(data.teams).map((el, idx) =>
                                        <NavLink
                                            key={idx}
                                            className={style.item}
                                            to={`/${url.id}/${url.category}/${url.league}/team/${el._id}`}
                                        >
                                            {
                                                el.cc &&
                                                <span className={style.country}>
                                                    <img src={`https://img.sportradar.com/ls/crest/big/${el.cc.a2}.png`} alt={el.name} />
                                                </span>
                                            }
                                            {el.name}
                                        </NavLink>
                                    )
                                }
                            </div>
                        </>
                }
            </div>
        </Container>
    );
}

export default Teams;
