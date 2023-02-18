import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";

import {setUrl} from "store/actions/urlAction";
// import {setBreadcrumbs} from "store/actions/breadcrumbsAction";

import Container from "components/Container";

import Squad from "./Squad";
import Lineup from "./Lineup";
import History from "./History";

import style from './index.module.scss';

const Team = () => {
    let url = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        delete url.team;
        dispatch(setUrl(url))
    }, []);

    return (
        <Container>
            <div className={style.wrapper}>
                <Squad />
            </div>
            <div className={style.wrapper}>
                <Lineup />
            </div>
            <div className={style.wrapper}>
                <History />
            </div>
        </Container>
    );
}

export default Team;
