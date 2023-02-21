import Clock from "./Clock";
import Slider from "./Slider";

import style from './index.module.scss';

const Nav = () => {

    return (
        <nav className={style.block}>
            <div className={style.tab}>
                <Slider />
            </div>
            <div className={style.setting}>
                <div className={style.cell}>
                    <div>Cashier131</div>
                </div>
                <div className={style.cell}>
                    <div>$4,40000</div>
                </div>
                <div className={style.cell}>
                    <Clock />
                </div>
            </div>
        </nav>
    );
}

export default Nav;
