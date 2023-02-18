import {useState, useEffect} from "react";
import {useDispatch} from "react-redux";

import {setUrl} from "store/actions/urlAction";
import {fetchData} from "helpers/api";

import Loader from "components/Loader";
import Container from "components/Container";
import Search from "components/Search";
import Item from "./Item";

import style from './index.module.scss';

const searchItems = (data, search) => {
    return data.filter(item => item.name.toLowerCase().indexOf(search) !== -1)
}
const Settings = () => {
    const dispatch = useDispatch()
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')

    useEffect(() => {
        dispatch(setUrl({}))

        fetchData('config_language').then((data) => {
            setData(data)
            setLoading(false)
        })
    }, []);

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
                                        searchItems(data.doc[0].data, search).map((el, idx) =>
                                            <li
                                                key={idx}
                                                className={style.item}
                                            >
                                                <Item
                                                    data={el}
                                                />
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

export default Settings;
