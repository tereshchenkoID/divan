import {useState, useEffect} from "react";

import {getLanguage} from "helpers/api";

import style from './index.module.scss';

import Loader from "components/Loader";
import Container from "components/Container";
import Search from "components/Search";
import Item from "./Item";

const Home = () => {
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')

    useEffect(() => {
        getLanguage('config_languages/41').then(data => {
            setData(data)
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
                                        searchItems(data.doc[0].data).map((el, idx) =>
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

export default Home;
