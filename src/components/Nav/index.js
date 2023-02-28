import Clock from "./Clock";
import Slider from "./Slider";
import Account from "./Account";

import style from './index.module.scss';

const Nav = () => {

    return (
        <nav className={style.block}>
            <div className={style.tab}>
                <Slider />
            </div>
            <div className={style.setting}>
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
