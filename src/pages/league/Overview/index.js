import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";

import {setUrl} from "store/actions/urlAction";

import Container from "components/Container";
import PlayerStatistics from "./PlayerStatistics";
import TeamStatistics from "./TeamStatistics";

import style from './index.module.scss';

const Overview = () => {
    let url = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setUrl(url))
    }, []);

    return (
        <Container>
            <div className={style.block}>
                <>
                    <div className={style.table}>
                        <TeamStatistics />
                    </div>
                    <div className={style.table}>
                        <PlayerStatistics />
                    </div>
                </>
            </div>
        </Container>
    );
}

export default Overview;
