import {useSelector} from "react-redux";
import {useEffect} from "react";

import Clock from "./Clock";
import Slider from "./Slider";
import Account from "./Account";

import style from './index.module.scss';
import Icon from "../Icon";

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
            <div className={style.options}>
                <button
                    className={style.option}
                >
                    <Icon id={'file-check'} />
                </button>
                <button
                    className={style.option}
                >
                    <Icon id={'diagram'} />
                </button>
                <button
                    className={style.option}
                >
                    <Icon id={'settings'} />
                </button>
                <button
                    className={style.option}
                >
                    <Icon id={'tv'} />
                </button>
                <button
                    className={style.option}
                >
                    <Icon id={'turn-off'} />
                </button>
            </div>
        </nav>
    );
}

export default Nav;
