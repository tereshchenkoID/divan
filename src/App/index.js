import {Suspense, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Routes, Route} from "react-router-dom";

import useSocket from "hooks/useSocket";

import classNames from "classnames";

import {router} from "router";

import Login from "pages/Login";
import Loader from "components/Loader";

import style from './index.module.scss';

const App = () => {
    const {auth} = useSelector((state) => state.auth)
    const {isConnected} = useSelector((state) => state.socket);
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

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
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
                    auth
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
