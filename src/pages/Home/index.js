import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import i18n from 'i18next'

import {gameType} from "constant/config";

import {setSettings} from "store/actions/settingsAction";

import FOOTBALL_LEAGUE from "games/FOOTBALL_LEAGUE";
import COLOR_COLOR from "games/COLOR_COLOR";
import ROULETTE from "games/ROULETTE";
import KENO from "games/KENO";
import DOGS_6 from "games/DOGS_6";
import Loader from "components/Loader";
import Nav from "components/Nav";
import Betslip from "modules/Betslip";
import Notification from "modules/Notification";
import JackPot from "modules/JackPot";

import style from './index.module.scss';

const setGame = (id) => {
    switch (id) {
        case gameType.FOOTBALL_LEAGUE:
            return <FOOTBALL_LEAGUE />
        case gameType.ROULETTE:
            return <ROULETTE />
        case gameType.COLOR_COLOR:
            return <COLOR_COLOR />
        case gameType.KENO:
            return <KENO />
        case gameType.DOGS_6:
            return <DOGS_6 />
        default:
            return <FOOTBALL_LEAGUE />
    }
}

const Home = () => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const {notification} = useSelector((state) => state.notification)
    const {game} = useSelector((state) => state.game)

    useEffect(() => {
        dispatch(setSettings()).then((json) => {
            if (json.hasOwnProperty('data')) {
                sessionStorage.clear()
            }
            else {
                i18n.changeLanguage(json.account.language || 'en');
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
                        {
                            game &&
                            <div className={style.decor}>
                                <img
                                    src={`/img/decor/${game.type}.jpeg`}
                                    alt="Decor"
                                />
                            </div>
                        }
                        <Nav />
                        <div className={style.content}>
                            <div className={style.column}>
                                <div className={style.banners}>
                                    <JackPot />
                                </div>

                                <div className={style.table}>
                                    {
                                        game &&
                                        setGame(game.type)
                                    }
                                </div>
                            </div>
                            <div className={style.column}>
                                <Betslip />
                            </div>
                        </div>
                        {
                            notification &&
                            <Notification
                                text={notification}
                            />
                        }
                    </>
            }
        </div>
    );
}

export default Home;
