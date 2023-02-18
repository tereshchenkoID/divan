import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";

// import {fetchData} from "helpers/api";

import {setUrl} from "store/actions/urlAction";
// import {setBreadcrumbs} from "store/actions/breadcrumbsAction";

import Container from "components/Container";
// import Loader from "components/Loader";
// import Tab from "./Tab";
// import Table from "./Table";

import League from "./League";
import LeagueSummary from "./LeagueSummary";
import NextMatches from "./NextMatches";
import LastMatches from "./LastMatches";
import PlayerStatistics from "./PlayerStatistics";
import TeamStatistics from "./TeamStatistics";

import style from './index.module.scss';

const Overview = () => {
    let url = useParams()
    const dispatch = useDispatch()
    // const [teams, setTeam] = useState({})
    // const [players, setPlayers] = useState({})
    // const [loading, setLoading] = useState(true)

    useEffect(() => {
        dispatch(setUrl(url))

        // Promise.all([
        //     fetchData(`http://localhost:3000/json/tables-team.json`),
        //     fetchData(`http://localhost:3000/json/tables-player.json`)
        // ])
        //     .then(([resTeams, resPlayers]) =>
        //         Promise.all([resTeams, resPlayers])
        //     )
        //     .then(([dataTeams, dataPLayers]) => {
        //         dispatch(setUrl(url))
        //
        //         setTeam(dataTeams)
        //         setPlayers(dataPLayers)
        //
        //         setLoading(false)
        //
        //         dispatch(setBreadcrumbs({
        //             0: {
        //                 id: parseInt(dataTeams.doc[0].data[0]._id, 10),
        //                 name: dataTeams.doc[0].data[0].name
        //             },
        //             1: {
        //                 id: parseInt(dataTeams.doc[0].data[0].realcategory._id, 10),
        //                 name: dataTeams.doc[0].data[0].realcategory.name
        //             },
        //             2: {
        //                 id: parseInt(dataTeams.doc[0].data[0].season._id, 10),
        //                 name: dataTeams.doc[0].data[0].season.name
        //             }
        //         }))
        //     });


        // fetchData(`http://localhost:3000/json/tables-team.json`).then((data) => {
        //     dispatch(setUrl(url))
        //     setTeam(data)
        //     dispatch(setBreadcrumbs({
        //         0: {
        //             id: parseInt(data.doc[0].data[0]._id, 10),
        //             name: data.doc[0].data[0].name
        //         },
        //         1: {
        //             id: parseInt(data.doc[0].data[0].realcategory._id, 10),
        //             name: data.doc[0].data[0].realcategory.name
        //         },
        //         2: {
        //             id: parseInt(data.doc[0].data[0].season._id, 10),
        //             name: data.doc[0].data[0].season.name
        //         }
        //     }))
        // })
        //
        // fetchData(`http://localhost:3000/json/tables-player.json`).then((data) => {
        //     setPlayers(data)
        //     setLoading(false)
        //     console.log(data)
        // })
    }, []);

    return (
        <Container>
            {/*<div className={style.block}>*/}
            {/*    {*/}
            {/*        loading*/}
            {/*            ?*/}
            {/*            <Loader />*/}
            {/*            :*/}
            {/*            <>*/}
            {/*                {*/}
            {/*                    players.doc[0].data[0].season.tables.map((table, tableIdx) =>*/}
            {/*                        <div*/}
            {/*                            key={tableIdx}*/}
            {/*                            className={style.wrapper}*/}
            {/*                        >*/}
            {/*                            <div className={style.header}>{table.name}</div>*/}
            {/*                            <div className={style.body}>*/}
            {/*                                {*/}
            {/*                                    table.set.length > 1*/}
            {/*                                        ?*/}
            {/*                                        <Tab*/}
            {/*                                            headers={players.doc[0].data[0].season.header}*/}
            {/*                                            rows={players.doc[0].data[0].season.tablerows}*/}
            {/*                                            table={table}*/}
            {/*                                        />*/}
            {/*                                        :*/}
            {/*                                        <Table*/}
            {/*                                            headers={players.doc[0].data[0].season.header}*/}
            {/*                                            rows={players.doc[0].data[0].season.tablerows}*/}
            {/*                                            table={table}*/}
            {/*                                        />*/}
            {/*                                }*/}
            {/*                            </div>*/}
            {/*                            {*/}
            {/*                                table.rules &&*/}
            {/*                                <div className={style.footer}>*/}
            {/*                                    {*/}
            {/*                                        table.rules.name.split('\n').map((el, idx) =>*/}
            {/*                                            <div key={idx}>{el}</div>*/}
            {/*                                        )*/}
            {/*                                    }*/}
            {/*                                </div>*/}
            {/*                            }*/}
            {/*                        </div>*/}
            {/*                    )*/}
            {/*                }*/}
            {/*                {*/}
            {/*                    teams.doc[0].data[0].season.tables.map((table, tableIdx) =>*/}
            {/*                        <div*/}
            {/*                            key={tableIdx}*/}
            {/*                            className={style.wrapper}*/}
            {/*                        >*/}
            {/*                            <div className={style.header}>{table.name}</div>*/}
            {/*                            <div className={style.body}>*/}
            {/*                                {*/}
            {/*                                    table.set.length > 1*/}
            {/*                                    ?*/}
            {/*                                        <Tab*/}
            {/*                                            headers={teams.doc[0].data[0].season.header}*/}
            {/*                                            rows={teams.doc[0].data[0].season.tablerows}*/}
            {/*                                            table={table}*/}
            {/*                                        />*/}
            {/*                                    :*/}
            {/*                                        <Table*/}
            {/*                                            headers={teams.doc[0].data[0].season.header}*/}
            {/*                                            rows={teams.doc[0].data[0].season.tablerows}*/}
            {/*                                            table={table}*/}
            {/*                                        />*/}
            {/*                                }*/}
            {/*                            </div>*/}
            {/*                            {*/}
            {/*                                table.rules &&*/}
            {/*                                <div className={style.footer}>*/}
            {/*                                    {*/}
            {/*                                        table.rules.name.split('\n').map((el, idx) =>*/}
            {/*                                            <div key={idx}>{el}</div>*/}
            {/*                                        )*/}
            {/*                                    }*/}
            {/*                                </div>*/}
            {/*                            }*/}
            {/*                        </div>*/}
            {/*                    )*/}
            {/*                }*/}
            {/*            </>*/}
            {/*    }*/}
            {/*</div>*/}

            <div className={style.table}>
                <div className={style.cell}>
                    <League />
                </div>
            </div>
            <div className={style.table}>
                <div className={style.cell}>
                    <TeamStatistics />
                </div>
            </div>
            <div className={style.table}>
                <div className={style.cell}>
                    <LeagueSummary />
                </div>
            </div>
            <div className={style.table}>
                <div className={style.cell}>
                    <LastMatches />
                </div>
                <div className={style.cell}>
                    <NextMatches />
                </div>
            </div>
            <div className={style.table}>
                <div className={style.cell}>
                    <PlayerStatistics />
                </div>
            </div>
        </Container>
    );
}

export default Overview;
