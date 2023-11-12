import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";

import i18n from 'i18next'

import useSocket from 'hooks/useSocket';

import {checkCmd} from "helpers/checkCmd";
import {getIcon} from "helpers/getIcon";

import {setSettings} from "store/actions/settingsAction";

import Loader from "components/Loader";
import Icon from "components/Icon";

import style from './index.module.scss';
import {setGame} from "store/actions/gameAction";

const Viewer = () => {
    const { sendMessage } = useSocket()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const {isConnected, receivedMessage} = useSelector((state) => state.socket)
    const {settings} = useSelector((state) => state.settings)
    
    useEffect(() => {
        if (isConnected) {
            sendMessage({cmd:`account/${sessionStorage.getItem('authToken')}/settings`})
        }
        else {
            dispatch(setSettings()).then((json) => {
                if (json.hasOwnProperty('data')) {
                    sessionStorage.clear()
                }
                else {
                    i18n.changeLanguage(json.account.language || 'en');
                    setLoading(false)
                }
            })
        }
    }, [isConnected]);

    useEffect(() => {
        if (receivedMessage !== '' && checkCmd('settings', receivedMessage.cmd)) {
            if (receivedMessage.hasOwnProperty('code')) {
                sessionStorage.clear()
                navigate(0)
            }
            else {
                dispatch(setSettings(receivedMessage))
                i18n.changeLanguage(receivedMessage.account.language || 'en');
                setLoading(false)
            }
        }
    }, [receivedMessage])

    return (
        <div className={style.block}>
            {
                loading
                 ?
                    <Loader />
                 :
                    <div className={style.content}>
                        {
                            settings.games.map((el, idx) =>
                                <div key={idx}>
                                    <Link
                                        to={`/live?authToken=${sessionStorage.getItem('authToken')}`}
                                        className={style.button}
                                        aria-label={el.name}
                                        target={'_blank'}
                                        onClick={() => {
                                            dispatch(setGame(el))
                                            localStorage.setItem('game', JSON.stringify(el))
                                        }}
                                    >
                                        <div className={style.icon}>
                                            <Icon id={getIcon(el.type)} />
                                        </div>
                                        <div className={style.text}>
                                            {el.name}
                                        </div>
                                    </Link>
                                </div>
                            )
                        }
                    </div>
            }
        </div>
    );
}

export default Viewer;
