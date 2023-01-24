import {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";

import {setUrl} from "store/actions/urlAction";

import {fetchData} from "helpers/api";

import Loader from "components/Loader";
import Container from "components/Container";

import style from './index.module.scss';

const Overview = () => {
    let url = useParams()
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        fetchData(`stats_season_overunder/${url.league}`).then((data) => {
            setData(data)
            setLoading(false)
            dispatch(setUrl(url))
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
                            Season League
                        </>
                }
            </div>
        </Container>
    );
}

export default Overview;
