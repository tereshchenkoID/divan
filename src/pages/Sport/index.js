import {useState, useEffect} from "react";

import axios from 'axios';

import style from './index.module.scss';

import Loader from "../../components/Loader";
import Container from "../../components/Container";
import Category from "./Category";

const Home = () => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`./json/categories.json`)
            .then(res => {
                setData(res.data)
                setLoading(false)
            })
    }, []);

    return (
        <div className={style.block}>
            <Container>
                {
                    loading
                        ?
                            <Loader />
                        :
                            <div className={style.list}>
                                {
                                    data.RESULTS.map((el, idx) =>
                                        <div key={idx}>
                                            <Category
                                                id={el.ID}
                                                text={el.NA}
                                            />
                                        </div>
                                    )
                                }
                            </div>
                }
            </Container>
        </div>
    );
}

export default Home;
