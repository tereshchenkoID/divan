import {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import {useParams} from 'react-router-dom';

import {setUrl} from "store/actions/urlAction";
import {setBreadcrumbs} from "store/actions/breadcrumbsAction";

import {fetchData} from "helpers/api";

import Loader from "components/Loader";
import Container from "components/Container";
import Search from "components/Search";
import Item from "./Item";

import style from './index.module.scss';


const Category = () => {
    let url = useParams();
    const dispatch = useDispatch()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')

    useEffect(() => {
        fetchData(`config_tree/${url.id}/${url.category}`).then((json) => {
            setData(json.doc.data)
            dispatch(setUrl(url))
                dispatch(setBreadcrumbs({
                    0: {
                        id: parseInt(json.doc.data._id, 10),
                        name: json.doc.data.name
                    },
                    1: {
                        id: parseInt(json.doc.data.realcategories[0]._id, 10),
                        name: json.doc.data.realcategories[0].name
                    }
                }))

            setLoading(false)
        })
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
                                <ul className={style.list}>
                                    {
                                        searchItems(Object.values(data.realcategories[0].tournaments)).map((el, idx) =>
                                            <li
                                                key={idx}
                                                className={style.item}
                                            >
                                                <Item data={el} />
                                            </li>
                                        )
                                    }
                                </ul>
                            </>
                }
            </div>
        </Container>
    );
}

export default Category;
