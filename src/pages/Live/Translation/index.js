import {useState} from "react";
import {useSelector} from "react-redux";

import Scoreboard from "./Scoreboard";
import Timer from "./Timer";
import Match from "./Match";

import style from './index.module.scss';

const Translation = () => {
    const {tv} =  useSelector((state) => state.tv)
    const {progress} = useSelector((state) => state.progress)
    const {liveTimer} = useSelector((state) => state.liveTimer)
    const [video, setVideo] = useState()
    
    if (progress === 2 && !tv && !tv.event)
        return false
    
    return (
        <div className={style.block}>
            {
                video &&
                <video
                    className={style.video}
                    src={video}
                    muted
                    autoPlay
                />
            }
            <div>
                <div className={style.info}>
                    <Scoreboard
                        data={tv.event.league.matches[0]}
                        timer={liveTimer}
                        setVideo={setVideo}
                    />
                    <Timer timer={liveTimer} />
                </div>
            </div>
            <div>
                <div className={style.table}>
                    {
                        tv.event.league.matches.map((item, index) =>
                            <Match
                                key={index}
                                index={index}
                                data={item}
                                timer={liveTimer}
                            />
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default Translation;
