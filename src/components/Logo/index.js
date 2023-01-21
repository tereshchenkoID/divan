import {NavLink} from "react-router-dom";

import style from './index.module.scss';

const Logo = () => {
    return (
        <NavLink
            to={'/'}
            className={style.block}
            aria-label={'Home'}
        >
            Statistics
        </NavLink>
    );
}

export default Logo;
