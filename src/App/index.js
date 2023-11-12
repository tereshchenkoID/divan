import {Suspense, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Routes, Route} from "react-router-dom";
import { useLocation } from 'react-router-dom';

import useSocket from "hooks/useSocket";

import {setAuth} from "store/actions/authAction";

import classNames from "classnames";

import {router} from "router";

import Login from "pages/Login";
import Loader from "components/Loader";

import style from './index.module.scss';

const App = () => {
    const dispatch = useDispatch()
    const {auth} = useSelector((state) => state.auth)
    const {isConnected} = useSelector((state) => state.socket)
    const location = useLocation()
    const { connectSocket } = useSocket()
    
    useEffect(() => {
        connectSocket()
    }, [])

    useEffect(() => {
        if (!isConnected) {
            const intervalId = setInterval(() => {
                console.log("%cSOCKET_RECONNECT", 'color: #157b15')
                connectSocket()
            }, 2 * 60 * 1000);

            return () => {
                clearInterval(intervalId);
            };
        }
    }, [isConnected])

    const WINDOW_SIZE = {
        w: 1366,
        h: 768
    }
    const [windowSize, setWindowSize] = useState({
        x: window.innerWidth / WINDOW_SIZE.w,
        y: window.innerHeight / WINDOW_SIZE.h
    });

    const handleResize = () => {
        setWindowSize({
            x: window.innerWidth / WINDOW_SIZE.w,
            y: window.innerHeight / WINDOW_SIZE.h
        });
    }
    
    const getAuth = () => {
        const searchParams = new URLSearchParams(location.search)
        const token = searchParams.get('authToken')
        
        if (token) {
            sessionStorage.setItem("authToken", token)
            dispatch(setAuth(token))
        }
        
        return token ? searchParams.get('authToken') : null
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <div
            className={
                classNames(
                    style.root,
                    style.fixed
                )
            }
            style={{
                transform: `scale(${windowSize.x}, ${windowSize.y})`
            }}
        >
            <main className={style.main}>
                {
                    auth || sessionStorage.getItem('authToken') || getAuth()
                        ?
                            <Suspense fallback={<Loader />}>
                                <Routes>
                                    {
                                        router.map(item =>
                                            <Route
                                                key = {new Date().getTime()}
                                                path = {item.path}
                                                element = {item.element}
                                            />
                                        )
                                    }
                                </Routes>
                            </Suspense>
                        :
                            <Login />
                }
            </main>
        </div>
    );
}

export default App;
