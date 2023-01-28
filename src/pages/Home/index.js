import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {setUrl} from "store/actions/urlAction";
import {loadSportData} from "store/actions/sportAction";

import Loader from "components/Loader";
import Container from "components/Container";
import Item from "./Item";

import style from './index.module.scss';

const Home = () => {
    const dispatch = useDispatch()
    const {sport} = useSelector((state) => state.sport)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        dispatch(loadSportData()).then(() => {
            if (!sport) return null;
            if (sport) {
                setLoading(false)
                dispatch(setUrl({}))
            }
        })
    }, []);

    return (
        <Container>
            {
                loading
                    ?
                    <Loader />
                    :
                    <div className={style.list}>
                        {
                            sport.map((el, idx) =>
                                <div key={idx}>
                                    <Item data={el} />
                                </div>
                            )
                        }
                    </div>
            }
        </Container>
    );
}

export default Home;
