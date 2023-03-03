import {useSelector} from "react-redux";
import {useEffect} from "react";

import Clock from "./Clock";
import Slider from "./Slider";
import Account from "./Account";

import style from './index.module.scss';

const Nav = () => {
    const {delta} = useSelector((state) => state.delta)

    useEffect(() => {

    }, [delta])

    return (
        <nav className={style.block}>
            <div className={style.tab}>
                <Slider />
            </div>
            <div className={style.setting}>
                <div className={style.cell}>
                    Delta - [{delta}]
                </div>
                <div className={style.cell}>
                    <Account />
                </div>
                <div className={style.cell}>
                    <Clock />
                </div>
            </div>
        </nav>
    );
}

export default Nav;
