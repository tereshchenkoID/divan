import {useState, useEffect} from "react";
import {useDispatch} from "react-redux";

import {setSettings} from "store/actions/settingsAction";

import Loader from "components/Loader";
import Nav from "components/Nav";

import Table from "modules/Soccer/Table";
import Betslip from "modules/Betslip";

import style from './index.module.scss';

const Home = () => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        dispatch(setSettings()).then(() => {
            setLoading(false)
        })
    }, []);

    return (
        <div className={style.block}>
            {
                loading
                 ?
                    <Loader />
                 :
                    <>
                        <Nav />
                        <div className={style.content}>
                            <div className={style.column}>
                                <Table />
                            </div>
                            <div className={style.column}>
                                <Betslip />
                            </div>
                        </div>
                    </>
            }
        </div>
    );
}

export default Home;
