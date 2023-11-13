import {gameType} from "constant/config";
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import i18n from 'i18next'

import {setSettings} from "store/actions/settingsAction";
import {setGame} from "store/actions/gameAction";

import Loader from "components/Loader";
import JackPot from "modules/JackPot";
import Decor from "modules/Decor";

import FOOTBALL_LEAGUE from "./FOOTBALL_LEAGUE";

import JackPotWinner from "./JackPot";
import Translation from "./Translation";
import History from "./History";
import Ticker from "./Ticker";
import Games from "./Games";
import Countdown from "./Modal/Countdown";
import Jackpot from "./Modal/Jackpot";

import style from './index.module.scss';

const getGame = (id) => {
    switch (id) {
        case gameType.FOOTBALL_LEAGUE:
            return <FOOTBALL_LEAGUE />
        default:
            return <div>{id}</div>
    }
}

const Live = () => {
    const dispatch = useDispatch()
    const {game} = useSelector((state) => state.game)
    const {progress} = useSelector((state) => state.progress)
    const {modal} = useSelector((state) => state.modal)
    const {liveTimer} = useSelector((state) => state.liveTimer)
    const {settings} = useSelector((state) => state.settings)
    const [loading, setLoading] = useState(true)
    const [active, setActive] = useState(false)
    
    useEffect(() => {
        dispatch(setSettings()).then((json) => {
            if (json.hasOwnProperty('data')) {
                sessionStorage.clear()
            }
            else {
                i18n.changeLanguage(json.account.language || 'en')
                dispatch(setGame(game || JSON.parse(localStorage.getItem('game'))))
                setLoading(false)
            }
        })
    }, []);

    return (
        <div className={style.block}>
            {
                loading
                 ?
                    <Loader />
                 :
                    <>
                        <Decor type={game.type} />
                        <div
                            className={style.wrapper}
                            onClick={() => {
                                setActive(true)
                            }}
                        >
                            <div className={style.ticker}>
                                <div className={style.winner}>
                                    <JackPotWinner />
                                </div>
                                <Ticker />
                            </div>
                            <div className={style.content}>
                                <div className={style.column}>
                                    <div className={style.banners}>
                                        <JackPot size={'lg'}/>
                                    </div>
                                    
                                    <div className={style.table}>
                                        {
                                            getGame(game.type)
                                        }
                                        {
                                            modal === 1 && <Countdown />
                                        }
                                        
                                        {/*<Jackpot />*/}
                                    </div>
                                </div>
                                <div className={style.column}>
                                    <History />
                                </div>
                            </div>
                            {
                                (settings.account.mode === "1" && progress === 2 && liveTimer !== 0) && <Translation />
                            }
                        </div>
                        {
                            active && <Games action={setActive}/>
                        }
                    </>
            }
        </div>
    );
}

export default Live;
