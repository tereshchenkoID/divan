import {Suspense} from "react";
import {Routes, Route, useParams} from "react-router-dom";

import {router} from "../router";

import Loader from "../components/Loader";
import Navigation from "../components/Navigation";

import style from './index.module.scss';

const App = () => {

    return (
        <div data-theme={'dark'}>
            <Navigation />
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
