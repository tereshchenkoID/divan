import {Suspense, useState} from "react";
import {router} from "router";
import {Routes, Route} from "react-router-dom";

import classNames from "classnames";

import Loader from "components/Loader";
import Navigation from "components/Navigation";

import style from './index.module.scss';

const App = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark')


    const handleTheme = (data) => {
        setTheme(data)
        localStorage.setItem('theme', data)
    }

    return (
        <div
            className={classNames(
                style.root,
                style[theme]
            )}
        >
            <Navigation action={handleTheme} />
            <main className={style.main}>
                <Suspense fallback={<Loader />}>
                    <Routes>
                        {
                            router.map(item =>
                                <Route
                                    key={new Date().getTime()}
                                    path={item.path} element = {item.element}
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
