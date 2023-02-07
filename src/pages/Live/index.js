import {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import {NavLink, useParams} from "react-router-dom";

import classNames from "classnames";

import {fetchData} from "helpers/api";
import {setUrl} from "store/actions/urlAction";

import Loader from "components/Loader";
import Container from "components/Container";

import style from './index.module.scss';

const Live = () => {
    const url = useParams()
    const dispatch = useDispatch()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    const sport = [
        "football",
        "tennis",
        "basketball",
        "volleyball",
        "hockey",
        "handball",
        "end"
    ]

    useEffect(() => {
        dispatch(setUrl(url))

        sport.map(el => {
            if (el !== 'end') {
                fetchData(`https://matchtracker.live/stats/${el}/`).then((data) => {
                    data && setData(prev => [...prev, data])
                })
            }
            else {
                setLoading(false)
            }

            return true
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
                            data.map((el, idx) =>
                                <div
                                    key={idx}
                                    className={style.panel}
                                >
                                    <div className={style.head}>
                                        {el[0].sportName}:
                                    </div>
                                    <div className={style.body}>
                                        {
                                            el.map((el, idx) =>
                                                <NavLink
                                                    to={`/${el.sportId}/${el.statsId}/overview`}
                                                    className={classNames(style.item, !el.statsId && style.disabled)}
                                                    aria-label={data.categoryName}
                                                    key={idx}
                                                >
                                                    <span>{el.league && el.league.name}:</span>
                                                    <strong>{el.home && el.home.name} - {el.away && el.away.name}</strong>
                                                </NavLink>
                                            )
                                        }
                                    </div>
                                </div>
                            )
                        }
                    </div>
            }
        </Container>
    );
}

export default Live;
