import {useState} from "react";
import {useDispatch} from "react-redux";

import axios from "axios";

import {setAuth} from "store/actions/authAction";

import style from './index.module.scss';

const Login = () => {
    //cashier131
    //qwe123
    const dispatch = useDispatch()
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     const url = 'https://view.divan.bet/client/api/account/login';
    //     const payload = {
    //         login: login,
    //         password: password
    //     };
    //     // const headers = {
    //     //     'Content-Type': 'application/json'
    //     // };
    //
    //     try {
    //         const response = await axios.post(url, payload, { });
    //         action(true)
    //         console.log(response.data);
    //     } catch (error) {
    //         setError(true)
    //         console.error(error);
    //     }
    // };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = 'https://api.qool90.bet/account/login';

        try {
            const loginResponse = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    login,
                    password
                })
            });

            const response = await loginResponse.json()
            sessionStorage.setItem("authToken", response.authToken);
            dispatch(setAuth(response.authToken))
        }
        catch (error) {
            setError(true)
        }
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
                <button
                    type={"submit"}
                    className={style.button}
                >
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;
