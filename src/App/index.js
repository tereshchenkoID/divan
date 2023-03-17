import {useSelector} from "react-redux";
import {Suspense} from "react";
import {Routes, Route} from "react-router-dom";

import {router} from "router";

import Login from "pages/Login";

import Loader from "components/Loader";

import style from './index.module.scss';

const App = () => {
    const {auth} = useSelector((state) => state.auth)

    return (
        <div className={style.root}>
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
