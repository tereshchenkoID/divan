import {useEffect, useState} from "react";

import classNames from "classnames";

import style from './index.module.scss';

const WINNER = (score, data) => {
    if (score.home > score.away) {
        return data.find(el => {
            return el.a === "HOME"
        })
    }
    else if(score.home < score.away) {
        return data.find(el => {
            return el.a === "AWAY"
        })
    }
    else {
        return data.find(el => {
            return el.a === "DRAW"
        })
    }
}

const GOAL_NO_GOAL = (score, data) => {
    let a

    if (score.home > 0 && score.away > 0) {
        a = data.find(el => {
            return el.a === "GOAL"
        })

        a.active = true
    }
    else {
        a = data.find(el => {
            return el.a === "NO_GOAL"
        })
    }

    return a
}

const GOALS = (score, data) => {
    const r = score.home + score.away
    const f = data.find(el => {
        return parseInt(el.a, 10) === r
    })

    if (f) {
        return f
    }
    else {
        return data[0]
    }
}

const SCORE = (score, data) => {
    const r = `${score.home}-${score.away}`
    const f = data.find(el => {
        return el.a === r
    })

    if (f) {
        return f
    }
    else {
        return data.find(el => {
            return el.a === '0-0'
        })
    }
}

const OVER_UNDER = (score, data) => {
    const r = score.home + score.away
    let a

    if (r <= 2) {
        a = data.find(el => {
            return el.a === "UNDER_2.5"
        })
    }
    else {
        a = data.find(el => {
            return el.a === "OVER_2.5"
        })

        a.active = true
    }

    return a
}

const DOUBLE_CHANCE = (score, data) => {
    let r = []

    data.map(el => {
        if (score.home === score.away) {
            if (el.c === '1X' ||el.c ==='X2') {
                r.push(el)
            }
        }
        else if (score.home > score.away) {
            if (el.c === '1X' ||el.c ==='12') {
                r.push(el)
            }
        }
        else if (score.home < score.away) {
            if (el.c === '12' ||el.c ==='X2') {
                r.push(el)
            }
        }
    })

    return r
}

const getOdds = (type, data, score) => {
    let a
    switch (type) {
        case "WINNER":
            a = WINNER(score, data)
        break;
        case "DOUBLE_CHANCE":
            a = DOUBLE_CHANCE(score, data)
        break;
        case "GOAL_NO_GOAL":
            a = GOAL_NO_GOAL(score, data)
        break;
        case "OVER_UNDER":
            a = OVER_UNDER(score, data)
        break;
        case "GOALS":
            a = GOALS(score, data)
        break;
        case "SCORE":
            a = SCORE(score, data)
        break;
        default:
        return 0;
    }

    return a
}

const goalsMarket = (data) => {
    const r = {
        headers: [],
        outcomes: []
    }

    data.markets.map((el_m, idx_m) => {
        if (idx_m === 0) {
            r.name = el_m.name
            r.printname = el_m.printname
        }
        r.headers.push(el_m.headers[0])

        el_m.outcomes.map(el_o => {
            r.outcomes.push(el_o)
        })
    })

    return r
}

const Item = ({data, timer, types}) => {
    const [active, setActive] = useState(false)
    const [score, setScore] = useState([0, 0])
    const [odds, setOdds] = useState([])
    const [markets, setMarkets] = useState([])

    const filterOdds = (score, a) => {
        const s = []
        const e = a || markets
        e.map(el_m => {
            s.push(
                getOdds(
                    el_m.name,
                    el_m.outcomes,
                    score
                )
            )
        })
        setOdds(s)
    }

    const filterMarket = () => {
        const a = []

        a.push(
            ...data.odds[0].groups[0].markets,
            ...data.odds[0].groups[6].markets,
            goalsMarket(data.odds[0].groups[7])
        )

        setMarkets(a)

        filterOdds(
            {
                home: 0,
                away: 0
            },
            a
        )
    }

    const filterScene = (data, timer, init) => {

        if (init === 0) {
            filterOdds(data, markets)

            setScore([data.home, data.away])
        }
        else {
            let a = data.filter(el => el.update !== null)

            a.map(el => {
                if (el.update === parseInt(timer, 10)) {
                    filterOdds(el, markets)

                    setScore([el.home, el.away])
                    setActive(true)

                    setTimeout(() => {
                        setActive(false)
                    }, 1000)
                }

                return el
            })
        }
    }

    useEffect(() => {

        const p = Math.ceil(timer / 15)
        filterScene(data.scenes[p], timer, 0)
        filterMarket()

        console.log(timer, data.scenes[p])

    }, []);

    useEffect(() => {
        filterScene(data.scenes, timer, 1)
    }, [timer]);

    return (
        <div className={
                classNames(
                    style.block,
                    active && style.active
                )
            }
        >
            <div className={style.cell}>{data.pos}</div>
            <div className={style.cell}>
                <div
                    className={style.meta}
                >
                    <div>
                        <div className={style.logo}>
                            <img
                                src={`https://view.divan.bet/engine/shop/resource/${data.teams.home.img}`}
                                alt={data.teams.home.name}
                            />
                        </div>
                    </div>
                    <div>{data.teams.home.name}</div>
                    <div className={style.score}>
                        <div>{score[0]}</div>
                        <div>-</div>
                        <div>{score[1]}</div>
                    </div>
                    <div>{data.teams.away.name}</div>
                    <div>
                        <div className={style.logo}>
                            <img
                                src={`https://view.divan.bet/engine/shop/resource/${data.teams.away.img}`}
                                alt={data.teams.away.name}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.cell}>
                <div className={style.odds}>
                {
                    odds.length &&
                    odds.map((el, idx) =>
                        <div
                            key={idx}
                            className={style.odd}
                        >
                            {
                                el.a
                                    ?
                                        <div className={
                                            classNames(
                                                    style.odd,
                                                    el.active && style.active
                                                )
                                            }
                                        >
                                            <div className={style.label}>{el.c || el.a}</div>
                                            <div className={style.value}>{el.b || 1}</div>
                                        </div>
                                    :
                                        <div className={style.odds}>
                                        {
                                                el.map((el_d, idx_d) =>
                                                    <div
                                                        key={idx_d}
                                                        className={
                                                            classNames(
                                                                style.odd,
                                                                el.active && style.active
                                                            )
                                                        }
                                                    >
                                                        <div className={style.label}>{el_d.c || el_d.a}</div>
                                                        <div className={style.value}>{el_d.b || 1}</div>
                                                    </div>
                                                )
                                            }
                                        </div>
                            }

                        </div>
                    )
                }
                </div>
            </div>
        </div>
    );
}

export default Item;
