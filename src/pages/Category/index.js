import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from 'react-router-dom';

import checkData from "helpers/checkData";

import {setUrl} from "store/actions/urlAction";
import {loadLeagueData} from "store/actions/leagueAction";
import {setBreadcrumbs} from "store/actions/breadcrumbsAction";

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
            setLoading(false)
        })

        if (!checkData(league)) {
            dispatch(setUrl(url))
            dispatch(setBreadcrumbs({
                0: {
                    id: parseInt(league._id, 10),
                    name: league.name
                },
                1: {
                    id: parseInt(league.realcategories[0]._id, 10),
                    name: league.realcategories[0].name
                }
            }))
        }
    }, [loading]);

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
                                        searchItems(Object.values(league.realcategories[0].uniquetournaments)).map((el, idx) =>
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
