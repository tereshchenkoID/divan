import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import checkData from "helpers/checkData";
import {setUrl} from "store/actions/urlAction";
import {loadCategoryData} from "store/actions/categoryAction";
import {setBreadcrumbs} from "store/actions/breadcrumbsAction";

import Loader from "components/Loader";
import Container from "components/Container";
import Search from "components/Search";
import Item from "./Item";

import style from './index.module.scss';

const Sport = () => {
    let url = useParams()
    const dispatch = useDispatch()
    const {category} = useSelector((state) => state.category);
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')

    useEffect(() => {
        dispatch(loadCategoryData(url.id)).then(() => {
            setLoading(false)
        })

        if (!checkData(category)) {
            dispatch(setUrl(url))
            dispatch(setBreadcrumbs({
                0: {
                    id: parseInt(category._id, 10),
                    name: category.name
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
                                    searchItems(category.realcategories).map((el, idx) =>
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
