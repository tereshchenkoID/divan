import {useState, useEffect} from "react";
import {NavLink} from "react-router-dom";

import {fetchData} from "helpers/api";

import Loader from "components/Loader";
import Container from "components/Container";

import style from './index.module.scss';
import classNames from "classnames";

const Live = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchData(`https://matchtracker.live/mapping/`).then((data) => {
            setData(data)
            setLoading(false)

            console.log(data)
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
                                <NavLink
                                    to={`/1/${el.statsId}/overview`}
                                    className={classNames(style.item, !el.statsId && style.disabled)}
                                    aria-label={data.categoryName}
                                    key={idx}
                                >
                                    {el.participants.home} - {el.participants.away}
                                </NavLink>
                            )
                        }
                    </div>
            }
        </Container>
    );
}

export default Live;
