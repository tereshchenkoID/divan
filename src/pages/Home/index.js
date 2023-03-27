import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {gameType} from "constant/config";

import {setSettings} from "store/actions/settingsAction";

import FOOTBALL_LEAGUE from "games/FOOTBALL_LEAGUE";
import ROULETTE from "games/ROULETTE";

import Loader from "components/Loader";
import Nav from "components/Nav";

import Betslip from "modules/Betslip";
import Notification from "modules/Notification";

import style from './index.module.scss';

const setGame = (id) => {

    switch (id) {
        case gameType.FOOTBALL_LEAGUE:
            return <FOOTBALL_LEAGUE />
        case gameType.ROULETTE:
            return <ROULETTE />
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
                        <Nav />
                        <div className={style.content}>
                            <div className={style.column}>
                                {
                                    game &&
                                    setGame(game.type)
                                }
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
