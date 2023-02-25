import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import classNames from "classnames";

import {setLive} from "store/actions/liveAction";
import {setData} from "store/actions/dataAction";

import Loader from "components/Loader";
import Icon from "components/Icon";

import Odd from "../Odd";
import Subtitle from "../Subtitle";
import Timer from "../Timer";

import style from './index.module.scss';

const Table = () => {
    const dispatch = useDispatch()
    const {game} = useSelector((state) => state.game)
    const {data} = useSelector((state) => state.data)
    const {live} = useSelector((state) => state.live)

    const [loading, setLoading] = useState(true)
    const [active, setActive] = useState(0)
    const [week, setWeek] = useState(0)
    const [group, setGroup] = useState(0)

    const [toggle, setToggle] = useState({
        id: null,
        toggle: false
    })

    useEffect(() => {
        if (game !== null) {

            if (live === 0) {
                dispatch(setData(game)).then((json) => {
                    setWeek(json.events[0].league.week)
                    setActive(0)
                    setLoading(false)
                })
            }
        }

        // if (live === 1) {
        //     const a = active + 1
        //     const w = data.events[a].league.week
        //
        //     setActive(a)
        //     setWeek(w)
        //
        //     console.log(week, active)
        // }

    }, [game, live]);

    const handleToggle = (id) => {
        setToggle({
            id: id,
            toggle: id === toggle.id ? !toggle.toggle : true
        })
    }

    const filterColumn = (data) => {
        const result = [{
            data: []
        }]
        let count = 0

        // eslint-disable-next-line array-callback-return
        data.map((el, idx) => {
            const a = el.a.split('-')
            const sum = parseInt(a[0], 10) + parseInt(a[1], 10)

            // const sum = parseInt(a.join('+'), 10)

            if (sum >= count) {
                result[result.length - 1].data.push(el)
                count = sum
            }
            else {
                result.push({
                    data: [
                        el
                    ]
                })
                count = 0
            }
        })

        return result
    }

    return (
        <div className={style.block}>
            {
                loading
                    ?
                        <Loader />
                    :
                        <>
                            <div className={style.tab}>
                                {
                                    data.events.map((el, idx) =>
                                        <button
                                            key={idx}
                                            className={
                                                classNames(
                                                    style.link,
                                                    week === el.league.week && style.active
                                                )
                                            }
                                            onClick={() => {
                                                dispatch(setLive(0))
                                                setWeek(el.league.week)
                                                setActive(idx)
                                            }}
                                        >
                                            Week {el.league.week}
                                        </button>
                                    )
                                }
                                <div style={{color: '#fff'}}>{live}</div>
                                <div style={{color: '#fff'}}>{active}</div>
                            </div>
                            <div className={style.info}>
                                <div className={style.league}>
                                   <img
                                       src={`https://view.divan.bet/engine/shop/resource/${data.events[active].league.img}`}
                                       alt={data.events[active].league.name}
                                   />
                                </div>
                                <Timer data={data.events[active]}/>
                            </div>
                            <div className={style.body}>
                                {
                                    data.events.map((el_e, idx_e) =>
                                        <div
                                            key={idx_e}
                                            className={
                                                classNames(
                                                    style.table,
                                                    week === el_e.league.week && style.active
                                                )
                                            }
                                        >
                                            <div className={style.sort}>
                                                {
                                                    el_e.league.matches[0].odds[0].groups.map((el, idx) =>
                                                        (
                                                            el.name !== 'Score' &&
                                                            el.name !== 'Total Goals'
                                                        ) &&
                                                        <button
                                                            key={idx}
                                                            className={
                                                                classNames(
                                                                    style.market,
                                                                    group === idx && style.active
                                                                )
                                                            }
                                                            onClick={() => {
                                                                setGroup(idx)
                                                                setToggle({
                                                                    id: null,
                                                                    toggle: false
                                                                })
                                                            }}
                                                        >
                                                            {el.name}
                                                        </button>
                                                    )
                                                }
                                            </div>
                                            <div
                                                className={
                                                    classNames(
                                                        style.head,
                                                        style.row
                                                    )
                                                }
                                            >
                                                <div className={style.cell} />
                                                <div className={style.cell} />
                                                <div className={style.cell}>
                                                    <div
                                                        className={
                                                            classNames(
                                                                style.odds,
                                                                (toggle.id !== null && toggle.toggle) && style.hide
                                                            )
                                                        }
                                                    >
                                                        {
                                                            Object.values(el_e.league.matches[0].odds[0].groups[group].markets).map((el, idx) =>
                                                                <div
                                                                    key={idx}
                                                                    className={style.column}
                                                                >
                                                                    {
                                                                        el.name &&
                                                                        <div className={style.legend}>
                                                                            <Subtitle
                                                                                data={el.name.replaceAll('_', ' ')}
                                                                                size={'sm'}
                                                                            />
                                                                        </div>
                                                                    }
                                                                    {
                                                                        el.headers.map((el, idx) =>
                                                                            <div
                                                                                key={idx}
                                                                                className={style.label}
                                                                            >
                                                                                {el}
                                                                            </div>
                                                                        )
                                                                    }
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={style.wrapper}>
                                                {
                                                    el_e.league.matches.map((el_m, idx_m) =>
                                                        <div
                                                            key={idx_m}
                                                            className={style.row}
                                                        >
                                                            <div className={style.cell}>
                                                                {el_m.pos}
                                                            </div>
                                                            <div className={style.cell}>
                                                                <div
                                                                    className={
                                                                        classNames(
                                                                            style.meta,
                                                                            style.sm,
                                                                            toggle.toggle && style.disabled,
                                                                            (toggle.id === idx_m && toggle.toggle ) && style.active
                                                                        )
                                                                    }
                                                                    onClick={() => {
                                                                        handleToggle(idx_m)
                                                                    }}
                                                                >
                                                                    <div>
                                                                        <div className={style.logo}>
                                                                            <img
                                                                                src={`https://view.divan.bet/engine/shop/resource/${el_m.teams.home.img}`}
                                                                                alt={el_m.teams.home.name}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div>{el_m.teams.home.name}</div>
                                                                    <div>vs</div>
                                                                    <div>{el_m.teams.away.name}</div>
                                                                    <div>
                                                                        <div className={style.logo}>
                                                                            <img
                                                                                src={`https://view.divan.bet/engine/shop/resource/${el_m.teams.away.img}`}
                                                                                alt={el_m.teams.away.name}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <button
                                                                            className={style.toggle}
                                                                            aria-label={"Toggle"}
                                                                        >
                                                                            <Icon id={'arrow-right'} />
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className={style.cell}>
                                                                <div className={style.odds}>
                                                                    {
                                                                        Object.values(el_m.odds[0].groups[group].markets).map((el_o, idx_o)  =>
                                                                            <div
                                                                                key={idx_o}
                                                                                className={style.column}
                                                                            >
                                                                                {
                                                                                    el_o.outcomes.map((el, idx) =>
                                                                                        <div
                                                                                            key={idx}
                                                                                            className={style.odd}
                                                                                        >
                                                                                            <Odd
                                                                                                data={{
                                                                                                    ...el,
                                                                                                    ...el_m.teams,
                                                                                                    pos: el_m.pos,
                                                                                                    market: el_o.printname,
                                                                                                    c: el.c
                                                                                                }}
                                                                                            />
                                                                                        </div>
                                                                                    )
                                                                                }
                                                                            </div>
                                                                        )
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                                {
                                                    (toggle.id !== null && toggle.toggle) &&
                                                        <div className={
                                                            classNames(
                                                                style.dropdown,
                                                                toggle.toggle && style.active
                                                            )
                                                        }
                                                        >
                                                            {/*<div className={*/}
                                                            {/*        classNames(*/}
                                                            {/*            style.meta,*/}
                                                            {/*            style.lg*/}
                                                            {/*        )*/}
                                                            {/*    }*/}
                                                            {/*>*/}
                                                            {/*    <div className={style.logo}>*/}
                                                            {/*        <img*/}
                                                            {/*            src={`https://view.divan.bet/engine/shop/resource/${el_e.league.matches[toggle.id].teams.home.img}`}*/}
                                                            {/*            alt={el_e.league.matches[toggle.id].teams.home.name}*/}
                                                            {/*        />*/}
                                                            {/*    </div>*/}
                                                            {/*    <div>{el_e.league.matches[toggle.id].teams.home.name}</div>*/}
                                                            {/*    <div>vs</div>*/}
                                                            {/*    <div>{el_e.league.matches[toggle.id].teams.away.name}</div>*/}
                                                            {/*    <div className={style.logo}>*/}
                                                            {/*        <img*/}
                                                            {/*            src={`https://view.divan.bet/engine/shop/resource/${el_e.league.matches[toggle.id].teams.away.img}`}*/}
                                                            {/*            alt={el_e.league.matches[toggle.id].teams.away.name}*/}
                                                            {/*        />*/}
                                                            {/*    </div>*/}
                                                            {/*</div>*/}

                                                            <div>
                                                                <Subtitle
                                                                    data={el_e.league.matches[toggle.id].odds[0].groups[6].name}
                                                                    size={'md'}
                                                                />
                                                            </div>
                                                            <div className={style.goals}>
                                                                {
                                                                    el_e.league.matches[toggle.id].odds[0].groups[6].markets[0].outcomes.map((el, idx) =>
                                                                        <div
                                                                            key={idx}
                                                                            className={style.outcome}
                                                                        >
                                                                            <div className={style.button}>
                                                                                <Odd
                                                                                    data={{
                                                                                        ...el,
                                                                                        ...el_e.league.matches[toggle.id].teams,
                                                                                        pos: el_e.league.matches[toggle.id].pos,
                                                                                        market: el_e.league.matches[toggle.id].odds[0].groups[6].markets[0].printname,
                                                                                        c: el.a
                                                                                    }}
                                                                                    label={el.a}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                }
                                                            </div>
                                                            <div className={style.goals}>
                                                                {
                                                                    el_e.league.matches[toggle.id].odds[0].groups[7].markets.map((el, idx) =>
                                                                        <div
                                                                            key={idx}
                                                                            className={style.outcomes}
                                                                        >
                                                                            <Subtitle
                                                                                data={el.headers[0]}
                                                                                size={'md'}
                                                                            />
                                                                            <div className={style.list}>
                                                                                {
                                                                                    filterColumn(el.outcomes).map((el, idx) =>
                                                                                        <div
                                                                                            key={idx}
                                                                                            className={style.outcomes}
                                                                                        >
                                                                                            {
                                                                                                el.data.map((el, idx) =>
                                                                                                    <div
                                                                                                        key={idx}
                                                                                                        className={style.outcome}
                                                                                                    >
                                                                                                        <div className={style.button}>
                                                                                                            <Odd
                                                                                                                data={{
                                                                                                                    ...el,
                                                                                                                    ...el_e.league.matches[toggle.id].teams,
                                                                                                                    pos: el_e.league.matches[toggle.id].pos,
                                                                                                                    market: el_e.league.matches[toggle.id].odds[0].groups[7].markets[0].printname,
                                                                                                                    c: el.a
                                                                                                                }}
                                                                                                                label={el.a}
                                                                                                            />
                                                                                                        </div>
                                                                                                    </div>
                                                                                                )
                                                                                            }
                                                                                        </div>
                                                                                    )
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                }
                                                            </div>
                                                        </div>
                                                }
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </>
            }
        </div>
    );
}

export default Table;
