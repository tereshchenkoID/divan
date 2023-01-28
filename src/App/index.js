import {Suspense, useState} from "react";
import {Routes, Route} from "react-router-dom";

import classNames from "classnames";

import {useLocalStorage} from "helpers/localStorage";

import {router} from "router";

import Loader from "components/Loader";
import Navigation from "components/Navigation";

import style from './index.module.scss';

const App = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark')
    const {setLocalStorage} = useLocalStorage()

    const handleTheme = (data) => {
        setTheme(data)
        setLocalStorage('theme', data)
    }

    return (
        <div
            className={classNames(
                style.root,
                style[theme]
            )}
        >
            <Navigation
                data={theme}
                action={handleTheme}
            />
            <main className={style.main}>
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
            </main>
        </div>
    );
}

export default App;
