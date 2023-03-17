import {useState} from "react";
import {useDispatch} from "react-redux";

import {hostnames} from "constant/config"

import {postData} from "helpers/api";

import {setAuth} from "store/actions/authAction";

import Button from "components/Button";

import style from './index.module.scss';

const Login = () => {
    //cashier131
    //qwe123
    const dispatch = useDispatch()
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)

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
                    setError(true)
                }
            })
    };

    return (
        <div className={style.block}>
            <form
                className={style.wrapper}
                onSubmit={handleSubmit}
            >
                <p className={style.title}>AUTHENTICATION</p>
                <input
                    type={"text"}
                    className={style.field}
                    placeholder={'Username'}
                    onChange={(e) => {
                        setLogin(e.target.value || '')
                        setError(false)
                    }}
                    defaultValue={login}
                    autoComplete={'true'}
                    autoSave={'true'}
                />
                <input
                    type={"password"}
                    className={style.field}
                    placeholder={'Password'}
                    onChange={(e) => {
                        setPassword(e.target.value || '')
                        setError(false)
                    }}
                    defaultValue={password}
                    autoComplete={'true'}
                    autoSave={'true'}
                />
                {
                    error &&
                    <p className={style.error}>Invalid password or Login</p>
                }
                <div className={style.button}>
                    <Button
                        type={'green'}
                        size={'md'}
                        text={'Login'}
                    />
                </div>
            </form>
        </div>
    );
}

export default Login;
