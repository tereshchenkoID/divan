import {useState, useEffect} from "react";
import { useParams } from 'react-router-dom';

import axios from 'axios';

import style from './index.module.scss';

import Loader from "../../components/Loader";
import Container from "../../components/Container";
import Category from "./Category";

const Sport = () => {
    let { id } = useParams();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`https://stats.fn.sportradar.com/betradar/en/Europe:Berlin/gismo/config_tree_mini/41/0/${id}`)
            .then(res => {
                setData(res.data)
                setLoading(false)

                console.log(res.data)
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
                                    data.doc[0].data[0].realcategories.map((el, idx) =>
                                        <div
                                            className={style.item}
                                            key={idx}
                                        >
                                            <Category data={el} />
                                        </div>
                                    )
                                }
                            </div>
                }
            </Container>
        </div>
    );
}

export default Sport;
