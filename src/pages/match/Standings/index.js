import {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";

import {setUrl} from "store/actions/urlAction";

import style from './index.module.scss';

import Loader from "components/Loader";
import Container from "components/Container";

const Standings = () => {
    let url = useParams()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        dispatch(setUrl(url))
    }, []);

    return (
        <div className={style.block}>
            <Container>
                {
                    loading
                        ?
                            <Loader />
                        :
                            <div>
                                Standings Match
                            </div>
                }
            </Container>
        </div>
    );
}

export default Standings;
