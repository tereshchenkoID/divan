import {useState, useEffect} from "react";
import {useDispatch} from "react-redux";

import {setUrl} from "store/actions/urlAction";
import {fetchData} from "helpers/api";

import Loader from "components/Loader";
import Container from "components/Container";
import Item from "./Item";

import style from './index.module.scss';

const Home = () => {
    const dispatch = useDispatch()
    const [sport, setSport] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchData('config_sports').then((json) => {
            setSport(json.doc[0].data)
            setLoading(false)
            dispatch(setUrl({}))
        })
    }, []);

    return (
        <Container>
            {
                loading
                    ?
                        <Loader />
                    :
                        <ul className={style.list}>
                            {
                                sport.map((el, idx) =>
                                    <li key={idx}>
                                        <Item data={el} key={idx}/>
                                    </li>
                                )
                            }
                        </ul>
            }
        </Container>
    );
}

export default Home;
