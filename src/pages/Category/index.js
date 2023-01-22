import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from 'react-router-dom';

import {loadLeagueData} from "store/actions/leagueAction";
import {setUrl} from "store/actions/urlAction";

import Loader from "components/Loader";
import Container from "components/Container";
import Search from "components/Search";
import Item from "./Item";

import style from './index.module.scss';

const Category = () => {
    let url = useParams();
    const dispatch = useDispatch()
    const {league} = useSelector((state) => state.league);
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')

    useEffect(() => {
        dispatch(loadLeagueData(url.id, url.category)).then(() => {
            if (!league) return null;
            if (league)
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
                                <Search
                                    search={search}
                                    setSearch={setSearch}
                                />
                                <div className={style.list}>
                                    {
                                        searchItems(Object.values(league)).map((el, idx) =>
                                            <div
                                                className={style.item}
                                                key={idx}
                                            >
                                                <Item data={el} />
                                            </div>
                                        )
                                    }
                                </div>
                            </>
                }
            </div>
        </Container>
    );
}

export default Category;
