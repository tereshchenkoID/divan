import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";

import {setCategory} from "store/actions/categoryAction";
import {setUrl} from "store/actions/urlAction";

import {getCategory} from "helpers/api";

import style from './index.module.scss';

import Loader from "components/Loader";
import Container from "components/Container";
import Search from "components/Search";
import Item from "./Item";

const Sport = () => {
    let url = useParams()
    const dispatch = useDispatch()
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')

    useEffect(() => {
        getCategory(`config_tree_mini/41/0/${url.id}`).then(data => {
            setData(data.data[0].realcategories)
            dispatch(setCategory(data.data[0].realcategories))
            dispatch(setUrl(url))
            setLoading(false)
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
                                    searchItems(data).map((el, idx) =>
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

export default Sport;
