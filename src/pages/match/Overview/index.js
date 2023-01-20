import {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";

import {setUrl} from "../../../store/actions/urlAction";

import {getSeason} from "../../../helpers/api";

import style from './index.module.scss';

import Loader from "../../../components/Loader";
import Container from "../../../components/Container";

const Overview = () => {
    let url = useParams()
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {

        getSeason(`stats_season_overunder/${url.league}`).then(data => {
            setData(data.data[0])
            setLoading(false)
            dispatch(setUrl(url))

            // console.log(data)
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
                            Season
                        </>
                }
            </div>
        </Container>
    );
}

export default Overview;
