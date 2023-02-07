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
    const dispatch = useDispatch()
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchData(`stats_season_tables/${url.league}`).then((data) => {
            setData(data)
            setLoading(false)
            dispatch(setUrl(url))

            console.log(data.doc[0].data.tables)
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
                                {
                                    data.doc[0].data.tables.map((el, idx) =>
                                        <div
                                            key={idx}
                                            className={style.wrapper}
                                        >
                                            <div className={style.title}>{el.seasontypename}, {el.name}</div>
                                            <div className={style.table}>
                                                <div className={style.row}>
                                                    <div className={style.cell}>Поз.</div>
                                                    <div className={style.cell}>
                                                        <span>Команда</span>
                                                    </div>
                                                    <div className={style.cell}>І</div>
                                                    <div className={style.cell}>П</div>
                                                    <div className={style.cell}>Н</div>
                                                    <div className={style.cell}>П</div>
                                                    <div className={style.cell}>Забиті голи</div>
                                                    <div className={style.cell}>Голи пропущені</div>
                                                    <div className={style.cell}>Різн.</div>
                                                    <div className={style.cell}>Очки.</div>
                                                </div>
                                                {
                                                    el.tablerows.map((el, idx) =>
                                                        <div
                                                            key={idx}
                                                            className={style.row}
                                                        >
                                                            <div className={style.cell}>{el.pos}</div>
                                                            <div className={style.cell}>
                                                                {
                                                                    el.team.cc &&
                                                                        <span className={style.country}>
                                                                            <img src={`https://img.sportradar.com/ls/crest/big/${el.team.cc.a2}.png`} alt={el.team.na} />
                                                                        </span>
                                                                }
                                                                <span>{el.team.name}</span>
                                                            </div>
                                                            <div className={style.cell}>{el.total}</div>
                                                            <div className={style.cell}>{el.winTotal}</div>
                                                            <div className={style.cell}>{el.drawTotal}</div>
                                                            <div className={style.cell}>{el.lossTotal}</div>
                                                            <div className={style.cell}>{el.goalsForTotal}</div>
                                                            <div className={style.cell}>{el.goalsAgainstTotal}</div>
                                                            <div className={style.cell}>{el.goalDiffTotal}</div>
                                                            <div className={style.cell}>{el.pointsTotal}</div>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    )
                                }
                            </>
                }
            </div>
        </Container>
    );
}

export default Overview;
