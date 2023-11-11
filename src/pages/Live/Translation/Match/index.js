import {useEffect, useState} from "react";

import style from './index.module.scss'

const Match = ({index, data, timer}) => {
    const [score, setScore] = useState([0, 0])
    
    const initScene = (scenes, timer = 80) => {
        const TIME = 90
        const DELAY = Math.ceil(TIME / scenes.length)
        const i = timer > DELAY ? Math.ceil(Number(timer) / DELAY) - 1 : 0
        const f = scenes[i]
        setScore([f.home, f.away])
    }
    
    useEffect(() => {
        (data && data.scenes && timer !== 0) && initScene(data.scenes, timer)
    },[timer])
    
    return (
        <div className={style.block}>
            <div className={style.cell}>{index + 1}.</div>
            <div className={style.cell}>
                <div className={style.logo}>
                    <img
                        src={`https://view.divan.bet/engine/shop/resource/${data.teams.home.img}`}
                        alt={data.teams.home.name}
                        loading={"lazy"}
                    />
                </div>
            </div>
            <div className={style.cell}>{data.teams.home.name}</div>
            <div className={style.cell}>{score[0]}</div>
            <div className={style.cell}>-</div>
            <div className={style.cell}>{score[1]}</div>
            <div className={style.cell}>{data.teams.away.name}</div>
            <div className={style.cell}>
                <div className={style.logo}>
                    <img
                        src={`https://view.divan.bet/engine/shop/resource/${data.teams.away.img}`}
                        alt={data.teams.away.name}
                        loading={"lazy"}
                    />
                </div>
            </div>
        </div>
    );
}

export default Match;
