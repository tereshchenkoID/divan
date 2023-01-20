import {useState, useEffect} from "react";
import {useDispatch} from "react-redux";

import {setSport} from "../../store/actions/sportAction";
import {setUrl} from "../../store/actions/urlAction";

import {getSport} from "../../helpers/api";

import style from './index.module.scss';

import Loader from "components/Loader";
import Container from "components/Container";
import Item from "./Item";

const Home = () => {
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        getSport(`config_sports/41/0`).then(data => {
            setData(data.data)
            dispatch(setSport(data.data))
            dispatch(setUrl({}))
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
                                    data.map((el, idx) =>
                                        <div key={idx}>
                                            <Item data={el} />
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
