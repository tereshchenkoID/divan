import {NavLink} from "react-router-dom";

import style from './index.module.scss';

const Category = ({id, text}) => {

    return (
        <NavLink
            to={`/${id}`}
            className={style.block}
            aria-label={text}
        >
            <span className={style.icon}>
                <img src={`./img/categories/${id}.svg`} alt={text} />
            </span>
            <span className={style.text}>{text}</span>
        </NavLink>
    );
}

export default Category;
