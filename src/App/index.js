import {Suspense} from "react";
import {Routes, Route} from "react-router-dom";

import {router} from "router";

import Loader from "components/Loader";

import style from './index.module.scss';

const App = () => {

    return (
        <div className={style.root}>
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
