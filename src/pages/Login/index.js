import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {hostnames} from "constant/config"

import {postData} from "helpers/api";

import {setNotification} from "store/actions/notificationAction";
import {setAuth} from "store/actions/authAction";

import Button from "components/Button";
import Notification from "modules/Notification";

import style from './index.module.scss';

const Login = () => {
    //cashier131
    //qwe123
    const dispatch = useDispatch()
    const {notification} = useSelector((state) => state.notification)
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [type, setType] = useState('password')

    const handleSubmit = async (event) => {
        event.preventDefault();

        postData(
            `${hostnames.PROD}/account/login`,
                JSON.stringify({
                    login,
                    password
                })
            )
            .then((json) => {
                if (json) {
                    sessionStorage.setItem("authToken", json.authToken)
                    dispatch(setAuth(json.authToken))
                }
                else {
                    dispatch(setNotification('Invalid password or login'))
                }
            })
    };

    return (
        <div className={style.block}>
            {
                notification &&
                <Notification
                    text={notification}
                />
            }
            <form
                className={style.wrapper}
                onSubmit={handleSubmit}
            >
                <div className={style.row}>
                    <p className={style.title}>AUTHENTICATION</p>
                </div>
                <div className={style.row}>
                    <input
                        type={"text"}
                        className={style.field}
                        placeholder={'Username'}
                        onChange={(e) => {
                            setLogin(e.target.value || '')
                        }}
                        defaultValue={login}
                        autoComplete={'true'}
                        autoSave={'true'}
                    />
                </div>
                <div className={style.row}>
                    <input
                        type={type}
                        className={style.field}
                        placeholder={'Password'}
                        onChange={(e) => {
                            setPassword(e.target.value || '')
                        }}
                        defaultValue={password}
                        autoComplete={'true'}
                        autoSave={'true'}
                    />
                </div>
                <div className={style.row}>
                    <button
                        className={style.toggle}
                        onClick={() => {
                            setType(type === 'password' ? 'text' : 'password')
                        }}
                        type={'button'}
                    >
                        {type === 'password' ? 'Show' : 'Hide'} password
                    </button>
                </div>
                <div className={style.row}>
                    <div className={style.button}>
                        <Button
                            type={'green'}
                            size={'md'}
                            text={'Login'}
                            props={'submit'}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Login;
